import { useSelector, useDispatch } from "react-redux"
import { cartActions } from "../features/cart/cart"
import CartItem from "./cartItem"

export default function Cart() {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart.itemsById)
  const ids = useSelector(state => state.cart.ids)
  const isEmpty = ids.length === 0
  console.log(cart)
  function handleAddItem(prod, value){
    dispatch(cartActions.updateItemLocaly({prod, value}))
  }
  function handleRemoveItem(prod, value){
    dispatch(cartActions.updateItemLocaly({prod, value}))
  }

  return (
    <>
      <div>
        {isEmpty && <p>No item in the cart</p>}
        {Object.entries(cart).map(([id, prod]) => {
          return (
            <CartItem
              id={id}
              title={prod.title}
              quantity={prod.quantity}
              onAdd={() =>handleAddItem(prod, +1)}
              onRemove={() =>handleRemoveItem(prod, -1)}
            />
          )
        })}
      </div>
    </>
  )
}