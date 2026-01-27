import {configureStore} from '@reduxjs/toolkit'

import authReducer from '../features/auth/auth'
import productReducer from '../features/products/products'
import cartReducer from '../features/cart/cart'

const store = configureStore({
  reducer: {
    auth: authReducer,
    prod: productReducer,
    cart: cartReducer
  }
})

export default store