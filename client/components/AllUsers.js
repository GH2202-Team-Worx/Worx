import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchUpdatedUser, fetchUsers, DeleteUser} from '../store/users'

const AllUsers = (props) => {
  const dispatch = useDispatch()
  const allUsers = useSelector((state) => {
    console.log(state.usersReducer)
    return state.usersReducer
  })
  console.log(allUsers)

  useEffect(() => {
    if (allUsers) {
      dispatch(fetchUsers())
    }
  }, [])

  const [admin, setAdmin] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(fetchUpdatedUser({admin}))
  }

  const deleteHandler = (event, userId) => {
    event.preventDefault();
    dispatch(DeleteUser(userId));
  }

  let listOfUsers;

  if (allUsers.length > 0) {
    listOfUsers = allUsers.map((user) => {
      return (
        <div key={user.id}>
          <h4>{user.firstName} {user.lastName}</h4>
          <div>{user.email}</div>
          <form onSubmit={handleSubmit}>
            <div>Give Admin status?</div>
            <input value={admin.isAdmin} type='text' onChange={(e) => {
              setAdmin(e.target.value)
            }} />
            <button type='submit'>Submit</button>
          </form>
          <div>{user.address}</div>
          <div>{user.phone}</div>
              <button type="button" onClick={(event) => (deleteHandler(event, user.id))}>X</button>
        </div>
      )
    })
  } else {
    listOfUsers = (
      <div>
        <div>No clients at this time</div>
      </div>
    )
  }
  return (
    <div>
      <h1>Clients:</h1>
      <div>{listOfUsers}</div>
  </div>)
}

export default AllUsers
