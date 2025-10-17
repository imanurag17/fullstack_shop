import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import style from './mainNavigation.module.css'
import { Link } from 'react-router-dom'

import { authActions } from '../features/auth/auth'


export default function MainNavigation() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const handleOpenModal = (e, type) => {
    e.preventDefault()
    
    dispatch(authActions.openModal(type))
    navigate(`/${type}`)
  }
    
  return (
    <header className={style.main_header}>
      <nav className={style.main_nav}>
        <ul className={style.list_items}>
          <li className={style.list_item}>
            <Link to='/'>Home</Link>
          </li>
          <li className={style.list_item}>
            <Link to='/products'>Products</Link>
          </li>
        </ul>
        <form action="">
          <button onClick={(e) => handleOpenModal(e, 'login')}>Login</button>
          <button onClick={(e) => handleOpenModal(e, 'signup')}>Signup</button>
        </form>
      </nav>
    </header>
  )
}