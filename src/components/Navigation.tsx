import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const ORDER_URL = 'https://qopla.com/restaurant/ruchi/qEQLXMQwAr/order';

const NAV_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'Menu', path: '/menu' },
  { name: 'About', path: '/about' },
];

/**
 * Shared header: logo, pill links and a dark "Order now" pill.
 * Height is h-16 on phones and h-20 from md up — the Menu page's sticky
 * category bar sits right under it (top-16 / md:top-20).
 */
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close the phone menu whenever the page changes
  useEffect(() => setIsOpen(false), [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-ruchi-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 md:h-20 md:px-8">
        <Link to="/" aria-label="RUCHI home" className="flex items-center">
          <img src="/logo.png" alt="RUCHI" className="h-[30px] w-auto md:h-9" />
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1.5 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              aria-current={isActive(item.path) ? 'page' : undefined}
              className={cn(
                'inline-flex h-11 items-center rounded-full px-[18px] font-sans text-[15px] text-ruchi-ink transition-colors',
                isActive(item.path) ? 'bg-white font-bold' : 'font-semibold hover:bg-white/70'
              )}
            >
              {item.name}
            </Link>
          ))}
          <a
            href={ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 inline-flex h-12 items-center rounded-full bg-ruchi-ink px-6 font-sans text-[15px] font-bold text-ruchi-cream transition hover:scale-105"
          >
            Order now
          </a>
        </div>

        {/* Phone: order pill + menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center rounded-full bg-ruchi-ink px-[18px] font-sans text-sm font-bold text-ruchi-cream"
          >
            Order
          </a>
          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-ruchi-ink"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {isOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Phone menu */}
      {isOpen && (
        <div className="animate-fade-in px-3 pb-3 md:hidden">
          <div className="flex flex-col gap-1 rounded-3xl bg-white p-2 shadow-lg">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                aria-current={isActive(item.path) ? 'page' : undefined}
                className={cn(
                  'flex h-12 items-center rounded-2xl px-4 font-display text-lg font-extrabold uppercase tracking-tight text-ruchi-ink',
                  isActive(item.path) ? 'bg-ruchi-yellow' : 'hover:bg-ruchi-cream'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
