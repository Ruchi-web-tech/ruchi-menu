import type { SiteInfo } from '@/lib/liveContent';

const DAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

function dayIndex(word: string): number {
  return DAYS.indexOf(word.trim().slice(0, 3).toLowerCase());
}

/** Does a label like "Mon–Thu", "Fri", "Sat-Sun" or "Mon, Wed" cover this weekday (0 = Sunday)? */
function coversDay(label: string, day: number): boolean {
  return label.split(/[,&]/).some((part) => {
    const [from, to] = part.split(/[–—-]/).map(dayIndex);
    if (from < 0) return false;
    if (to === undefined || to < 0) return from === day;
    // ranges are Mon-first, so treat Sunday as the end of the week
    const pos = (d: number) => (d + 6) % 7;
    return pos(day) >= pos(from) && pos(day) <= pos(to);
  });
}

/** Today's opening hours as written in the operations app, e.g. "11:00–20:00" or "Closed". */
export function todaysHours(info: SiteInfo, now = new Date()): string | null {
  const day = now.getDay();
  const line = info.hours.find((h) => coversDay(h.days, day));
  return line ? line.time : null;
}
