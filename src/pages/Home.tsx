import { Link } from 'react-router-dom';
import '../CtaButtonStyle.css'; // adjust if needed

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-ruchi-cream pb-20">
      {/* Hero Section */}
      <section className="relative w-full h-screen">
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

        {/* Optional Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-0" />

        {/* CTA Buttons */}
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex flex-col sm:flex-row gap-3 px-4 w-full justify-center items-center z-10">
          <Link to="/menu" className="w-full sm:w-auto text-center">
            <button className="cta-mi-button w-full sm:w-auto">
              <span>Explore Menu</span>
              <div className="animation"></div>
            </button>
          </Link>

          <a
            href="https://qopla.com/restaurant/ruchi/qEQLXMQwAr/order"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto text-center"
          >
            <button className="cta-mi-button w-full sm:w-auto">
              <span>Order Now</span>
              <div className="animation"></div>
            </button>
          </a>
        </div>
      </section>

      {/* Fixed Delivery Partner Footer */}
      <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-md py-2 px-6 z-50 flex justify-center gap-8 items-center">
        <a
          href="https://www.foodora.se/restaurant/wvdo/ruchi"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/logos/foodora.png"
            alt="Foodora"
            className="h-8 w-auto"
          />
        </a>
        <a
          href="https://www.ubereats.com/se/store/ruchi/fGanG7K0XcOetSwxZx1SlA"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/logos/uber_eats.jpg"
            alt="Uber Eats"
            className="h-8 w-auto"
          />
        </a>
        <a
          href="https://wolt.com/sv/swe/boras/restaurant/ruchi"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/logos/wolt.png"
            alt="Wolt"
            className="h-6 w-auto"
          />
        </a>
      </footer>
    </div>
  );
};

export default Home;
