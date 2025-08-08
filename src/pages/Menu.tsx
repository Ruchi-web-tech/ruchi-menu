import { useState } from 'react';
import { useMenuStore } from '@/store/menuStore';
import MenuCard from '@/components/MenuCard';
import CategoryFilter from '@/components/CategoryFilter';
import MenuItemDialog from '@/components/MenuItemDialog';
import { Button } from '@/components/ui/button';
import { MenuItem } from '@/types/menu';

const Menu = () => {
  const { menuItems, selectedCategory, selectedSubcategory } = useMenuStore();
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredItems = menuItems.filter((item) => {
    if (!item.available) return false;

    const categoryMatch = selectedCategory
      ? item.categories.includes(selectedCategory)
      : true;

    const subcategoryMatch = selectedSubcategory
      ? (item.subcategories || []).includes(selectedSubcategory)
      : true;

    return categoryMatch && subcategoryMatch;
  });

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-ruchi-cream/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="font-montserrat text-5xl md:text-6xl font-extrabold text-ruchi-blue mb-6 tracking-tighter leading-tight">
            Our Menu
          </h1>

          <h2 className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-5">
            We keep it casual, creative, and seriously tasty. <br />
            It’s all about mixing things up!!!
          </h2>

          {/* Order Now Button */}
          <Button
            asChild
            size="lg"
            className="bg-ruchi-blue hover:bg-ruchi-blue/90 text-white px-6 sm:px-8 py-3 text-sm sm:text-base rounded-full font-medium shadow-lg w-full sm:w-auto mb-6 sm:mb-8"
          >
            <a
              href="https://qopla.com/restaurant/ruchi/qEQLXMQwAr/order"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 justify-center"
            >
              🛒 Order Now
            </a>
          </Button>
        </div>

        {/* Category Filter */}
        <CategoryFilter />

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 animate-fade-in">
          {filteredItems.map((item) => (
            <MenuCard key={item.id} item={item} onClick={() => handleItemClick(item)} />
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-gray-400 text-2xl">🍽️</span>
            </div>
            <h3 className="font-playfair font-semibold text-xl text-gray-900 mb-2">
              No items found
            </h3>
            <p className="text-gray-600">
              Try selecting a different category or check back later.
            </p>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-10 sm:mt-12 pt-8 border-t border-gray-200 px-4">
          <h2 className="font-playfair font-semibold text-2xl text-gray-900 mb-3">
            Ready to order?
          </h2>
          <p className="text-gray-600 mb-6 text-base">
            Place your order online for pickup or delivery
          </p>
          <Button
            asChild
            size="lg"
            className="bg-ruchi-yellow text-gray-900 hover:bg-ruchi-yellow/90 px-6 sm:px-8 py-3 text-sm sm:text-base rounded-full font-medium shadow-lg w-full sm:w-auto"
          >
            <a
              href="https://qopla.com/restaurant/ruchi/qEQLXMQwAr/order"
              target="_blank"
              rel="noopener noreferrer"
            >
              🛒 Start Your Order
            </a>
          </Button>
        </div>
      </div>

      {/* Menu Item Dialog */}
      <MenuItemDialog item={selectedItem} open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
};

export default Menu;
