import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Hero Section */}
      <section className="relative w-full h-[calc(100vh-64px)]">
        {/* Mobile Hero Image */}
        <img
          src="/ruchi-hero-mobile.jpg"
          alt="Ruchi Mobile Hero"
          className="w-full h-full object-cover block md:hidden"
        />

        {/* Desktop Hero Image */}
        <img
          src="/ruchi-hero-desktop.jpg"
          alt="Ruchi Desktop Hero"
          className="w-full h-full object-cover hidden md:block"
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

      {/* Footer */}
      <div className="mx-2 mt-1">
        <footer className="bg-white/95 backdrop-blur-sm border-[2px] border-[#6447D7] rounded-[15px] py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Order via Delivery Partners</h3>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://www.foodora.se/restaurant/wvdo/ruchi"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 rounded-full bg-pink-500 text-white hover:bg-pink-600 text-sm font-semibold shadow"
              >
                Foodora
              </a>
              <a
                href="https://www.ubereats.com/se/store/ruchi/fGanG7K0XcOetSwxZx1SlA"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 text-sm font-semibold shadow"
              >
                Uber Eats
              </a>
              <a
                href="https://wolt.com/sv/swe/boras/restaurant/ruchi"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 text-sm font-semibold shadow"
              >
                Wolt
              </a>
            </div>

            <p className="text-sm text-gray-500 mt-6">
              © {new Date().getFullYear()} RUCHI. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
