import { useEffect } from 'react';
import type { MenuItem } from '@/types/menu';
import type { SiteInfo } from '@/lib/liveContent';
import { coversDay, swedishDateKey, addDays } from '@/lib/hours';

/**
 * Search-engine helpers: each page's title/description, plus the
 * structured data Google reads (restaurant details and the menu).
 * The first version of all of this is also baked into the HTML at build
 * time (index.html + scripts/seo-pages.mjs), so crawlers that don't run
 * JavaScript still get the right title and details.
 */

const SITE = 'https://ruchi.se';

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

/** Title, description, canonical address and share preview for a page. */
export function usePageMeta({
  title,
  description,
  path,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}) {
  useEffect(() => {
    document.title = title;
    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', SITE + path);
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = SITE + path;
    const robots = document.head.querySelector('meta[name="robots"]');
    if (noindex) setMeta('meta[name="robots"]', 'name', 'robots', 'noindex');
    else robots?.remove();
  }, [title, description, path, noindex]);
}

function setJsonLd(id: string, data: unknown) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function removeJsonLd(id: string) {
  document.getElementById(id)?.remove();
}

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/** "11:00–20:00" → ["11:00", "20:00"], or null for "Closed". */
function parseTime(time: string): [string, string] | null {
  const m = time.match(/(\d{1,2})[:.](\d{2})\s*[–—-]\s*(\d{1,2})[:.](\d{2})/);
  if (!m) return null;
  const pad = (h: string) => h.padStart(2, '0');
  return [`${pad(m[1])}:${m[2]}`, `${pad(m[3])}:${m[4]}`];
}

/** The live restaurant details as schema.org data for Google. */
export function restaurantJsonLd(info: SiteInfo) {
  // Weekly hours, grouped by identical times
  const groups = new Map<string, string[]>();
  for (let day = 0; day < 7; day++) {
    const line = info.hours.find((h) => coversDay(h.days, day));
    const times = line ? parseTime(line.time) : null;
    if (!times) continue;
    const k = times.join('|');
    groups.set(k, [...(groups.get(k) ?? []), DAY_NAMES[day]]);
  }
  const openingHoursSpecification = [...groups].map(([k, days]) => {
    const [opens, closes] = k.split('|');
    return { '@type': 'OpeningHoursSpecification', dayOfWeek: days.length === 1 ? days[0] : days, opens, closes };
  });

  // Holidays in the next two months
  const today = swedishDateKey();
  const until = addDays(today, 62);
  const specialOpeningHoursSpecification = (info.specialDays ?? [])
    .filter((d) => d.date >= today && d.date <= until)
    .map((d) => {
      const times = parseTime(d.time);
      return {
        '@type': 'OpeningHoursSpecification',
        validFrom: d.date,
        validThrough: d.date,
        // Closed all day is written as 00:00–00:00
        opens: times ? times[0] : '00:00',
        closes: times ? times[1] : '00:00',
      };
    });

  const [postalCode, ...cityParts] = info.postalCity.replace(/,?\s*Sweden$/i, '').split(' ');
  const postal = /\d/.test(cityParts[0] ?? '') ? `${postalCode} ${cityParts.shift()}` : postalCode;

  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${SITE}/#restaurant`,
    name: 'RUCHI',
    alternateName: 'RUCHI Borås',
    description: 'Asian-inspired bowls, bao, sushi and sando in Borås. Born in the north, inspired by Asia.',
    url: `${SITE}/`,
    image: `${SITE}/og-image.jpg`,
    logo: `${SITE}/logo-square-cream.png`,
    telephone: '+46' + info.phone.replace(/[^0-9]/g, '').replace(/^0/, ''),
    priceRange: '$$',
    servesCuisine: ['Asian fusion', 'Sushi', 'Japanese', 'Korean', 'Bao', 'Poke bowls'],
    keywords: 'sushi Borås, bao Borås, lunch Borås, asiatisk restaurang Borås, asiatisk mat Borås, bowls Borås',
    address: {
      '@type': 'PostalAddress',
      streetAddress: info.address,
      postalCode: postal,
      addressLocality: cityParts.join(' ') || 'Borås',
      addressCountry: 'SE',
    },
    openingHoursSpecification,
    ...(specialOpeningHoursSpecification.length ? { specialOpeningHoursSpecification } : {}),
    hasMenu: `${SITE}/menu`,
    sameAs: [info.instagram].filter(Boolean),
    potentialAction: { '@type': 'OrderAction', target: 'https://qopla.com/restaurant/ruchi/qEQLXMQwAr/order' },
  };
}

export function useRestaurantJsonLd(info: SiteInfo) {
  useEffect(() => setJsonLd('ld-restaurant', restaurantJsonLd(info)), [info]);
}

const SECTION_NAMES: Record<string, string> = {
  salads: 'Bowls',
  bao: 'Bao',
  sushi: 'Sushi',
  sando: 'Sando',
  sides: 'Sides',
  drinks: 'Drinks',
};

/** The live menu as schema.org data (on the Menu page). */
export function useMenuJsonLd(items: MenuItem[]) {
  useEffect(() => {
    const sections = Object.entries(SECTION_NAMES)
      .map(([id, name]) => ({
        '@type': 'MenuSection',
        name,
        hasMenuItem: items
          .filter((i) => i.available && i.categories.includes(id))
          .map((i) => ({
            '@type': 'MenuItem',
            name: i.name,
            ...(i.description ? { description: i.description } : {}),
            ...(i.image && i.image.startsWith('http') ? { image: i.image } : i.image ? { image: SITE + i.image } : {}),
            offers: { '@type': 'Offer', price: String(i.price), priceCurrency: 'SEK' },
            ...(i.tags?.includes('VGN')
              ? { suitableForDiet: 'https://schema.org/VeganDiet' }
              : i.tags?.includes('VEG')
                ? { suitableForDiet: 'https://schema.org/VegetarianDiet' }
                : {}),
          })),
      }))
      .filter((s) => s.hasMenuItem.length > 0);
    setJsonLd('ld-menu', {
      '@context': 'https://schema.org',
      '@type': 'Menu',
      name: 'RUCHI menu',
      url: `${SITE}/menu`,
      inLanguage: 'en',
      hasMenuSection: sections,
    });
    return () => removeJsonLd('ld-menu');
  }, [items]);
}
