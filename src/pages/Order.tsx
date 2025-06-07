
import { useEffect } from 'react';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Order = () => {
  useEffect(() => {
    // Redirect to Qopla after a short delay
    const timer = setTimeout(() => {
      window.open('https://qopla.com/restaurant/ruchi/qEQLXMQwAr/order', '_blank');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-ruchi-cream via-white to-ruchi-purple/10 flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 animate-fade-in">
          {/* Loading Animation */}
          <div className="w-16 h-16 bg-gradient-to-br from-ruchi-blue to-ruchi-purple rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-xl animate-pulse">🛒</span>
          </div>

          <h1 className="font-playfair font-bold text-2xl text-gray-900 mb-4">
            Redirecting to Order
          </h1>
          
          <p className="text-gray-600 mb-6">
            You're being redirected to our online ordering platform. 
            If the page doesn't open automatically, click the button below.
          </p>

          {/* Manual Redirect Button */}
          <Button 
            asChild 
            size="lg"
            className="bg-ruchi-blue hover:bg-ruchi-blue/90 text-white px-6 py-3 rounded-full font-medium shadow-lg mb-4 w-full"
          >
            <a 
              href="https://qopla.com/restaurant/ruchi/qEQLXMQwAr/order" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              🛒 Order Now
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>

          {/* Back to Menu */}
          <Button 
            asChild 
            variant="outline"
            className="border-ruchi-blue/20 text-ruchi-blue hover:bg-ruchi-blue/10 w-full"
          >
            <Link to="/menu" className="flex items-center justify-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Menu
            </Link>
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            Powered by Qopla • Secure ordering platform
          </p>
        </div>
      </div>
    </div>
  );
};

export default Order;
