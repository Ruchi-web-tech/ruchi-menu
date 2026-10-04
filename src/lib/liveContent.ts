import type { MenuItem } from '@/types/menu';

/**
 * Live menu + restaurant info, managed from the RUCHI Operations app
 * (Website page) and stored in its Firebase project. Firestore's security
 * rules allow anyone to READ these two collections, so the website loads
 * them with a plain HTTPS request - no Firebase SDK, no sign-in.
 *
 * If Firebase can't be reached (or nothing has been imported yet), the
 * site simply keeps the menu bundled in src/data/, so it never goes blank.
 */

const PROJECT_ID = 'ruchi-operations';
const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;
const TIMEOUT_MS = 5000;

/** Same order as the menu's category buttons. */
const CATEGORY_ORDER = ['salads', 'bao', 'sushi', 'sando', 'sides', 'drinks'];

export interface SiteInfo {
  address: string;
  postalCity: string;
  phone: string;
  hours: { days: string; time: string }[];
  instagram: string;
  /** One-off hours for a date (holidays), set in the operations app. */
  specialDays?: { date: string; time: string; note: string }[];
}

/** The daily banner, one per date (YYYY-MM-DD), set in the operations app. */
export interface DayBanner {
  date: string;
  style: 'card' | 'bar' | 'sticker';
  label: string;
  headline: string;
  line: string;
  price: string;
  dish: string;
  offer: boolean;
  active: boolean;
}

// ---- Firestore REST value decoding ------------------------------------

type FsValue = {
  stringValue?: string;
  integerValue?: string;
  doubleValue?: number;
  booleanValue?: boolean;
  nullValue?: null;
  arrayValue?: { values?: FsValue[] };
  mapValue?: { fields?: Record<string, FsValue> };
  timestampValue?: string;
};

function decode(v: FsValue): unknown {
  if (v.stringValue !== undefined) return v.stringValue;
  if (v.integerValue !== undefined) return Number(v.integerValue);
  if (v.doubleValue !== undefined) return v.doubleValue;
  if (v.booleanValue !== undefined) return v.booleanValue;
  if (v.timestampValue !== undefined) return v.timestampValue;
  if (v.arrayValue) return (v.arrayValue.values ?? []).map(decode);
  if (v.mapValue) return decodeFields(v.mapValue.fields ?? {});
  return null;
}

function decodeFields(fields: Record<string, FsValue>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(fields)) out[key] = decode(value);
  return out;
}

async function getJson(url: string): Promise<any | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

const asString = (v: unknown) => (typeof v === 'string' ? v : '');
const asStrings = (v: unknown) => (Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string' && x.length > 0) : []);

// ---- Public API ------------------------------------------------------

/** All dishes from Firebase, or null to keep the bundled menu. */
export async function fetchLiveMenu(): Promise<MenuItem[] | null> {
  const data = await getJson(`${BASE}/websiteMenu?pageSize=300`);
  const docs: { name: string; fields?: Record<string, FsValue> }[] = data?.documents ?? [];
  if (docs.length === 0) return null;

  const dishes = docs.map((d) => {
    const f = decodeFields(d.fields ?? {});
    const category = asString(f.category);
    return {
      item: {
        id: d.name.split('/').pop() as string,
        name: asString(f.name),
        description: asString(f.description),
        price: typeof f.price === 'number' ? f.price : 0,
        priceFrom: f.priceFrom === true,
        categories: [category],
        subcategories: asStrings(f.subcategories),
        tags: asStrings(f.tags),
        available: f.available !== false,
        image: asString(f.image) || undefined,
      } satisfies MenuItem,
      categoryIndex: CATEGORY_ORDER.indexOf(category),
      order: typeof f.order === 'number' ? f.order : 0,
    };
  });

  dishes.sort((a, b) => a.categoryIndex - b.categoryIndex || a.order - b.order);
  return dishes.filter((d) => d.item.name).map((d) => d.item);
}

/** Address, phone, hours and Instagram from Firebase, or null to keep the bundled info. */
export async function fetchLiveInfo(): Promise<SiteInfo | null> {
  const data = await getJson(`${BASE}/website/info`);
  if (!data?.fields) return null;
  const f = decodeFields(data.fields);
  const hours = Array.isArray(f.hours)
    ? (f.hours as Record<string, unknown>[]).map((h) => ({ days: asString(h.days), time: asString(h.time) }))
    : [];
  const specialDays = Array.isArray(f.specialDays)
    ? (f.specialDays as Record<string, unknown>[])
        .map((d) => ({ date: asString(d.date), time: asString(d.time), note: asString(d.note) }))
        .filter((d) => d.date && d.time)
    : [];
  return {
    address: asString(f.address),
    postalCity: asString(f.postalCity),
    phone: asString(f.phone),
    hours,
    instagram: asString(f.instagram),
    specialDays,
  };
}

/** Banners from this date on (a handful of days), or [] if none / offline. */
export async function fetchBanners(fromDate: string): Promise<DayBanner[]> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`${BASE}:runQuery`, {
      method: 'POST',
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        structuredQuery: {
          from: [{ collectionId: 'websiteBanners' }],
          where: { fieldFilter: { field: { fieldPath: 'date' }, op: 'GREATER_THAN_OR_EQUAL', value: { stringValue: fromDate } } },
          orderBy: [{ field: { fieldPath: 'date' }, direction: 'ASCENDING' }],
          limit: 10,
        },
      }),
    });
    if (!res.ok) return [];
    const rows: { document?: { fields?: Record<string, FsValue> } }[] = await res.json();
    return rows
      .filter((r) => r.document?.fields)
      .map((r) => {
        const f = decodeFields(r.document!.fields!);
        const style = asString(f.style);
        return {
          date: asString(f.date),
          style: style === 'bar' || style === 'sticker' ? style : 'card',
          label: asString(f.label),
          headline: asString(f.headline),
          line: asString(f.line),
          price: asString(f.price),
          dish: asString(f.dish),
          offer: f.offer === true,
          active: f.active !== false,
        } satisfies DayBanner;
      });
  } catch {
    return [];
  } finally {
    clearTimeout(timer);
  }
}
