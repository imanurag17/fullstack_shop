import style from './login.module.css'

import { useState, useRef } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { authActions } from '../features/auth/auth'

export default function LoginForm(props) {
  const [error, setError] = useState({
    email: false,
    password: false,
  })

  const dispatch = useDispatch()
  const location = useLocation()
  const modalType = useSelector((state) => state.auth.modalType)
  const notification = useSelector(state => state.auth.notification)

  const path = location.pathname.replace('/', '')
  let message;

  if (notification) {
    message = notification.message
  }

  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const values = Object.fromEntries(formData.entries());

    const isEmpty = Object.values(values).some(value => value.trim() === "");

    if (isEmpty) {
      alert("Please fill in all fields before submitting.");
      return; // stop further execution
    }

    props.handleUserData(values)

  }

  function handleInputLeave(name, value) {
    let errorMessage = false

    if (name === 'email') {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      errorMessage = !regex.test(value) && value.length > 0
    }
    if (name === "password") {
      errorMessage = value.length > 0 && value.length < 6
    }
    setError(prevValue => {
      return {
        ...prevValue,
        [name]: errorMessage
      }
    })
  }

  function handleChange(e) {
    dispatch(authActions.showNotification(null))
    const name = e.target.name
    setError(prevValue => {
      if (name === 'email') {
        return {
          ...prevValue,
          email: false
        }
      } else if (name === 'password') {
        return {
          ...prevValue,
          password: false
        }
      } else return error;
    })
  }

  return (
    <>
      <p className={style.error_message}>{message}</p>
      <form action="/login" method="post" onSubmit={handleSubmit}>
        {(modalType === 'signup' || path === 'signup') && (
          <div className={style.input_container}>
            <label htmlFor="" className={style.input_label}>Name</label>
            <input type="text" name="name" onChange={handleChange} className={style.input_field} />
          </div>
        )}
        <div className={style.input_container}>
          <label htmlFor="" className={style.input_label}>Email</label>
          <input
            type="email"
            name="email"
            onBlur={(e) => handleInputLeave(e.target.name, e.target.value)}
            onChange={handleChange}
            className={style.input_field} />
          {error.email && <p>Email is invalid</p>}
        </div>
        <div className={style.input_container}>
          <label htmlFor="" className={style.input_label}>Password</label>
          <input
            type="text"
            name="password"
            onBlur={(e) => handleInputLeave(e.target.name, e.target.value)}
            minLength={6}
            onChange={handleChange}
            className={style.input_field} />
          {error.password && <p>Your Password is small</p>}
        </div>
        <div className={style.buttons_container}>
          <button type="submit">{(modalType === 'signup' || path === "signup") ? 'Signup' : 'Login'}</button>
          <button type='button' onClick={props.handleClose}>Close</button>
        </div>
      </form>
    </>
  )
}