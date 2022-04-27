import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUpdatedUser } from '../store/users'
import { me } from '../store/auth'
import {Link, useHistory } from "react-router-dom";
import { getUserOrders } from "../store/orders";

const UserDashboard = (props) => {
  const user = useSelector((state) => {
    return state.auth
  })
  const orders = useSelector((state) => {
    return state.ordersReducer
  })

  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    if (user.id) {
      dispatch(getUserOrders(user.id))
    }
  }, [user])

  const id = user.id
  const [firstName, setFirstName] = useState(props.firstName)
  const [lastName, setLastName] = useState(props.lastName)
  const [email, setEmail] = useState(props.email)
  const [address, setAddress] = useState(props.address)
  const [phone, setPhone] = useState(props.phone)

  const handleFirstNameChange = (e) => setFirstName(e.target.value)

  const handleLastNameChange = (e) => setLastName(e.target.value)

  const handleEmailChange = (e) => setEmail(e.target.value)

  const handleAddressChange = (e) => setAddress(e.target.value)

  const handlePhoneChange = (e) => setPhone(e.target.value)


  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(fetchUpdatedUser({ id, firstName, lastName, email, phone, address }))
  }
  // dispatch orders


  let listOfOrders;
  if (orders.length > 0) {
    listOfOrders = orders.map((order) => {
      return (
        <div key={order.id}>
          <h5>{order.id}</h5>
                <div>{order.status}</div>
                <div>{order.shippingAddress}</div>
                <div>{order.paymentInfo}</div>
                <div>{order.shippingAmt}</div>
                <div>{order.taxAmt}</div>
                <Link to={`/orders/${order.id}`}>View Order</Link>
        </div>
      )
    })
  } else {
    listOfOrders = (<div>
      <a href="/products">No orders yet! Get to shopping!"</a></div>)
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
      <div>
        {listOfOrders}
      </div>
    </div>
  )
}

export default UserDashboard
