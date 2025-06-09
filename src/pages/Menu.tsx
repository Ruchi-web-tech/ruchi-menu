
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

  const filteredItems = menuItems.filter(item => {
    if (!item.available) return false;
    
    if (selectedCategory && item.category !== selectedCategory) return false;
    
    if (selectedSubcategory && item.subcategory !== selectedSubcategory) return false;
    
    return true;
  });

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-ruchi-cream/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-playfair font-bold text-3xl md:text-4xl text-gray-900 mb-4">
            Our Menu
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
          We keep it casual, creative, and seriously tasty. <br /> 
          It’s all about mixing things up!!!
          </p>
          
          {/* Order Now Button */}
          <Button 
            asChild 
            size="lg"
            className="bg-ruchi-blue hover:bg-ruchi-blue/90 text-white px-6 py-3 rounded-full font-medium shadow-lg mb-8"
          >
            <a 
              href="https://qopla.com/restaurant/ruchi/qEQLXMQwAr/order" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 mx-auto w-fit"
            >
              🛒 Order Now
            </a>
          </Button>
        </div>

        {/* Category Filter */}
        <CategoryFilter />

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {filteredItems.map((item) => (
            <MenuCard 
              key={item.id} 
              item={item} 
              onClick={() => handleItemClick(item)}
            />
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
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <h2 className="font-playfair font-semibold text-2xl text-gray-900 mb-4">
            Ready to order?
          </h2>
          <p className="text-gray-600 mb-6">
            Place your order online for pickup or delivery
          </p>
          <Button 
            asChild 
            size="lg"
            className="bg-ruchi-yellow text-gray-900 hover:bg-ruchi-yellow/90 px-8 py-3 rounded-full font-medium shadow-lg"
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
      <MenuItemDialog
        item={selectedItem}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
};

export default Menu;
