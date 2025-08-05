import { useMenuStore } from '@/store/menuStore';
import { Button } from '@/components/ui/button';

const CategoryFilter = () => {
  const {
    categories,
    selectedCategory,
    selectedSubcategory,
    setSelectedCategory,
    setSelectedSubcategory
  } = useMenuStore();

  const selectedCategoryData = categories.find(
    (cat) => cat.id === selectedCategory
  );

  return (
    <div className="mb-6">
      {/* Main Categories */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Button
          variant={selectedCategory === null ? 'default' : 'outline'}
          onClick={() => setSelectedCategory(null)}
          className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
            selectedCategory === null
              ? 'bg-ruchi-purple text-white hover:bg-ruchi-purple/90'
              : 'border-ruchi-purple/40 text-ruchi-purple hover:bg-ruchi-purple/10'
          }`}
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(category.id)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
              selectedCategory === category.id
                ? 'bg-ruchi-purple text-white hover:bg-ruchi-purple/90'
                : 'border-ruchi-purple/40 text-ruchi-purple hover:bg-ruchi-purple/10'
            }`}
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Subcategories */}
      {selectedCategoryData?.subcategories && (
        <div className="flex flex-wrap gap-2 pl-4">
          <Button
            variant={selectedSubcategory === null ? 'secondary' : 'outline'}
            onClick={() => setSelectedSubcategory(null)}
            size="sm"
            className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
              selectedSubcategory === null
                ? 'bg-ruchi-purple text-white hover:bg-ruchi-purple/90'
                : 'border-ruchi-purple/40 text-ruchi-purple hover:bg-ruchi-purple/10'
            }`}
          >
            All {selectedCategoryData.name}
          </Button>
          {selectedCategoryData.subcategories.map((subcategory) => (
            <Button
              key={subcategory.id}
              variant={
                selectedSubcategory === subcategory.id ? 'secondary' : 'outline'
              }
              onClick={() => setSelectedSubcategory(subcategory.id)}
              size="sm"
              className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                selectedSubcategory === subcategory.id
                  ? 'bg-ruchi-purple text-white hover:bg-ruchi-purple/90'
                  : 'border-ruchi-purple/40 text-ruchi-purple hover:bg-ruchi-purple/10'
              }`}
            >
              {subcategory.name}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
