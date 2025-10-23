import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import Modal from "./modal"
import { userLogin } from "../features/auth/auth.actions"
import { authActions } from "../features/auth/auth"

export default function Signin(){
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

  useEffect(() => {
    dispatch(authActions.openModal('login'));
  }, [dispatch]);

  // Navigate when user logs in
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(authActions.closeModal())
      navigate("/");
    }
  }, [isLoggedIn, dispatch, navigate]);

  const loginInfo = (loginInfo) => {
    dispatch(userLogin(loginInfo)) // async action
  }
  
  // const loginInfo = (loginInfo) =>{
  //   dispatch(userLogin(loginInfo))
  //   if (isLoggedIn) {
  //     dispatch(authActions.closeModal())
  //     navigate("/");
  //   }
  // }
  
  return (
    <>
      <h2>Login Page</h2>
      <Modal getLoginInfo = {loginInfo}/>
    </>
  )
} 