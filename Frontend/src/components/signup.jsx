import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { authActions } from "../features/auth/auth"
import { sendUserData } from "../features/auth/auth.actions"
import Modal from "./modal"

export default function Signup(){
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const signupInfo = (info) =>{
    console.log('signup =>',info)

    dispatch(sendUserData(info))
    dispatch(authActions.openModal('login'))
    
    navigate('/login')
  }
  return (
    <>
      <Modal getSignupInfo = {signupInfo}/>
    </>
  )
} 