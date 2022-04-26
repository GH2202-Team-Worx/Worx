import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUpdatedUser } from '../store/users'
import { me } from '../store/auth'
import { useHistory } from "react-router-dom";

const UserDashboard = (props) => {
  const user = useSelector((state) => {
    return state.auth
  })
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(me())
  }, [])
  const id = user.id
  const [firstName, setFirstName] = useState(props.firstName)
  const [lastName, setLastName] = useState(props.lastName)
  const [email, setEmail] = useState(props.email)
  const [address, setAddress] = useState(props.address)
  const [phone, setPhone] = useState(props.phone)
  // const [resetPassword, setResetPassword] = useState(resetPassword)
  // const [confResetPassword, setConfResetPassword] = useState(confResetPassword)

  const handleFirstNameChange = (e) => setFirstName(e.target.value)

  const handleLastNameChange = (e) => setLastName(e.target.value)

  const handleEmailChange = (e) => setEmail(e.target.value)

  const handleAddressChange = (e) => setAddress(e.target.value)

  const handlePhoneChange = (e) => setPhone(e.target.value)

  // const handleResetPasswordChange = (e) => setResetPassword(e.target.value)

  // const handleconfResetPasswordChange = (e) => setConfResetPassword(e.target.value)

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(fetchUpdatedUser({ id, firstName, lastName, email, phone, address }))
  }

  if (!user) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <h2>Edit Profile</h2>
      <p>First Name:</p>
      <input type='text' placeholder={user.firstName} required onChange={(e) => { handleFirstNameChange(e) }} />
      <p>Last Name: </p>
      <input type='text' placeholder={user.lastName} required onChange={(e) => { handleLastNameChange(e) }} />
      <p>Email: </p>
      <input type='text' placeholder={user.email} required onChange={(e) => { handleEmailChange(e) }} />
      <p>Address:</p>
      <input type='text' placeholder={user.address} required onChange={(e) => { handleAddressChange(e) }} />
      <p>Phone Number:</p>
      <input type='text' placeholder={user.phone} required onChange={(e) => { handlePhoneChange(e) }} />
        <button type='submit'>Edit</button>
      </form>
    </div>
  )
}

export default UserDashboard
