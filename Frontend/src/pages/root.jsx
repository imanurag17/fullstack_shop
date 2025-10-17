import { Outlet } from 'react-router-dom'
import {useSelector} from 'react-redux'

import MainNavigation from "../components/mainNavigation";
import Modal from '../components/modal';
import Sigin from '../components/signin';
import Signup from '../components/signup';

export default function RootLayout() {
    const modalType = useSelector((state) => state.auth.modalType)
    // let authType
    // if(modalType === 'login'){
    //   authType = <Sigin/>
    // } else {
    //   authType = <Signup/>
    // }
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  )
}