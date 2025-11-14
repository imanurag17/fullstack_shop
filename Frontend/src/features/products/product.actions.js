import { productActions } from "./products"

export const createProduct = (productInfo, token) => {
  return async (dispatch) => {
    dispatch(productActions.showNotification({
      title: 'sending...',
      status: 'pending',
      message: 'sending product information!'
    }))
    const sendInfo = async () => {
      const response = await fetch('http://localhost:4000/productInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify(productInfo)
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
      const product = await sendInfo()
      dispatch(productActions.showNotification({
        title: 'Success!',
        status: 'success',
        message: 'product created successfully'
      }))
      console.log(product)
      return { status: 'success' }
    } catch (error) {
      dispatch(productActions.showNotification({
        title: 'sending request failed',
        status: error.status,
        message: error.message
      }));
    }
  }
}

export const updateProduct = (productInfo, token, id) => {
  return async (dispatch) => {
    dispatch(productActions.showNotification({
      title: 'sending...',
      status: 'pending',
      message: 'Updating Product!'
    }))
    try {
      const response = await fetch(`http://localhost:4000/updateProduct?prodId=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify(productInfo)
      })
      const data = await response.json()
      if (!response.ok) {
        const error = new Error(data.message || 'Updating Product Failed')
        error.status = response.status
        throw error
      }
      dispatch(productActions.showNotification({
        title: 'Success!',
        status: 'success',
        message: 'product updated successfully'
      }))
    } catch (error) {
      dispatch(productActions.showNotification({
        title: 'sending request failed',
        status: error.status,
        message: error.message
      }));
    }
  }
}

export const deleteProduct = (id) => {
  return async(dispatch) => {
    dispatch(productActions.showNotification({
      title: 'sending...',
      status: 'pending',
      message: 'Deleting Product!'
    }))
    try {
      const response = await fetch(`http://localhost:4000/deleteProduct?prodId=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          //Authorization: 'Bearer ' + token
        },
        //body: JSON.stringify(productInfo)
      })
      const data = await response.json()
      if (!response.ok) {
        const error = new Error(data.message || 'Failed to delete product')
        error.status = response.status
        throw error
      }
      dispatch(productActions.showNotification({
        title: 'Success!',
        status: 'success',
        message: 'product deleted successfully'
      }))
    } catch (error) {
      dispatch(productActions.showNotification({
        title: 'sending request failed',
        status: error.status,
        message: error.message
      }));
    }
  }
}