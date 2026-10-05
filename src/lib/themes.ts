/**
 * Seasonal looks for the homepage hero. They switch on by date every year,
 * with no work needed. The operations app (Website → Seasonal themes) can
 * turn one off, move a fixed-date theme or give one its own hero photos;
 * those settings live in Firestore `website/themes`.
 *
 * KEEP IN SYNC with the operations app: src/services/website.ts (theme ids,
 * names and fixed default dates).
 */

export type ThemeId =
  | 'lunarnewyear'
  | 'valentine'
  | 'easter'
  | 'nationalday'
  | 'midsummer'
  | 'midautumn'
  | 'kanelbulle'
  | 'halloween'
  | 'lucia'
  | 'christmas'
  | 'newyear';

export interface ThemeSetting {
  id: ThemeId;
  enabled: boolean;
  /** "MM-DD", inclusive. Only used by fixed-date themes. A range may wrap the new year. */
  start: string;
  end: string;
  heroDesktop?: string;
  heroMobile?: string;
}

export const THEME_TAG: Record<ThemeId, string> = {
  lunarnewyear: 'Happy Lunar New Year',
  valentine: "Happy Valentine's",
  easter: 'Happy Easter',
  nationalday: 'Happy National Day',
  midsummer: 'Happy Midsummer',
  midautumn: 'Happy Moon Festival',
  kanelbulle: 'Happy Cinnamon Bun Day',
  halloween: 'Happy Halloween',
  lucia: 'Happy Lucia',
  christmas: 'Merry Christmas',
  newyear: 'Happy New Year',
};

/** Fixed-date themes and their default dates. */
const FIXED: Partial<Record<ThemeId, [string, string]>> = {
  valentine: ['02-10', '02-14'],
  nationalday: ['06-05', '06-06'],
  kanelbulle: ['10-03', '10-04'],
  halloween: ['10-24', '10-31'],
  lucia: ['12-12', '12-13'],
  christmas: ['12-01', '12-26'],
  newyear: ['12-27', '01-01'],
};

/** Themes whose dates move every year (worked out below). */
export const MOVING: ThemeId[] = ['lunarnewyear', 'easter', 'midsummer', 'midautumn'];

export const DEFAULT_THEMES: ThemeSetting[] = (Object.keys(THEME_TAG) as ThemeId[]).map((id) => ({
  id,
  enabled: true,
  start: FIXED[id]?.[0] ?? '',
  end: FIXED[id]?.[1] ?? '',
}));

// ---- dates -----------------------------------------------------------

const key = (y: number, m: number, d: number) => new Date(Date.UTC(y, m - 1, d, 12)).toISOString().slice(0, 10);
const shift = (k: string, days: number) => {
  const [y, m, d] = k.split('-').map(Number);
  return key(y, m, d + days);
};

/** Easter Sunday (Gregorian calendar). */
function easterSunday(y: number): string {
  const a = y % 19;
  const b = Math.floor(y / 100);
  const c = y % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return key(y, month, day);
}

/** Midsummer Eve: the Friday between 19 and 25 June. */
function midsummerEve(y: number): string {
  for (let d = 19; d <= 25; d++) if (new Date(Date.UTC(y, 5, d, 12)).getUTCDay() === 5) return key(y, 6, d);
  return key(y, 6, 19);
}

/** Lunar calendar dates (first day of Lunar New Year, Mid-Autumn Festival). */
const LUNAR_NEW_YEAR: Record<number, string> = {
  2027: '2027-02-06', 2028: '2028-01-26', 2029: '2029-02-13', 2030: '2030-02-03', 2031: '2031-01-23',
  2032: '2032-02-11', 2033: '2033-01-31', 2034: '2034-02-19', 2035: '2035-02-08',
};
const MID_AUTUMN: Record<number, string> = {
  2027: '2027-09-15', 2028: '2028-10-03', 2029: '2029-09-22', 2030: '2030-09-12', 2031: '2031-10-01',
  2032: '2032-09-19', 2033: '2033-09-08', 2034: '2034-09-27', 2035: '2035-09-16',
};

/** [first day, last day] of a theme in a given year, or null. */
export function themeRange(t: ThemeSetting, year: number): [string, string] | null {
  switch (t.id) {
    case 'easter': {
      const sunday = easterSunday(year);
      return [shift(sunday, -6), shift(sunday, 1)]; // Mon of Holy Week → Easter Monday
    }
    case 'midsummer': {
      const eve = midsummerEve(year);
      return [shift(eve, -2), shift(eve, 1)]; // Wed → Midsummer Day
    }
    case 'lunarnewyear': {
      const day = LUNAR_NEW_YEAR[year];
      return day ? [shift(day, -1), shift(day, 6)] : null;
    }
    case 'midautumn': {
      const day = MID_AUTUMN[year];
      return day ? [shift(day, -2), shift(day, 1)] : null;
    }
    default: {
      if (!/^\d\d-\d\d$/.test(t.start) || !/^\d\d-\d\d$/.test(t.end)) return null;
      const start = `${year}-${t.start}`;
      const end = t.end >= t.start ? `${year}-${t.end}` : `${year + 1}-${t.end}`;
      return [start, end];
    }
  }
}

/** Defaults, with whatever the operations app has changed on top. */
export function mergeThemes(saved: Partial<ThemeSetting>[] | null): ThemeSetting[] {
  return DEFAULT_THEMES.map((d) => {
    const s = saved?.find((x) => x.id === d.id);
    if (!s) return d;
    const merged = { ...d, ...s, id: d.id };
    // Moving themes always use their calculated dates
    if (MOVING.includes(d.id)) return { ...merged, start: '', end: '' };
    return merged;
  });
}

/**
 * The theme for a date (YYYY-MM-DD, Swedish), or null on ordinary days.
 * When two overlap (Lucia inside Christmas), the shorter one wins.
 */
export function activeTheme(dateKey: string, themes: ThemeSetting[]): ThemeSetting | null {
  const year = Number(dateKey.slice(0, 4));
  let best: { theme: ThemeSetting; length: number } | null = null;
  for (const t of themes) {
    if (!t.enabled) continue;
    for (const y of [year - 1, year]) {
      const range = themeRange(t, y);
      if (!range || dateKey < range[0] || dateKey > range[1]) continue;
      const length = (Date.parse(range[1]) - Date.parse(range[0])) / 86400000;
      if (!best || length < best.length) best = { theme: t, length };
    }
  }
  return best?.theme ?? null;
}

/**
 * Preview any theme on any day: ruchi.se/?theme=halloween (or any other id).
 * Only changes what that visitor sees, nothing is saved.
 */
export function previewTheme(themes: ThemeSetting[], search: string): ThemeSetting | null {
  const id = new URLSearchParams(search).get('theme');
  return themes.find((t) => t.id === id) ?? null;
}
