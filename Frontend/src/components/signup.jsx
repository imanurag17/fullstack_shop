import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { authActions } from "../features/auth/auth"
import { userSignup } from "../features/auth/auth.actions"
import Modal from "./modal"

export default function Signup(){
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authActions.openModal('signup'));
  }, [dispatch]);

  const signupInfo = (info) =>{
    console.log('signup =>',info)

    dispatch(userSignup(info))
    navigate('/login')
    //dispatch(authActions.openModal('login'))
  }
  return (
    <>
      <Modal getSignupInfo = {signupInfo}/>
    </>
  )
} 