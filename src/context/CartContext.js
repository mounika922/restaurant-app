import React from 'react'

const CartContext = React.createContext({
  cartCount: 0,
  cartItems: {},
  addItem: () => {},
  removeItem: () => {},
})
export default CartContext
