import {configureStore} from '@reduxjs/toolkit'

import authReducer from '../features/auth/auth'
import productReducer from '../features/products/products'

const store = configureStore({
  reducer: {
    auth: authReducer,
    prod: productReducer
  }
})

export default store