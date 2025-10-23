import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
  modalType: null,
  users: [],
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
      const existingUser = state.users.find(user => user.userId === action.payload.userId)
      if (existingUser) {
        state.isLoggedIn = true
        return
      }
      state.users.push(action.payload)
      state.isLoggedIn = true
    },
    showNotification(state, action) {
      state.notification = action.payload
    }
  }
})

export const authActions = authSlice.actions

export default authSlice.reducer