import './index.css'
import {Component} from 'react'
import CartContext from '../../context/CartContext'

class DishItem extends Component {
  render() {
    const {dishDetails} = this.props
    const {
      dishId,
      dishName,
      dishAvailability,
      dishCurrency,
      dishPrice,
      dishDescription,
      dishCalories,
      dishImage,
      addonCat,
    } = dishDetails

    const box = dishAvailability ? 'green' : 'red'

    return (
      <li>
        <div className="dish_item">
          <div className={box}>
            <p className="dot" />
          </div>

          <div>
            <h2>{dishName}</h2>
            <p>
              {dishCurrency} {dishPrice}
            </p>
            <p>{dishDescription}</p>

            <CartContext.Consumer>
              {value => {
                const {addItem, removeItem, cartItems} = value
                const count = cartItems[dishId] || 0
                return (
                  <>
                    {dishAvailability ? (
                      <div className="button-container">
                        <button
                          type="button"
                          onClick={() => addItem(dishId)}
                          className="button"
                        >
                          +
                        </button>
                        <p>{count}</p>
                        <button
                          type="button"
                          onClick={() => removeItem(dishId)}
                          className="button"
                        >
                          -
                        </button>
                      </div>
                    ) : (
                      <p>Not Available</p>
                    )}
                  </>
                )
              }}
            </CartContext.Consumer>
            {addonCat && addonCat.length > 0 && <p>Customizations available</p>}
          </div>

          <p className="calories_text">{dishCalories} calories</p>
          <img src={dishImage} alt={dishName} className="dish_img" />
        </div>
      </li>
    )
  }
}
export default DishItem
