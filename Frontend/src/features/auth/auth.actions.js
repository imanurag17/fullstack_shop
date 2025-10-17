
export const sendUserData = (userData) => {
  return async(dispatch) => {
    const sendData = async () => {
      const response = await fetch('http://localhost:4000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      })
      if(!response.ok){
        throw new Error('Sending request failed!')
      }
    }
    try {
      await sendData()
    }catch(error){
      console.log(error);
      
    }
  }
}