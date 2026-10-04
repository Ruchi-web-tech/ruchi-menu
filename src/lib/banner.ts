import type { MenuItem } from '@/types/menu';
import type { DayBanner, SiteInfo } from '@/lib/liveContent';
import { addDays, hoursOn, isClosedTime, nextOpenDay, weekdayName } from '@/lib/hours';
import { formatPrice } from '@/lib/utils';

/** What the website shows today: a planned banner, an automatic pick, or "closed". */
export interface ShownBanner {
  style: DayBanner['style'];
  label: string;
  headline: string;
  line: string;
  price: string;
  /** The menu dish behind it, for the photo and colour. */
  dish?: MenuItem;
  closed?: boolean;
}

const AUTO_LABELS = ["Today's pick", 'Lunch idea', 'Try this today', 'Most loved', 'Fresh today'];

function hash(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** First sentence of a description, so the banner stays short. */
function shortLine(text: string): string {
  const dot = text.indexOf('. ');
  const first = dot > 0 ? text.slice(0, dot + 1) : text;
  return first.length > 110 ? `${first.slice(0, 107).trimEnd()}…` : first;
}

/**
 * A dish chosen from the live menu for a date with no planned banner.
 * Same result all day for everyone, different every day, and never the
 * same category as the day before - so there is no pattern to spot.
 * Days are worked out in order from three weeks back, so "the day before"
 * is always the dish that was really picked then.
 */
function autoPick(date: string, menu: MenuItem[]): MenuItem | undefined {
  const pool = menu.filter((m) => m.available && !m.categories.includes('drinks'));
  const withPhoto = pool.filter((m) => m.image);
  const candidates = withPhoto.length >= 6 ? withPhoto : pool;
  if (candidates.length === 0) return undefined;
  let previous: MenuItem | undefined;
  for (let i = 21; i >= 0; i--) {
    const day = addDays(date, -i);
    const allowed = previous ? candidates.filter((m) => m.categories[0] !== previous!.categories[0]) : candidates;
    const list = allowed.length ? allowed : candidates;
    previous = list[hash(day) % list.length];
  }
  return previous;
}

export function chooseBanner(today: string, banners: DayBanner[], menu: MenuItem[], info: SiteInfo): ShownBanner | null {
  const findDish = (name: string) => (name ? menu.find((m) => m.name === name) : undefined);
  const usable = (b: DayBanner | undefined) => {
    if (!b || !b.active || !b.headline.trim() || (b.offer && !b.price.trim())) return false;
    const dish = findDish(b.dish);
    return !(dish && !dish.available); // sold out → skip
  };

  if (isClosedTime(hoursOn(info, today))) {
    const next = nextOpenDay(info, today);
    if (!next) return null;
    const when = next.date === addDays(today, 1) ? 'tomorrow' : weekdayName(next.date);
    const nextBanner = banners.find((b) => b.date === next.date);
    return {
      style: 'bar',
      closed: true,
      label: 'Closed today',
      headline: `Back ${when} at ${next.opens}`,
      line: usable(nextBanner) ? `with ${nextBanner!.headline}` : '',
      price: '',
    };
  }

  const planned = banners.find((b) => b.date === today);
  if (usable(planned)) {
    return { ...planned!, dish: findDish(planned!.dish) };
  }

  const dish = autoPick(today, menu);
  if (!dish) return null;
  return {
    style: 'card',
    label: AUTO_LABELS[hash(`${today}-label`) % AUTO_LABELS.length],
    headline: dish.name,
    line: shortLine(dish.description),
    price: formatPrice(dish),
    dish,
  };
}
