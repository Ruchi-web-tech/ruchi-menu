import { Link } from 'react-router-dom';
import '../CtaButtonStyle.css'; // Adjust the path if needed

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-ruchi-cream">
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

      {/* Footer */}
      <div className="mx-2 mt-2">
        <footer className="bg-white/95 backdrop-blur-sm border-[2px] border-[#6447D7] rounded-[15px] py-8 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
              Order via Delivery Partners
            </h3>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
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

            <p className="text-xs sm:text-sm text-gray-500">
              © {new Date().getFullYear()} RUCHI. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
