import { createAsyncThunk } from '@reduxjs/toolkit'
import { cartActions } from './cart'

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ prodId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.currentUser.token
      const response = await fetch('http://localhost:4000/addToCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ prodId })
      })
      const data = await response.json()
      if (!response.ok) {
        const message = data.message || `Add to cart failed (${response.status})`;
        thunkAPI.dispatch(cartActions.setLastError(message));
        return thunkAPI.rejectWithValue(message)
      }
      //thunkAPI.dispatch(cartActions.replaceCart(data))
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue('Network Error')
    }
  }
)

export const updateCart = createAsyncThunk(
  'cart/updateCart',
  async ({ id, value }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.currentUser.token
      const response = await fetch("http://localhost:400/updateCart", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({ id, value })
      })
      const data = await response.json()

      if (!response.ok) {
        const message = data.message || `Failed to update cart (${response.status})`;
        thunkAPI.dispatch(cartActions.setLastError(message));
        return thunkAPI.rejectWithValue(message);
      }
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue('Network Error');
    }
  }
)

export const getCart = createAsyncThunk(
  'cart/getCart',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.currentUser.token;
      const response = await fetch('http://localhost:4000/getCart', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      });

      const data = await response.json();

      if (!response.ok) {
        const message = data.message || `Failed to get cart (${response.status})`;
        thunkAPI.dispatch(cartActions.setLastError(message));
        return thunkAPI.rejectWithValue(message);
      }
      //thunkAPI.dispatch(cartActions.replaceCart(data));
      return data;

    } catch (error) {
      return thunkAPI.rejectWithValue('Network Error');
    }
  }
);
