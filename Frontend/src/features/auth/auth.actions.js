import { authActions } from "./auth"

export const userSignup = (userData) => {
  return async (dispatch) => {
    const sendData = async () => {
      const response = await fetch('http://localhost:4000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      })
      if (!response.ok) {
        throw new Error('Sending request failed!')
      }
    }
    try {
      await sendData()
    } catch (error) {
      console.log(error);
    }
  }
}

export const userLogin = (loginInfo) => {
  return async (dispatch) => {
    dispatch(authActions.showNotification({
      title: 'sending...',
      status: 'pending',
      message: 'sending request!'
    }))
    const getUser = async () => {
      const response = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInfo)
      })

      const data = await response.json()
      if (!response.ok) {
        const error = new Error(data.message || 'Sending request failed!')
        error.status = response.status
        throw error
      }
      return data
    }
    try {
      const user = await getUser()
      dispatch(authActions.userData(user))
    } catch (error) {
      console.log('error =>', error.message, 'status =>', error.status);
      dispatch(authActions.showNotification({
        title: 'sending request failed',
        status: error.status,
        message: error.message
      }));
    }
  }
}