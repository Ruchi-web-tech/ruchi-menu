
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

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className="mb-6">
      {/* Main Categories */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => setSelectedCategory(null)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
            selectedCategory === null
              ? 'bg-ruchi-blue text-white hover:bg-ruchi-blue/90'
              : 'border-ruchi-blue/20 text-ruchi-blue hover:bg-ruchi-blue/10'
          }`}
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              selectedCategory === category.id
                ? 'bg-ruchi-blue text-white hover:bg-ruchi-blue/90'
                : 'border-ruchi-blue/20 text-ruchi-blue hover:bg-ruchi-blue/10'
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
            variant={selectedSubcategory === null ? "secondary" : "outline"}
            onClick={() => setSelectedSubcategory(null)}
            size="sm"
            className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
              selectedSubcategory === null
                ? 'bg-ruchi-yellow text-gray-900 hover:bg-ruchi-yellow/90'
                : 'border-ruchi-yellow/40 text-ruchi-yellow hover:bg-ruchi-yellow/10'
            }`}
          >
            All {selectedCategoryData.name}
          </Button>
          {selectedCategoryData.subcategories.map((subcategory) => (
            <Button
              key={subcategory.id}
              variant={selectedSubcategory === subcategory.id ? "secondary" : "outline"}
              onClick={() => setSelectedSubcategory(subcategory.id)}
              size="sm"
              className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                selectedSubcategory === subcategory.id
                  ? 'bg-ruchi-yellow text-gray-900 hover:bg-ruchi-yellow/90'
                  : 'border-ruchi-yellow/40 text-ruchi-yellow hover:bg-ruchi-yellow/10'
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
