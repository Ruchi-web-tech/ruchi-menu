import SiteFooter from '@/components/SiteFooter';
import { useMenuStore } from '@/store/menuStore';
import { usePageMeta } from '@/lib/seo';

const VALUES = [
  { text: 'Fresh ingredients, sourced daily', style: 'grain bg-ruchi-yellow' },
  { text: 'Made to order', style: 'grain bg-ruchi-pink' },
  { text: 'Vegan and gluten-free options', style: 'grain bg-ruchi-purple' },
  { text: 'Sustainable packaging', style: 'bg-white shadow-[inset_0_0_0_2px_#1B1433]' },
];

const label = 'font-sans text-xs font-bold uppercase tracking-[0.14em] text-ruchi-blue md:text-[13px]';

const About = () => {
  usePageMeta({
    title: 'About RUCHI | Asian-inspired Restaurant in Borås',
    description: 'Born in the north, inspired by Asia. Find RUCHI at Druveforsvägen 13A, Borås: opening hours, phone and directions. Öppettider, adress och telefon.',
    path: '/about',
  });
  // Live from the operations app, with the bundled info as fallback
  const info = useMenuStore((s) => s.info);
  // Swedish number (e.g. 076-098 95 38) -> tel:+46760989538
  const phoneHref = 'tel:' + info.phone.replace(/[^0-9+]/g, '').replace(/^0/, '+46');
  const place = `RUCHI ${info.address} ${info.postalCity}`;
  const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(place)}&output=embed`;
  const instagramHandle = '@' + (info.instagram.replace(/\/+$/, '').split('/').pop() || 'ruchi_room');

  return (
    <div className="min-h-screen bg-ruchi-cream text-ruchi-ink">
      <div className="mx-auto flex max-w-7xl flex-col gap-9 px-3 sm:px-6 md:gap-[72px] md:px-8">
        {/* Hero */}
        <section className="grain grid items-end gap-4 rounded-[32px] bg-ruchi-turquoise px-[22px] py-7 md:grid-cols-2 md:gap-8 md:rounded-[40px] md:p-14">
          <div className="flex flex-col gap-3.5 md:gap-[18px]">
            <span className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-ruchi-ink md:text-[13px]">About RUCHI</span>
            <h1 className="font-display text-[60px] font-black uppercase leading-[0.88] tracking-[-0.045em] md:text-[clamp(72px,9vw,132px)]">
              Our
              <br />
              Story
            </h1>
          </div>
          <p className="font-sans text-[15px] font-semibold leading-snug text-ruchi-ink md:pb-2 md:font-display md:text-[26px] md:leading-tight">
            Born in the north ✦ inspired by Asia
          </p>
        </section>

        {/* Story */}
        <section className="grid gap-4 px-1 md:grid-cols-2 md:gap-12 md:px-0">
          <p className="font-display text-[28px] font-black uppercase leading-[1.05] tracking-[-0.03em] text-ruchi-ink md:text-5xl md:leading-[1.02]">
            It’s not your grandma’s cooking.
          </p>
          <div className="flex flex-col gap-4">
            <p className="font-sans text-base font-normal leading-relaxed text-[#3A3352] md:text-lg">
              At RUCHI, we mix the bold vibes of Asian flavours with the cozy goodness of Northern cuisine — in a fresh,
              modern way. Rich sauces, top-notch proteins and fun twists, like sushi with a fusion kick or bao buns with a
              little extra flair.
            </p>
            <p className="font-sans text-base font-normal leading-relaxed text-[#3A3352] md:text-lg">
              It all started with a spark of curiosity and a lot of experimenting in the kitchen, and we’ve kept the fire
              going thanks to our amazing guests. Come join us for simple, satisfying bites that bring a smile every time.
            </p>
          </div>
        </section>

        {/* What we stand for */}
        <section className="flex flex-col gap-3 md:gap-6">
          <h2 className="mx-1 font-display text-2xl font-black uppercase leading-none tracking-[-0.03em] md:mx-0 md:text-[40px]">
            What we stand for
          </h2>
          <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-4">
            {VALUES.map((v) => (
              <div key={v.text} className={`flex min-h-[140px] items-end rounded-3xl p-[18px] md:min-h-[200px] md:rounded-[32px] md:p-7 ${v.style}`}>
                <span className="font-display text-[15px] font-extrabold leading-tight tracking-tight text-ruchi-ink md:text-2xl">{v.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Visit us */}
        <section className="grid gap-2.5 md:grid-cols-2 md:gap-4">
          <div className="flex flex-col gap-5 rounded-[26px] bg-white p-6 md:gap-7 md:rounded-[32px] md:p-10">
            <h2 className="font-display text-[28px] font-black uppercase leading-none tracking-[-0.03em] md:text-[40px]">Visit us</h2>
            <div className="flex flex-col gap-1">
              <span className={label}>Address</span>
              <span className="font-sans text-base font-semibold md:text-xl">
                {info.address}, {info.postalCity.replace(/,?\s*Sweden$/i, '')}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className={label}>Opening hours</span>
              <dl className="grid grid-cols-[96px_1fr] gap-y-1.5 font-sans text-[15px] md:grid-cols-[120px_1fr] md:gap-y-2 md:text-lg">
                {info.hours.map((h) => (
                  <div key={h.days} className="contents">
                    <dt className="font-semibold">{h.days}</dt>
                    <dd className="m-0">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="flex flex-col gap-1">
              <span className={label}>Phone</span>
              <a href={phoneHref} className="hidden font-sans text-xl font-semibold text-ruchi-ink hover:text-ruchi-blue md:inline">
                {info.phone}
              </a>
              <a
                href={phoneHref}
                className="mt-1 inline-flex h-[52px] items-center justify-center rounded-full bg-ruchi-ink font-sans text-[15px] font-bold text-ruchi-cream md:hidden"
              >
                Call {info.phone}
              </a>
            </div>
          </div>
          <div className="min-h-[260px] overflow-hidden rounded-[26px] bg-[#E9E3F5] md:min-h-[420px] md:rounded-[32px]">
            <iframe
              title={`Map of ${info.address}`}
              src={mapEmbed}
              className="h-full min-h-[260px] w-full border-0 md:min-h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        {/* Instagram */}
        <section className="grain flex flex-col gap-3.5 rounded-[32px] bg-ruchi-pink px-[22px] py-[26px] md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-6 md:rounded-[40px] md:p-12">
          <div className="flex flex-col gap-2">
            <span className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-ruchi-ink md:text-[13px]">Follow along</span>
            <span className="font-display text-[34px] font-black leading-[0.95] tracking-[-0.04em] text-ruchi-ink md:text-[56px]">
              {instagramHandle}
            </span>
          </div>
          <a
            href={info.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-[52px] items-center justify-center rounded-full bg-ruchi-ink px-7 font-sans text-[15px] font-bold text-ruchi-cream transition hover:scale-105 md:h-14 md:text-base"
          >
            Open Instagram
          </a>
        </section>

        <div />
      </div>

      <SiteFooter />
    </div>
  );
};

export default About;
