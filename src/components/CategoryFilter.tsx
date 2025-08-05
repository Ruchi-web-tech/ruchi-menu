import { useMenuStore } from '@/store/menuStore'
import { Button } from '@/components/ui/button'

const CategoryFilter = () => {
  const {
    categories,
    selectedCategory,
    selectedSubcategory,
    setSelectedCategory,
    setSelectedSubcategory,
  } = useMenuStore()

  const selectedCategoryData = categories.find(
    (cat) => cat.id === selectedCategory
  )

  return (
    <div className="mb-6">
      {/* Main Categories */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Button
          variant={selectedCategory === null ? 'secondary' : 'outline'}
          onClick={() => setSelectedCategory(null)}
          size="sm"
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'secondary' : 'outline'}
            onClick={() => setSelectedCategory(category.id)}
            size="sm"
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Subcategories */}
      {selectedCategoryData?.subcategories && (
        <div className="flex flex-wrap gap-2 pl-4">
          <Button
            variant={
              selectedSubcategory === null ? 'secondary' : 'outlineBlue'
            }
            onClick={() => setSelectedSubcategory(null)}
            size="sm"
          >
            All {selectedCategoryData.name}
          </Button>
          {selectedCategoryData.subcategories.map((subcategory) => (
            <Button
              key={subcategory.id}
              variant={
                selectedSubcategory === subcategory.id
                  ? 'secondary'
                  : 'outlineBlue'
              }
              onClick={() => setSelectedSubcategory(subcategory.id)}
              size="sm"
            >
              {subcategory.name}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}

export default CategoryFilter
