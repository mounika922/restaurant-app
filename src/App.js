import {Component} from 'react'
import {Route, Switch, Redirect, BrowserRouter} from 'react-router-dom'
import CartContext from './context/CartContext'
import Login from './components/Login'
import Restaurant from './components/Restaurant'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'

class App extends Component {
  state = {cartList: []}

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = item => {
    this.setState(prev => {
      const exist = prev.cartList.find(each => each.dishId === item.dishId)
      const quantityToAdd =
        item.quantity && item.quantity > 0 ? item.quantity : 1
      if (exist) {
        return {
          cartList: prev.cartList.map(each =>
            each.dishId === item.dishId
              ? {...each, quantity: each.quantity + quantityToAdd}
              : each,
          ),
        }
      }
      return {cartList: [...prev.cartList, {...item, quantity: quantityToAdd}]}
    })
  }

  removeCartItem = id => {
    this.setState(prev => ({
      cartList: prev.cartList.filter(i => i.dishId !== id),
    }))
  }

  incrementCartItemQuantity = id => {
    this.setState(prev => ({
      cartList: prev.cartList.map(i =>
        i.dishId === id ? {...i, quantity: i.quantity + 1} : i,
      ),
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(prev => ({
      cartList: prev.cartList
        .map(i => (i.dishId === id ? {...i, quantity: i.quantity - 1} : i))
        .filter(i => i.quantity > 0),
    }))
  }

  render() {
    const {cartList} = this.state
    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            removeAllCartItems: this.removeAllCartItems,
            addCartItem: this.addCartItem,
            removeCartItem: this.removeCartItem,
            incrementCartItemQuantity: this.incrementCartItemQuantity,
            decrementCartItemQuantity: this.decrementCartItemQuantity,
          }}
        >
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Restaurant} />
            <ProtectedRoute path="/cart" component={Cart} />
            <Redirect to="/login" />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
