import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import DishTile from '@/components/DishTile';
import { chooseBanner, type ShownBanner } from '@/lib/banner';
import { categoryStyle } from '@/lib/categoryStyle';
import { swedishDateKey } from '@/lib/hours';
import { cn } from '@/lib/utils';
import { useMenuStore } from '@/store/menuStore';

const ORDER_URL = 'https://qopla.com/restaurant/ruchi/qEQLXMQwAr/order';

/** Today's banner (Swedish date). Null until the live content has loaded. */
export function useTodayBanner(): ShownBanner | null {
  const { menuItems, info, banners, liveLoaded } = useMenuStore();
  return useMemo(() => {
    if (!liveLoaded) return null;
    return chooseBanner(swedishDateKey(), banners, menuItems, info);
  }, [liveLoaded, banners, menuItems, info]);
}

function hiddenKey() {
  return `ruchi-banner-hidden-${swedishDateKey()}`;
}

function readHidden() {
  try {
    return sessionStorage.getItem(hiddenKey()) === '1';
  } catch {
    return false;
  }
}

const Sparkle = ({ className }: { className?: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" className={cn('flex-shrink-0', className)}>
    <path fill="currentColor" d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z" />
  </svg>
);

const Arrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-shrink-0">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/** Slim strip above the header on every page ("bar" days and closed days). */
export function BannerBar() {
  const banner = useTodayBanner();
  const [hidden, setHidden] = useState(readHidden);
  if (!banner || banner.style !== 'bar' || hidden) return null;

  function hide() {
    setHidden(true);
    try {
      sessionStorage.setItem(hiddenKey(), '1');
    } catch {
      /* private mode: just hide for now */
    }
  }

  const closed = !!banner.closed;
  const content = (
    <>
      <span className="font-sans text-[13px] font-extrabold md:text-[15px]">{banner.label}:</span>
      <span className="min-w-0 font-sans text-[13px] font-semibold md:text-[15px]">
        {banner.headline}
        {banner.line && <span className="hidden font-sans text-[15px] font-medium md:inline"> · {banner.line}</span>}
        {closed && banner.line && <span className="font-sans text-[13px] font-medium md:hidden"> {banner.line}</span>}
        {banner.price && <span className="font-sans text-[13px] font-extrabold md:text-[15px]"> · {banner.price}</span>}
      </span>
    </>
  );

  return (
    <div className={cn('grain flex min-h-[48px] items-center gap-2 pl-4 pr-1 md:pl-6', closed ? 'bg-ruchi-ink text-ruchi-cream' : 'bg-ruchi-yellow text-ruchi-ink')}>
      <Sparkle />
      {closed ? (
        <Link to="/menu" className="flex min-h-11 flex-1 flex-wrap items-center gap-x-1.5 py-1.5 md:justify-center">
          {content}
        </Link>
      ) : (
        <a href={ORDER_URL} target="_blank" rel="noopener noreferrer" className="flex min-h-11 flex-1 items-center gap-1.5 py-1.5 md:justify-center">
          <span className="flex min-w-0 flex-wrap items-baseline gap-x-1.5 font-sans text-[13px] md:text-[15px]">{content}</span>
          <Arrow />
        </a>
      )}
      <button type="button" onClick={hide} aria-label="Hide message" className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full hover:bg-black/10">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>
  );
}

/** Tilted badge on the homepage hero photo ("sticker" days). */
export function BannerSticker() {
  const banner = useTodayBanner();
  if (!banner || banner.style !== 'sticker') return null;
  return (
    <a
      href={ORDER_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${banner.label}: ${banner.headline} ${banner.price}`}
      className="grain absolute right-4 top-4 flex h-[138px] w-[138px] -rotate-12 flex-col items-center justify-center gap-1 rounded-full bg-ruchi-yellow p-4 text-center text-ruchi-ink shadow-[0_14px_30px_rgba(27,20,51,0.3)] outline-dashed outline-[3px] outline-ruchi-ink [outline-offset:-10px] transition-transform duration-300 hover:rotate-0 hover:scale-105 md:right-9 md:top-9 md:h-[210px] md:w-[210px] md:p-7"
    >
      <span className="font-sans text-[10px] font-extrabold uppercase tracking-[0.14em] md:text-[13px]">{banner.label}</span>
      <span className="line-clamp-3 font-display text-[15px] font-black uppercase leading-[0.95] tracking-[-0.03em] md:text-[24px]">
        {banner.headline}
      </span>
      {banner.price && <span className="font-sans text-[12px] font-extrabold md:text-[16px]">{banner.price}</span>}
    </a>
  );
}

/** Big "Today's pick" card under the homepage hero ("card" days). */
export function BannerCard() {
  const banner = useTodayBanner();
  if (!banner || banner.style !== 'card') return null;
  const dish = banner.dish;
  const style = categoryStyle(dish?.categories);
  const dateLabel = new Date().toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'Europe/Stockholm' });

  const photo = dish?.image ? (
    <img src={dish.image} alt={dish.name} className="h-full w-full object-cover" />
  ) : (
    <DishTile name={banner.headline} categories={dish?.categories} inverted textClassName="text-[34px] md:text-[56px]" />
  );

  return (
    <section
      className={cn(
        'grain mt-3 grid gap-4 rounded-[32px] p-5 md:mt-4 md:grid-cols-[1.1fr_1fr] md:items-center md:gap-10 md:rounded-[40px] md:p-7',
        style.bg,
        style.text,
        dish?.categories[0] === 'sides' && 'shadow-[inset_0_0_0_2px_#1B1433]'
      )}
    >
      <div className="flex items-center justify-between md:hidden">
        <span className="inline-flex h-8 items-center rounded-full bg-ruchi-ink px-3 font-sans text-xs font-bold uppercase tracking-[0.12em] text-ruchi-cream">
          {banner.label}
        </span>
        <span className="font-sans text-[13px] font-bold">{dateLabel}</span>
      </div>

      <div className="h-[210px] overflow-hidden rounded-[22px] md:h-[380px] md:rounded-[28px]">{photo}</div>

      <div className="flex flex-col gap-4 md:gap-5 md:pr-7">
        <div className="hidden items-center gap-3 md:flex">
          <span className="inline-flex h-9 items-center rounded-full bg-ruchi-ink px-4 font-sans text-[13px] font-bold uppercase tracking-[0.12em] text-ruchi-cream">
            {banner.label}
          </span>
          <span className="font-sans text-sm font-bold">{dateLabel}</span>
        </div>
        <h2 className="font-display text-[30px] font-black uppercase leading-none tracking-[-0.03em] md:text-[56px] md:leading-[0.92] md:tracking-[-0.04em]">
          {banner.headline}
        </h2>
        {banner.line && <p className="max-w-[460px] font-sans text-[15px] font-medium leading-snug md:text-lg md:leading-normal">{banner.line}</p>}
        <div className="flex items-center gap-2.5 md:gap-3">
          {banner.price && (
            <span className="inline-flex h-[52px] items-center rounded-full bg-ruchi-cream px-[18px] font-sans text-base font-extrabold text-ruchi-ink md:h-14 md:px-[22px] md:text-lg">
              {banner.price}
            </span>
          )}
          <a
            href={ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-[52px] flex-1 items-center justify-center rounded-full bg-ruchi-ink px-[30px] font-sans text-base font-bold text-ruchi-cream transition-transform duration-300 hover:scale-105 md:h-14 md:flex-none"
          >
            Order now
          </a>
        </div>
      </div>
    </section>
  );
}
