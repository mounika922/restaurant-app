import Header from '../Header'
import CartContext from '../../context/CartContext'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {
        removeAllCartItems,
        cartList,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeCartItem,
      } = value

      return (
        <div>
          <Header />
          <div className="cart-container">
            {cartList.length === 0 ? (
              <div className="empty-cart">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                  alt="cart empty"
                  className="empty-cart-img"
                />
                <p>Cart Empty</p>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  className="remove-all-btn"
                  onClick={removeAllCartItems}
                >
                  Remove All
                </button>
                <ul className="cart-items-list">
                  {cartList.map(item => (
                    <li key={item.dishId} className="cart-item">
                      <img
                        src={item.dishImage}
                        alt={item.dishName}
                        className="cart-item-img"
                      />
                      <p className="cart-details">{item.dishName}</p>
                      <p>
                        {item.dishCurrency}{' '}
                        {Number(item.dishPrice) * item.quantity}
                      </p>
                      <div className="btn-container">
                        <button
                          type="button"
                          className="quantity-controls-button"
                          onClick={() => incrementCartItemQuantity(item.dishId)}
                        >
                          +
                        </button>

                        <p>{item.quantity}</p>

                        <button
                          type="button"
                          className="quantity-controls-button"
                          onClick={() => decrementCartItemQuantity(item.dishId)}
                        >
                          -
                        </button>
                      </div>
                      <p>{item.dishCalories} calories</p>
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => removeCartItem(item.dishId)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
