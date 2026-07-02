import { Link } from 'react-router-dom'
import RotatingText from '@/components/RotatingText'
import CurvedLoop from '@/components/CurvedLoop'

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-ruchi-purple overflow-x-hidden">
      
      {/* HERO SECTION */}
      <section className="relative w-full h-screen">
        
        {/* Mobile Hero */}
        <img
          src="/ruchi-hero-mobile.jpg"
          alt="Ruchi Mobile Hero"
          className="w-full h-full object-cover block md:hidden"
        />

        {/* Desktop Hero */}
        <img
          src="/ruchi-hero-desktop.jpg"
          alt="Ruchi Desktop Hero"
          className="w-full h-full object-cover hidden md:block"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-0" />

        {/* CTA BUTTONS */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col sm:flex-row gap-3 px-4 w-full justify-center items-center z-10">
          
          <Link to="/menu" className="w-full sm:w-auto text-center">
            <button className="w-full sm:w-auto bg-ruchi-cream text-gray-900 hover:bg-ruchi-blue hover:text-white px-7 py-3 rounded-full font-medium shadow-xl transition-all duration-300 hover:scale-105">
              Explore Menu
            </button>
          </Link>

          <a
            href="https://qopla.com/restaurant/ruchi/qEQLXMQwAr/order"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto text-center"
          >
            <button className="w-full sm:w-auto bg-ruchi-cream text-gray-900 hover:bg-ruchi-blue hover:text-white px-7 py-3 rounded-full font-medium shadow-xl transition-all duration-300 hover:scale-105">
              Order Now
            </button>
          </a>

        </div>
      </section>

      {/* VIDEO + CURVED TEXT SECTION */}
      <section className="bg-ruchi-purple pt-8 pb-0">

        {/* VIDEO CONTAINER */}
        <div className="max-w-5xl mx-auto px-4">

          {/* COLOR FRAME */}
          <div className="p-[4px] rounded-[32px] bg-gradient-to-r from-ruchi-purple via-ruchi-blue to-ruchi-yellow shadow-2xl">

            <div className="rounded-[28px] overflow-hidden bg-black">
              <video
                className="w-full h-[260px] sm:h-[400px] md:h-[480px] object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/videos/hero.mp4" type="video/mp4" />
              </video>
            </div>

          </div>
        </div>

        {/* CURVED TEXT */}
        <div className="relative -mt-1 -mb-4 w-screen overflow-hidden">

          <CurvedLoop
            marqueeText="✦✦ Born in the north ✦ inspired by Asia ✦✦"
            speed={1.5}
            curveAmount={45}
            direction="right"
            interactive
            className="
              text-white
              font-black
              uppercase
              tracking-[-0.08em]
              text-[24px]
              sm:text-[48px]
              md:text-[72px]
              lg:text-[88px]
              leading-none
            "
          />

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200 pt-6 pb-10 px-6 -mt-2">

        {/* DELIVERY LOGOS */}
        <div className="flex justify-center gap-4 sm:gap-6 items-center flex-wrap">

          <a
            href="https://www.foodora.se/restaurant/wvdo/ruchi"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-full px-5 py-3 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
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
            className="bg-white rounded-full px-5 py-3 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
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
            className="bg-white rounded-full px-5 py-3 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
          >
            <img
              src="/logos/wolt.png"
              alt="Wolt"
              className="h-7 w-auto"
            />
          </a>

        </div>

        {/* ROTATING TEXT */}
        <div className="mt-10">
          <RotatingText />
        </div>

      </footer>
    </div>
  )
}

export default Home