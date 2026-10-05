import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useMenuStore } from '@/store/menuStore';
import { useMenuJsonLd, usePageMeta } from '@/lib/seo';
import MenuCard from '@/components/MenuCard';
import MenuItemDialog from '@/components/MenuItemDialog';
import SiteFooter from '@/components/SiteFooter';
import { MenuItem } from '@/types/menu';
import { todaysHours } from '@/lib/hours';
import { cn } from '@/lib/utils';

const ORDER_URL = 'https://qopla.com/restaurant/ruchi/qEQLXMQwAr/order';

/** Each category has its own RUCHI colour — used on its button and its header band. */
const CATEGORY_STYLE: Record<string, string> = {
  salads: 'bg-ruchi-yellow text-ruchi-ink',
  bao: 'bg-ruchi-pink text-ruchi-ink',
  sushi: 'bg-ruchi-turquoise text-ruchi-ink',
  sando: 'bg-ruchi-purple text-ruchi-ink',
  sides: 'bg-white text-ruchi-ink ring-2 ring-inset ring-ruchi-ink',
  drinks: 'bg-ruchi-ink text-ruchi-cream',
};
const styleFor = (id: string) => CATEGORY_STYLE[id] ?? 'bg-white text-ruchi-ink';

const DELIVERY = [
  { name: 'Foodora', href: 'https://www.foodora.se/restaurant/wvdo/ruchi' },
  { name: 'Uber Eats', href: 'https://www.ubereats.com/se/store/ruchi/fGanG7K0XcOetSwxZx1SlA' },
  { name: 'Wolt', href: 'https://wolt.com/sv/swe/boras/restaurant/ruchi' },
];

const Menu = () => {
  const { menuItems, categories, info } = useMenuStore();
  usePageMeta({
    title: 'Menu & Prices | RUCHI Borås – Bowls, Bao, Sushi & Sando',
    description: 'The full RUCHI menu with prices: Asian bowls, bao with fries, sushi rolls and nigiri, Nashville hot chicken sando, sides and drinks. Meny och priser – sushi, bao och bowls i Borås.',
    path: '/menu',
  });
  useMenuJsonLd(menuItems);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  // One section per category that has dishes on the menu right now
  const sections = useMemo(
    () =>
      [...categories]
        .sort((a, b) => a.order - b.order)
        .map((cat) => ({
          ...cat,
          dishes: menuItems.filter((item) => item.available && item.categories.includes(cat.id)),
        }))
        .filter((s) => s.dishes.length > 0),
    [categories, menuItems]
  );

  const hoursToday = todaysHours(info);
  const closedToday = !hoursToday || /closed|stängt/i.test(hoursToday);

  // Highlight the category button for the section currently on screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id.replace('cat-', ''));
      },
      { rootMargin: '-160px 0px -55% 0px' }
    );
    sections.forEach((s) => {
      const el = document.getElementById(`cat-${s.id}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  // Arriving from a Home tile (e.g. /menu#cat-sushi): jump to that section
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) el.scrollIntoView({ block: 'start' });
  }, [hash, sections.length]);

  const jumpTo = (id: string) => {
    setActive(id);
    document.getElementById(`cat-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-ruchi-cream pb-28 text-ruchi-ink md:pb-0">
      <div className="mx-auto max-w-7xl px-3 pt-3 sm:px-6 md:px-8 md:pt-6">
        {/* Hero */}
        <section className="grain grid items-end gap-6 rounded-[32px] bg-ruchi-blue px-5 pb-7 pt-7 text-ruchi-cream md:grid-cols-2 md:gap-8 md:rounded-[40px] md:px-14 md:pb-12 md:pt-14">
          <div className="flex flex-col gap-3.5 md:gap-4">
            <span className="font-sans text-xs font-bold uppercase tracking-[0.15em] text-ruchi-yellow md:text-[13px]">
              Borås · Eat in · Take away
            </span>
            <h1 className="font-display text-[60px] font-black uppercase leading-[0.88] tracking-[-0.045em] md:text-[clamp(72px,9vw,132px)]">
              The
              <br />
              Menu
            </h1>
          </div>
          <div className="flex flex-col items-start gap-4 md:pb-2">
            <p className="font-sans text-[15px] font-medium leading-snug md:font-display md:text-[26px] md:font-semibold md:leading-tight">
              Born in the north ✦ inspired by Asia
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex h-9 items-center gap-2 rounded-full bg-ruchi-yellow px-4 font-sans text-[13px] font-bold text-ruchi-ink md:text-sm">
                <span className="h-2 w-2 rounded-full bg-ruchi-ink" aria-hidden="true" />
                {closedToday ? 'Closed today' : `Open today · ${hoursToday}`}
              </span>
              {info.address && (
                <span className="inline-flex h-9 items-center rounded-full bg-ruchi-cream/15 px-4 font-sans text-[13px] font-semibold text-ruchi-cream md:text-sm">
                  {info.address}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Category buttons — stick under the main navigation while scrolling */}
        <nav
          aria-label="Menu categories"
          className="no-scrollbar sticky top-16 z-30 md:top-20 -mx-3 flex gap-2 overflow-x-auto bg-ruchi-cream px-3 pb-3 pt-4 sm:mx-0 sm:px-0 md:flex-wrap md:gap-2.5 md:pb-4 md:pt-6"
        >
          {sections.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => jumpTo(s.id)}
              aria-current={active === s.id ? 'true' : undefined}
              className={cn(
                'inline-flex h-11 flex-shrink-0 items-center rounded-full px-[18px] font-sans text-sm font-bold transition md:h-12 md:px-[22px] md:text-[15px]',
                styleFor(s.id),
                active === s.id && 'shadow-[inset_0_0_0_2px_#1B1433] ring-0'
              )}
            >
              {s.name}
            </button>
          ))}
        </nav>

        {/* Sections */}
        <div className="flex flex-col gap-7 pt-2 md:gap-14 md:pt-4">
          {sections.map((s) => (
            <section key={s.id} id={`cat-${s.id}`} className="flex scroll-mt-36 flex-col gap-2.5 md:scroll-mt-40 md:gap-5">
              <div
                className={cn(
                  'grain flex items-end justify-between gap-4 rounded-3xl px-5 py-[22px] md:rounded-[32px] md:px-10 md:py-9',
                  styleFor(s.id)
                )}
              >
                <h2 className="font-display text-[34px] font-black uppercase leading-none tracking-[-0.03em] md:text-7xl md:leading-[0.9] md:tracking-[-0.04em]">
                  {s.name}
                </h2>
                <span className="font-sans text-[13px] font-bold md:text-[15px]">
                  {s.dishes.length} {s.dishes.length === 1 ? 'dish' : 'dishes'}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
                {s.dishes.map((item) => (
                  <MenuCard key={item.id} item={item} onClick={() => handleItemClick(item)} />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Order band (tablet/desktop) */}
        <section className="grain mb-10 mt-12 hidden flex-wrap items-center justify-between gap-6 rounded-[40px] bg-ruchi-ink px-12 py-10 text-ruchi-cream md:mb-12 md:mt-[72px] md:flex">
          <h2 className="font-display text-[40px] font-black uppercase leading-none tracking-[-0.03em]">Hungry yet?</h2>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={ORDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center rounded-full bg-ruchi-yellow px-7 font-sans text-base font-bold text-ruchi-ink transition hover:scale-105"
            >
              Order for pickup
            </a>
            {DELIVERY.map((d) => (
              <a
                key={d.name}
                href={d.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center rounded-full bg-ruchi-cream/10 px-6 font-sans text-base font-bold text-ruchi-cream transition hover:bg-ruchi-cream/20"
              >
                {d.name}
              </a>
            ))}
          </div>
        </section>
      </div>

      <SiteFooter />

      {/* Sticky order button (phones) */}
      <div className="fixed inset-x-0 bottom-0 z-40 bg-gradient-to-t from-ruchi-cream via-ruchi-cream/90 to-transparent px-3 pb-5 pt-6 md:hidden">
        <a
          href={ORDER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="grain flex h-[60px] items-center justify-between rounded-full bg-ruchi-blue pl-6 pr-2 text-ruchi-cream shadow-[0_12px_30px_rgba(100,71,215,0.35)]"
        >
          <span className="font-sans text-[15px] font-bold">Order for pickup or delivery</span>
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ruchi-yellow" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B1433" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </a>
      </div>

      <MenuItemDialog item={selectedItem} open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
};

export default Menu;
