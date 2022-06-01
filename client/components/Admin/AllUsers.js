import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AdminDashboard from "./AdminDash";
import { fetchUpdatedUser, fetchUsers, DeleteUser } from "../../store/users";
import { updateUser } from "../../store/newUser";
import "../styles/AllUsers.css";

const AllUsers = (props) => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => {
    // console.log(state.usersReducer);
    return state.usersReducer;
  });

  useEffect(() => {
    if (allUsers) {
      dispatch(fetchUsers());
    }
  }, []);

  const [admin, setAdmin] = useState(false);
  const [userId, setUserId] = useState("");

  const handleSubmit = (event, userId) => {
    event.preventDefault();
    dispatch(updateUser({ isAdmin: event.target.value }, userId));
  };

  const deleteHandler = (event, userId) => {
    event.preventDefault();
    dispatch(DeleteUser(userId));
  };

  let listOfUsers;

  if (allUsers.length > 0) {
    listOfUsers = allUsers.map((user) => {
      return (
        <div className="user-card" key={user.id}>
          <h4>
            Name: {user.firstName} {user.lastName}
          </h4>
          <div>Email: {user.email}</div>
          <div>Admin: {user.isAdmin}</div>

          <select
            className="category-dropdown"
            name="status"
            // placeholder={user.isAdmin}
            value={user.isAdmin}
            onChange={(evt) => handleSubmit(evt, user.id)}
          >
            <option value="">Select status</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>

          {/* <form onSubmit={handleSubmit}>
            <div>Give Admin status?</div>
            <input
              value={user.isAdmin}
              type="text"
              onChange={(e) => {
                setAdmin(e.target.value);
              }}
            />
            <button type="submit">Change Status</button>
          </form> */}

          <button
            type="button"
            onClick={(event) => deleteHandler(event, user.id)}
          >
            Delete User
          </button>
        </div>
      );
    });
  } else {
    listOfUsers = (
      <div>
        <div>No clients at this time</div>
      </div>
    );
  }
  return (
    <div className="admin-users-container">
      <AdminDashboard />
      <h1>Clients:</h1>
      <div className="users-list">{listOfUsers}</div>
    </div>
  );
};

export default AllUsers;
