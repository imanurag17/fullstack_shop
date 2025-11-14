import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  products: {
    items: [],
    allProducts: true, // default
  },
  notification: null
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts(state, action){
      //state.products = action.payload
      const payload = action.payload || {};
      state.products.items = payload.items ?? [];
      state.products.allProducts = payload.allProducts ?? true;
    },
    showNotification(state, action) {
      state.notification = action.payload
    }
  }
})

export const productActions = productSlice.actions
export default productSlice.reducer