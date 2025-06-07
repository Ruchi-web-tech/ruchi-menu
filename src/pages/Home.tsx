import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[calc(100vh-64px)]">
        <img
          src="/ruchi-hero-img.jpg"
          alt="Ruchi Hero Banner"
          className="w-full h-full object-cover"
        />

        {/* CTA Buttons - Positioned 150px from bottom */}
        <div className="absolute bottom-[150px] left-1/2 transform -translate-x-1/2 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            asChild 
            size="lg" 
            className="bg-ruchi-blue hover:bg-ruchi-blue/90 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg"
          >
            <Link to="/menu" className="flex items-center gap-2">
              Explore Menu
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          
          <Button 
            asChild 
            size="lg"
            className="bg-ruchi-blue hover:bg-ruchi-blue/90 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg"
          >
            <a 
              href="https://qopla.com/restaurant/ruchi/qEQLXMQwAr/order" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              🛒 Order Now
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
