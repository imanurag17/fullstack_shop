import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  itemsById: {},
  ids: [],
  totalQuantity: 0,
  status: 'idle',
  lastError: null
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemLocaly(state, action) {
      const product = action.payload
      const id = product._id
      if (state.itemsById[id]) {
        state.itemsById[id].quantity += 1;
      } else {
        state.itemsById[id] = {
          ...product,
          quantity: 1
        }
        state.ids.push(id)
      }
      state.totalQuantity += 1
    },
    updateItemLocaly(state, action) {
      const product = action.payload.prod
      const value = action.payload.value
      const existingItem = state.itemsById[product._id];
      const newQty = existingItem.quantity + value;
      if (newQty <= 0) {
        delete state.itemsById[product._id];
        if (state.ids) {
          state.ids = state.ids.filter(x => x !== product._id);
        }
      } else {
        existingItem.quantity = newQty;
      }
      state.totalQuantity = Math.max(
        0,
        state.totalQuantity + value
      );
    },
    replaceCart(state, action) {
      const serverCart = action.payload
      const itemsById = {}
      const ids = []
      (serverCart.items || []).forEach(it => {
        const id = String(it._id ?? it.id);
        itemsById[id] = { ...it, quantity: Number(it.quantity || 0) };
        ids.push(id);
      });
      state.itemsById = itemsById;
      state.ids = ids;
      state.totalQuantity = serverCart.totalQuantity ?? ids.reduce((s, id) => s + (itemsById[id].quantity || 0), 0);
      state.lastError = null;
      state.status = 'idle';
    },
    setLastError(state, action) {
      state.lastError = action.payload;
      state.status = 'failed';
    },
  }
})

export const cartActions = cartSlice.actions
export default cartSlice.reducer

// dispatch - action creator - peroform All Things like, check for existance, increase totalQuantity,
// addNew
// dispatch - async action creator - addItemtoCartThunk(prodId)
//what is the correct and professional way
