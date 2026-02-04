import './App.css'
import {Component} from 'react'
import CartContext from './context/CartContext'
import Restaurant from './components/Restaurant'

class App extends Component {
  state = {
    cartItems: {},
    cartCount: 0,
  }

  addItem = dishId => {
    this.setState(prevState => {
      const prevDishCount = prevState.cartItems[dishId] || 0

      return {
        cartItems: {
          ...prevState.cartItems,
          [dishId]: prevDishCount + 1,
        },
        cartCount: prevState.cartCount + 1,
      }
    })
  }

  removeItem = dishId => {
    this.setState(prevState => {
      const prevDishCount = prevState.cartItems[dishId] || 0
      if (prevDishCount === 0) {
        return prevState
      }

      return {
        cartItems: {
          ...prevState.cartItems,
          [dishId]: prevDishCount - 1,
        },
        cartCount: prevState.cartCount - 1,
      }
    })
  }

  render() {
    const {cartItems, cartCount} = this.state

    return (
      <CartContext.Provider
        value={{
          cartItems,
          cartCount,
          addItem: this.addItem,
          removeItem: this.removeItem,
        }}
      >
        <Restaurant />
      </CartContext.Provider>
    )
  }
}
export default App
