import Modal from "./modal"

export default function Signin(){
  const loginInfo = (info) =>{
    console.log('signin =>',info)
  }
  return (
    <>
      <h2>Login Page</h2>
      <Modal getLoginInfo = {loginInfo}/>
    </>
  )
} 