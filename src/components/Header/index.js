import './index.css'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import CartContext from '../../context/CartContext'

const Header = props => {
  const {restaurantName} = props

  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <CartContext.Consumer>
      {value => (
        <nav className="head-container">
          <Link to="/">
            <h1 className="heading">{restaurantName || 'UNI Resto Cafe'}</h1>
          </Link>
          <div className="my_order">
            <p className="my_order_text">My orders</p>
            <Link to="/cart">
              <button type="button" data-testid="cart">
                <AiOutlineShoppingCart size={50} />
                <span className="cart-count">{value.cartList.length}</span>
              </button>
            </Link>
          </div>
          <button type="button" onClick={onLogout}>
            Logout
          </button>
        </nav>
      )}
    </CartContext.Consumer>
  )
}
export default withRouter(Header)
