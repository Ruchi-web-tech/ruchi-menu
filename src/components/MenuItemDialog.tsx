
import { MenuItem } from '@/types/menu';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface MenuItemDialogProps {
  item: MenuItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MenuItemDialog = ({ item, open, onOpenChange }: MenuItemDialogProps) => {
  if (!item) return null;

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="font-playfair text-xl">{item.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Image */}
          <div className="aspect-w-16 aspect-h-12 bg-gray-200 relative overflow-hidden rounded-lg">
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gradient-to-br from-ruchi-cream to-ruchi-purple/20 flex items-center justify-center">
                <span className="text-gray-500 font-medium">No Image</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
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

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">
            {item.description}
          </p>

          {/* Price */}
          <div className="flex justify-between items-center pt-4 border-t">
            <span className="font-bold text-2xl text-ruchi-blue">
            {Math.round(item.price)} kr
            </span>
            
            {!item.available && (
              <span className="text-red-500 text-sm font-medium">
                Currently Unavailable
              </span>
            )}
          </div>

          {/* Order Button */}
          <Button 
            asChild 
            className="w-full bg-ruchi-blue hover:bg-ruchi-blue/90 text-white"
          >
            <a 
              href="https://qopla.com/restaurant/ruchi/qEQLXMQwAr/order" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              🛒 Order This Item
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MenuItemDialog;
