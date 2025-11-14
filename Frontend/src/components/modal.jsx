import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

import style from './modal.module.css'
import LoginForm from "../pages/login"
import { authActions } from '../features/auth/auth'

export default function Modal(props) {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  //const path = location.pathname.replace('/', '')

  const modalType = useSelector(state => state.auth.modalType)

  const handleModalClose = () => {
    dispatch(authActions.closeModal())
    dispatch(authActions.showNotification(null))
    navigate('/')
  }

  const handleUserData =
    modalType === "signup" ? props.getSignupInfo : props.getLoginInfo;

  return (
    <>
      <dialog className={style.modal} >
        <div className={style.modal_content}>
          <LoginForm
            handleClose={handleModalClose}
            type={modalType}
            handleUserData={handleUserData} />
        </div>
      </dialog>
    </>
  )
}