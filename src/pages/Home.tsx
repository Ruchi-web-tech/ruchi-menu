import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-ruchi-purple pb-19">
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
            <button className="w-full sm:w-auto bg-ruchi-cream text-gray-900 hover:bg-ruchi-blue/90 hover:text-white px-6 py-3 rounded-full font-medium shadow-md transition-all duration-200">
              Explore Menu
            </button>
          </Link>

          <a
            href="https://qopla.com/restaurant/ruchi/qEQLXMQwAr/order"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto text-center"
          >
            <button className="w-full sm:w-auto bg-ruchi-cream text-gray-900 hover:bg-ruchi-blue/90 hover:text-white px-6 py-3 rounded-full font-medium shadow-md transition-all duration-200">
              Order Now
            </button>
          </a>
        </div>
      </section>
      {/* Video Section */}
      <section className="relative w-full bg-white">
        <video
          className="w-full h-[300px] object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>
      {/* Delivery Partner Footer */}
      <footer className="bg-white border-t border-gray-200 shadow-md pt-4 pb-6 px-6 z-50">
        <div className="flex justify-center gap-8 items-center mb-4">
          <a
            href="https://www.foodora.se/restaurant/wvdo/ruchi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/logos/foodora.png"
              alt="Foodora"
              className="h-10 w-auto"
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
              className="h-10 w-auto"
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
        </div>

        {/* Tagline Below Logos */}
        <div className="text-center mt-4">
          <h2 className="text-lg sm:text-s font-light text-black leading-snug">
            Fresh sushi. Colorful salads. Asian flavors that make your day better.
          </h2>
        </div>
      </footer>
    </div>
  );
};

export default Home;
