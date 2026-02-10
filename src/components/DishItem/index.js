import './index.css'
import {Component} from 'react'
import CartContext from '../../context/CartContext'

class DishItem extends Component {
  state = {count: 0}

  incrementCount = () => {
    this.setState(prev => ({count: prev.count + 1}))
  }

  decrementCount = () => {
    this.setState(prevState => {
      if (prevState.count === 0) {
        return {count: 0}
      }
      return {count: prevState.count - 1}
    })
  }

  render() {
    const {dishDetails} = this.props
    const {count} = this.state
    const {
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
    const dot = dishAvailability ? 'green-dot' : 'red-dot'

    return (
      <li>
        <div className="dish_item">
          <div className={box}>
            <p className={dot} />
          </div>

          <div>
            <h2>{dishName}</h2>
            <p>
              {dishCurrency} {dishPrice}
            </p>
            <p>{dishDescription}</p>

            <CartContext.Consumer>
              {value => {
                const {addCartItem} = value
                return (
                  <>
                    {dishAvailability && dishPrice > 0 ? (
                      <div className="button-container">
                        <button
                          type="button"
                          onClick={this.incrementCount}
                          className="button"
                        >
                          +
                        </button>
                        <p>{count}</p>
                        <button
                          type="button"
                          onClick={this.decrementCount}
                          className="button"
                        >
                          -
                        </button>
                        {count > 0 && (
                          <button
                            type="button"
                            onClick={() => {
                              addCartItem({...dishDetails, quantity: count})
                            }}
                          >
                            ADD TO CART
                          </button>
                        )}
                      </div>
                    ) : (
                      <p className="not-available">Not Available</p>
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
