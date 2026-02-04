import './index.css'
import DishItem from '../DishItem'

const CategoryTabs = props => {
  const {categories, activeId, setActiveId} = props

  const activeCategory = categories.find(
    each => each.menuCategoryId === activeId,
  )

  const dishes = activeCategory?.categoryDishes || []

  return (
    <div>
      <ul className="category-tabs">
        {categories.map(each => (
          <li key={each.menuCategoryId}>
            <button
              type="button"
              onClick={() => setActiveId(each.menuCategoryId)}
              className={
                each.menuCategoryId === activeId ? 'active' : 'in-active'
              }
            >
              {each.menuCategory}
            </button>
          </li>
        ))}
      </ul>
      {activeCategory && (
        <ul>
          {dishes.map(each => (
            <DishItem key={each.dishId} dishDetails={each} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default CategoryTabs
