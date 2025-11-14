import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
  modalType: null,
  currentUser: null,
  notification: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    openModal(state, action) {
      state.modalType = action.payload
    },
    closeModal(state, action) {
      state.modalType = null
    },
    userData(state, action) {
      //check the payload user data is already exist
      state.currentUser = action.payload;
      state.isLoggedIn = true;
    },
    showNotification(state, action) {
      state.notification = action.payload
    }
  }
})

export const authActions = authSlice.actions

export default authSlice.reducer