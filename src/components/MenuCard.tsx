
import { MenuItem } from '@/types/menu';
import { Badge } from '@/components/ui/badge';

interface MenuCardProps {
  item: MenuItem;
  onClick: () => void;
}

const MenuCard = ({ item, onClick }: MenuCardProps) => {
  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'VGN':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'GF':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'NEW':
        return 'bg-ruchi-yellow text-gray-900 border-ruchi-yellow';
      case 'SPICY':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div 
      className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group cursor-pointer"
      onClick={onClick}
    >
      {/* Image */}
      <div className="aspect-w-16 aspect-h-12 bg-gray-200 relative overflow-hidden">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-ruchi-cream to-ruchi-purple/20 flex items-center justify-center">
            <span className="text-gray-500 font-medium">No Image</span>
          </div>
        )}
        
        {/* Tags overlay */}
        {item.tags && item.tags.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1">
            {item.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className={`text-xs px-2 py-1 ${getTagColor(tag)}`}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-playfair font-semibold text-lg text-gray-900 line-clamp-1">
            {item.name}
          </h3>
          <span className="font-bold text-ruchi-blue text-lg ml-2">
           {Math.round(item.price)} kr
          </span>
        </div>
        
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
          {item.description}
        </p>
        
        {!item.available && (
          <div className="mt-3 text-red-500 text-sm font-medium">
            Currently Unavailable
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuCard;
