import {Component} from 'react'
import Header from '../Header'
import CategoryTabs from '../CategoryTabs'

class Restaurant extends Component {
  state = {categoryList: [], activeId: '', restaurantName: ''}

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    const url =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      const restaurantName = data[0].restaurant_name
      const updatedCategory = data[0].table_menu_list.map(each => ({
        menuCategory: each.menu_category,
        menuCategoryId: each.menu_category_id,
        menuCategoryImage: each.menu_category_image,
        nextUrl: each.nexturl,
        categoryDishes: each.category_dishes.map(dish => ({
          dishId: dish.dish_id,
          dishName: dish.dish_name,
          dishPrice: dish.dish_price,
          dishImage: dish.dish_image,
          dishCurrency: dish.dish_currency,
          dishCalories: dish.dish_calories,
          dishDescription: dish.dish_description,
          dishAvailability: dish.dish_Availability,
          dishType: dish.dish_Type,
          nextUrl: dish.nexturl,
          addonCat: dish.addonCat,
        })),
      }))
      this.setState({
        categoryList: updatedCategory,
        activeId:
          updatedCategory.length > 0 ? updatedCategory[0].menuCategoryId : '',
        restaurantName,
      })
    } else {
      console.log('Failed to fetch restaurant data')
    }
  }

  setActiveId = id => {
    this.setState({activeId: id})
  }

  render() {
    const {categoryList, activeId, restaurantName} = this.state

    return (
      <div className="container">
        <Header restaurantName={restaurantName} />
        {categoryList.length > 0 && (
          <CategoryTabs
            categories={categoryList}
            activeId={activeId}
            setActiveId={this.setActiveId}
          />
        )}
      </div>
    )
  }
}

export default Restaurant
