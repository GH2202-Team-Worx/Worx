import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createNewUser } from '../store/newUser'

const SignupForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')

  const handleFirstNameChange = (e) => setFirstName(e.target.value)

  const handleLastNameChange = (e) => setLastName(e.target.value)

  const handleEmailChange = (e) => setEmail(e.target.value)

  const handlePasswordChange = (e) => setPassword(e.target.value)

  const handleConfPasswordChange = (e) => setConfPassword(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== confPassword) {
      alert('Passwords do not match.')
    } else {
      alert('A sign up form was submitted with first name: "' + firstName + '" last name: "' + lastName + '" and Email :"' + email + '"')
      dispatch(createNewUser({ firstName, lastName, email, password }, history))
    }
  }

  return (
    <div>
      <form onSubmit={(e) => { handleSubmit(e) }}>
        <div>
          <h2>Sign Up Form</h2>
        <label htmlFor="email">
      <small>E-mail:</small>
    </label><br />
          <input value={email} type="text" required onChange={(e) => { handleEmailChange(e) }} />
      <label htmlFor="password">
        <small>Password:</small>
      </label><br />
          <input value={password} type="password" required onChange={(e) => { handlePasswordChange(e) }} />
      <label htmlFor="confPassword">
        <small>Confirm Password: </small>
      </label><br />
          <input value={confPassword} type="password" required onChange={(e) => { handleConfPasswordChange(e) }} />
        </div>
        <div>
      <label htmlFor='firstName'>
        <small>First Name</small>
      </label><br />
          <input value={firstName} type='text' required onChange={(e) => { handleFirstNameChange(e) }}/>
      <label htmlFor='lastName'>
        <small>Last Name</small>
      </label><br />
          <input value={lastName} type='text' required onChange={(e) => { handleLastNameChange(e) }} />
        </div>
        <div>
          <button type="submit">Sign Up</button>
      </div>
      </form>
    </div>
  )
}

export default SignupForm
