import './index.css'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import CartContext from '../../context/CartContext'

const Header = props => {
  const {restaurantName} = props
  return (
    <CartContext.Consumer>
      {value => (
        <nav className="head-container">
          <h1>{restaurantName}</h1>
          <div className="my_order">
            <p className="my_order_text">My orders</p>
            <AiOutlineShoppingCart size={50} />
            <span className="cart-count">{value.cartCount}</span>
          </div>
        </nav>
      )}
    </CartContext.Consumer>
  )
}
export default Header
