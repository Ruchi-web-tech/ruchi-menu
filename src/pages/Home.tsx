import { Link } from 'react-router-dom';
import '../CtaButtonStyle.css'; // Adjust the path if needed

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-ruchi-cream">
      {/* Hero Section */}
      <section className="relative w-full h-screen">
        <img
          src="/ruchi-hero-mobile.jpg"
          alt="Ruchi Mobile Hero"
          className="w-full h-full object-cover block md:hidden"
        />
        <img
          src="/ruchi-hero-desktop.jpg"
          alt="Ruchi Desktop Hero"
          className="w-full h-full object-cover hidden md:block"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-0" />

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

      {/* Footer Section */}
      <div className="mx-2 mt-2">
  <footer
    className="relative bg-cover bg-center py-12 px-4 rounded-[15px] border-[2px] border-[#6447D7]"
    style={{
      backgroundImage: "url('/footer-bg.jpg')", // replace with your actual image path
    }}
  >
    {/* Blur + Overlay Behind Content */}
    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-[15px] z-0"></div>

    {/* Footer Content */}
    <div className="relative max-w-7xl mx-auto text-center z-10">
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-10 font-playfair">
        Order via Delivery Partners
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 place-items-center">
        {/* Foodora */}
        <a
          href="https://www.foodora.se/restaurant/wvdo/ruchi"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#ffe3ec] rounded-full w-64 h-96 flex flex-col items-center justify-center shadow-lg transition hover:scale-105"
        >
          <img src="/logos/foodora.png" alt="Foodora" className="h-16 mb-4" />
          <p className="text-xl text-[#444] mt-2 font-baloo tracking-wide">
            Comfort food on the go!
          </p>
        </a>

        {/* Uber Eats */}
        <a
          href="https://www.ubereats.com/se/store/ruchi/fGanG7K0XcOetSwxZx1SlA"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#d7f3e3] rounded-full w-64 h-96 flex flex-col items-center justify-center shadow-lg transition hover:scale-105"
        >
          <img src="/logos/ubereats.png" alt="Uber Eats" className="h-16 mb-4" />
          <p className="text-xl text-[#444] mt-2 font-baloo tracking-wide">
            Fast delivery to your door
          </p>
        </a>

        {/* Wolt */}
        <a
          href="https://wolt.com/sv/swe/boras/restaurant/ruchi"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#e5e6ff] rounded-full w-64 h-96 flex flex-col items-center justify-center shadow-lg transition hover:scale-105"
        >
          <img src="/logos/wolt.png" alt="Wolt" className="h-16 mb-4" />
          <p className="text-xl text-[#444] mt-2 font-baloo tracking-wide">
            Your cravings, delivered fast
          </p>
        </a>
      </div>

      <p className="text-sm text-gray-400 mt-12">
        © {new Date().getFullYear()} RUCHI. All rights reserved.
      </p>
    </div>
  </footer>
</div>

    </div>
  );
};

export default Home;
