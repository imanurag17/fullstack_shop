import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  isLoggedin: false,
  modalType: null,
  users: []
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    openModal(state, action){
      state.modalType = action.payload
    },
    closeModal(state, action){
      state.modalType = null
    },
    userData(state, action){
      //check the payload user data is already exist
      state.users.push(action.payload)
    }
  }
})

export const authActions = authSlice.actions

export default authSlice.reducer