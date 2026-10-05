import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import CurvedLoop from '@/components/CurvedLoop'
import SiteFooter from '@/components/SiteFooter'
import { useMenuStore } from '@/store/menuStore'
import { specialDay, swedishDateKey, todaysHours } from '@/lib/hours'
import { BannerCard, BannerSticker } from '@/components/DailyBanner'
import HeroTheme, { THEME_PILL } from '@/components/HeroTheme'
import { activeTheme, previewTheme } from '@/lib/themes'
import { cn } from '@/lib/utils'

const ORDER_URL = 'https://qopla.com/restaurant/ruchi/qEQLXMQwAr/order'

// Category tiles: same colours as the menu page
const TILES = [
  { id: 'salads', name: 'Bowls', style: 'bg-ruchi-yellow' },
  { id: 'bao', name: 'Bao', style: 'bg-ruchi-pink' },
  { id: 'sushi', name: 'Sushi', style: 'bg-ruchi-turquoise' },
  { id: 'sando', name: 'Sando', style: 'bg-ruchi-purple' },
]

const DELIVERY = [
  { name: 'Foodora', href: 'https://www.foodora.se/restaurant/wvdo/ruchi', logo: '/logos/foodora.png', h: 'h-6 md:h-7' },
  { name: 'Uber Eats', href: 'https://www.ubereats.com/se/store/ruchi/fGanG7K0XcOetSwxZx1SlA', logo: '/logos/uber_eats.jpg', h: 'h-6 md:h-7' },
  { name: 'Wolt', href: 'https://wolt.com/sv/swe/boras/restaurant/ruchi', logo: '/logos/wolt.png', h: 'h-5 md:h-[26px]' },
]

const Home = () => {
  const { menuItems, info, themes } = useMenuStore()
  const theme = previewTheme(themes, window.location.search) ?? activeTheme(swedishDateKey(), themes)

  const hoursToday = todaysHours(info)
  const closedToday = !hoursToday || /closed|stängt/i.test(hoursToday)
  const specialToday = specialDay(info, swedishDateKey())
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`RUCHI ${info.address} ${info.postalCity}`)}`
  const instagramHandle = '@' + (info.instagram.replace(/\/+$/, '').split('/').pop() || 'ruchi_room')

  // Each tile shows the first dish photo of that category (live from the app)
  const tiles = useMemo(
    () =>
      TILES.map((t) => ({
        ...t,
        image: menuItems.find((i) => i.available && i.categories.includes(t.id) && i.image)?.image,
      })),
    [menuItems]
  )

  const pill = 'inline-flex h-14 items-center justify-center rounded-full px-[30px] font-sans text-base font-bold shadow-[0_12px_30px_rgba(27,20,51,0.25)] transition-transform duration-300 hover:scale-105'

  return (
    <div className="min-h-screen bg-ruchi-cream text-ruchi-ink">
      {/* HERO */}
      <div className="mx-auto max-w-7xl px-3 sm:px-6 md:px-8">
        <section className="relative h-[600px] overflow-hidden rounded-[32px] bg-ruchi-blue md:h-[720px] md:rounded-[40px]">
          <img src={theme?.heroMobile || '/ruchi-hero-mobile.jpg'} alt="RUCHI bowls, bao and sushi seen from above" className="block h-full w-full object-cover md:hidden" />
          <img src={theme?.heroDesktop || '/ruchi-hero-desktop.jpg'} alt="RUCHI bowls, bao and sushi seen from above" className="hidden h-full w-full object-cover md:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" aria-hidden="true" />
          {theme && <HeroTheme theme={theme.id} />}
          <BannerSticker />

          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2.5 p-[18px] md:flex-row md:flex-wrap md:items-end md:justify-between md:gap-6 md:p-10">
            <span className={cn('inline-flex h-[34px] w-fit items-center gap-2 rounded-full px-3.5', (theme && THEME_PILL[theme.id]) || 'bg-ruchi-yellow', 'font-sans text-[13px] font-bold text-ruchi-ink md:h-10 md:px-[18px] md:text-sm')}>
              <span className="h-2 w-2 rounded-full bg-ruchi-ink" aria-hidden="true" />
              {closedToday ? 'Closed today' : `Open today · ${hoursToday}`}
            </span>
            <div className="flex flex-col gap-2.5 md:flex-row md:gap-3">
              <Link to="/menu" className={cn(pill, 'bg-ruchi-cream text-ruchi-ink')}>
                Explore menu
              </Link>
              <a href={ORDER_URL} target="_blank" rel="noopener noreferrer" className={cn(pill, 'bg-ruchi-ink text-ruchi-cream')}>
                Order now
              </a>
            </div>
          </div>
        </section>

        {/* TODAY'S PICK (daily banner, set in the operations app) */}
        <BannerCard />

        {/* CATEGORY TILES */}
        <section className="mt-10 flex flex-col gap-3.5 md:mt-[72px] md:gap-6">
          <h2 className="mx-1 font-display text-[32px] font-black uppercase leading-[0.95] tracking-[-0.04em] md:mx-0 md:text-[56px]">
            Bowl · Bao
            <br />
            Sushi · Sando
          </h2>
          <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-4">
            {tiles.map((t) => (
              <Link
                key={t.id}
                to={`/menu#cat-${t.id}`}
                className={cn(
                  'grain group flex min-h-[170px] flex-col justify-between rounded-[26px] p-[18px] text-ruchi-ink transition-transform duration-300 hover:-translate-y-1 md:min-h-[300px] md:rounded-[32px] md:p-7',
                  t.style
                )}
              >
                <span className="font-display text-[22px] font-black uppercase leading-none tracking-[-0.03em] md:text-4xl">{t.name}</span>
                {t.image && (
                  <img
                    src={t.image}
                    alt=""
                    loading="lazy"
                    className="h-[92px] w-[92px] self-end rounded-full object-cover shadow-[0_10px_24px_rgba(27,20,51,0.2)] transition-transform duration-500 group-hover:scale-105 md:h-[150px] md:w-[150px]"
                  />
                )}
              </Link>
            ))}
          </div>
        </section>

        {/* VIDEO — constrained width, dark frame */}
        <section className="mt-10 flex justify-center md:mt-[72px]">
          <div className="w-full max-w-5xl rounded-[30px] bg-ruchi-ink p-[5px] shadow-[0_30px_60px_rgba(27,20,51,0.18)] md:rounded-[40px] md:p-1.5">
            <div className="overflow-hidden rounded-[25px] bg-black md:rounded-[34px]">
              <video className="block h-[240px] w-full object-cover sm:h-[400px] md:h-auto md:aspect-video" autoPlay loop muted playsInline>
                <source src="/videos/hero.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </section>
      </div>

      {/* CURVED BRAND LINE — full browser width */}
      <section className="grain mt-10 w-full overflow-hidden bg-ruchi-blue pb-2.5 pt-5 md:mt-[72px] md:pb-7 md:pt-10">
        <CurvedLoop
          marqueeText="Born in the north ✦ inspired by Asia ✦ "
          speed={1.5}
          curveAmount={45}
          direction="right"
          interactive
          className="font-display text-ruchi-cream font-black uppercase tracking-[-0.04em] text-[36px] sm:text-[52px] md:text-[72px] lg:text-[84px]"
        />
      </section>

      <div className="mx-auto max-w-7xl px-3 sm:px-6 md:px-8">
        {/* VISIT */}
        <section className="mt-10 grid gap-2.5 md:mt-[72px] md:grid-cols-3 md:gap-4">
          <div className="flex flex-col gap-1.5 rounded-[26px] bg-white p-[22px] md:gap-2.5 md:rounded-[32px] md:p-8">
            <span className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-ruchi-blue md:text-[13px]">Today</span>
            <span className="font-display text-2xl font-extrabold leading-tight tracking-tight md:text-[32px]">
              {closedToday ? 'Closed' : hoursToday}
            </span>
            <span className="font-sans text-[13px] font-normal text-[#4A4360] md:text-[15px]">
              {specialToday?.note ? `${specialToday.note} · ` : ''}
              {info.hours.map((h) => `${h.days} ${h.time}`).join(' · ')}
            </span>
          </div>
          <div className="flex flex-col gap-1.5 rounded-[26px] bg-white p-[22px] md:gap-2.5 md:rounded-[32px] md:p-8">
            <span className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-ruchi-blue md:text-[13px]">Find us</span>
            <span className="font-display text-2xl font-extrabold leading-tight tracking-tight md:text-[32px]">{info.address}</span>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="font-sans text-sm font-bold text-ruchi-ink underline-offset-4 hover:underline md:text-[15px]">
              {info.postalCity.replace(/,?\s*Sweden$/i, '')} · Get directions →
            </a>
          </div>
          <div className="grain flex flex-col gap-1.5 rounded-[26px] bg-ruchi-pink p-[22px] md:gap-2.5 md:rounded-[32px] md:p-8">
            <span className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-ruchi-ink md:text-[13px]">Follow</span>
            <span className="font-display text-2xl font-extrabold leading-tight tracking-tight md:text-[32px]">{instagramHandle}</span>
            <a href={info.instagram} target="_blank" rel="noopener noreferrer" className="font-sans text-sm font-bold text-ruchi-ink underline-offset-4 hover:underline md:text-[15px]">
              Instagram →
            </a>
          </div>
        </section>

        {/* DELIVERY */}
        <section className="my-10 flex flex-col gap-3 md:my-[72px] md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-5">
          <h2 className="mx-1 font-display text-xl font-extrabold leading-tight tracking-tight md:mx-0 md:text-[28px]">Delivered to your door</h2>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {DELIVERY.map((d) => (
              <a
                key={d.name}
                href={d.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[54px] items-center rounded-full bg-white px-5 shadow-[0_6px_16px_rgba(27,20,51,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:h-16 md:px-7"
              >
                <img src={d.logo} alt={d.name} className={cn('w-auto', d.h)} />
              </a>
            ))}
          </div>
        </section>
      </div>

      <SiteFooter />
    </div>
  )
}

export default Home
