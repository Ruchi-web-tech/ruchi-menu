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

/** Today's date in Sweden as YYYY-MM-DD, whatever the visitor's timezone. */
export function swedishDateKey(now = new Date()): string {
  return new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Europe/Stockholm',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
}

export function addDays(key: string, days: number): string {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d + days, 12)).toISOString().slice(0, 10);
}

/** 0 = Sunday … 6 = Saturday for a YYYY-MM-DD date. */
export function weekdayOf(key: string): number {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d, 12)).getUTCDay();
}

export function weekdayName(key: string): string {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d, 12)).toLocaleDateString('en-GB', { weekday: 'long', timeZone: 'UTC' });
}

/** A holiday / one-off day from the operations app, if this date has one. */
export function specialDay(info: SiteInfo, key: string) {
  return info.specialDays?.find((d) => d.date === key) ?? null;
}

/** Opening hours for a date, e.g. "11:00–20:00" or "Closed". Special days win. */
export function hoursOn(info: SiteInfo, key: string): string | null {
  const special = specialDay(info, key);
  if (special) return special.time;
  const line = info.hours.find((h) => coversDay(h.days, weekdayOf(key)));
  return line ? line.time : null;
}

export function isClosedTime(time: string | null): boolean {
  return !time || /closed|stängt/i.test(time);
}

/** Today's opening hours (Swedish date), e.g. "11:00–20:00" or "Closed". */
export function todaysHours(info: SiteInfo, now = new Date()): string | null {
  return hoursOn(info, swedishDateKey(now));
}

/** The next day the restaurant is open after `key`, with its opening time. */
export function nextOpenDay(info: SiteInfo, key: string): { date: string; opens: string } | null {
  for (let i = 1; i <= 14; i++) {
    const date = addDays(key, i);
    const time = hoursOn(info, date);
    if (!isClosedTime(time)) return { date, opens: (time as string).split(/[–—-]/)[0].trim() };
  }
  return null;
}
