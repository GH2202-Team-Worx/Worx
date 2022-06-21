import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AdminDashboard from "./AdminDash";
import { fetchUsers, DeleteUser } from "../../store/users";
import { updateUser } from "../../store/newUser";
import "../styles/AllUsers.css";

const AllUsers = (props) => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => {
    return state.usersReducer;
  });
  const user = useSelector((state) => {
    return state.createUserReducer;
  });

  useEffect(() => {
    if (allUsers) {
      dispatch(fetchUsers());
    }
  }, [user]);

  const handleSubmit = (event, userId) => {
    event.preventDefault();
    dispatch(updateUser({ isAdmin: event.target.value }, userId));
  };

  const deleteHandler = (event, userId) => {
    event.preventDefault();
    dispatch(DeleteUser(userId));
  };

  return (
    <div className="admin-users-container">
      <AdminDashboard />
      <h1>Clients:</h1>
      <div className="users-list">
        {allUsers.length === 0 ? (
          <p>No current users.</p>
        ) : (
          allUsers.map((user) => {
            return (
              <div className="user-card" key={user.id}>
                <div>
                  <strong>Email:</strong> {user.email}
                </div>
                <div>
                  <strong>Admin:</strong> {user.isAdmin === true ? "Yes" : "No"}
                </div>
                <div>Give admin status?</div>
                <select
                  className="admin-status-dropdown"
                  name="status"
                  value={user.isAdmin}
                  onChange={(evt) => handleSubmit(evt, user.id)}
                >
                  <option value="">Select status</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
                <button
                  type="button"
                  onClick={(event) => deleteHandler(event, user.id)}
                >
                  Delete User
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AllUsers;
