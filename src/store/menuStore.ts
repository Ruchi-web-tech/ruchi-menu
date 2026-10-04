
import { create } from 'zustand';
import { MenuItem, MenuCategory, MenuSubcategory } from '@/types/menu';
import bowls from '@/data/menu/bowls.json';
import bao from '@/data/menu/bao.json';
import sushi from '@/data/menu/sushi.json';
import sando from '@/data/menu/sando.json';
import sides from '@/data/menu/sides.json';
import drinks from '@/data/menu/drinks.json';
import infoData from '@/data/info.json';
import { fetchBanners, fetchLiveInfo, fetchLiveMenu, type DayBanner, type SiteInfo } from '@/lib/liveContent';
import { swedishDateKey } from '@/lib/hours';

interface MenuState {
  categories: MenuCategory[];
  menuItems: MenuItem[];
  selectedCategory: string | null;
  selectedSubcategory: string | null;
  loading: boolean;
  error: string | null;
  setSelectedCategory: (category: string | null) => void;
  setSelectedSubcategory: (subcategory: string | null) => void;
  setMenuItems: (items: MenuItem[]) => void;
  setCategories: (categories: MenuCategory[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  info: SiteInfo;
  /** Daily banners from today on (operations app → Website → Daily banner). */
  banners: DayBanner[];
  /** True once the live menu + banners have been fetched (or failed). */
  liveLoaded: boolean;
  /** Loads the live menu + info from the operations app (Firebase). */
  loadLiveContent: () => Promise<void>;
}

// Sample subcategories
const saladSubcategories: MenuSubcategory[] = [
  { id: 'warm-options', name: 'Warm Options', categoryId: 'salads' },
  { id: 'pick-your-protein', name: 'Pick Your Protein', categoryId: 'salads' },
  { id: 'plant-based', name: 'Plant Based', categoryId: 'salads' },
  { id: 'meat', name: 'Meat', categoryId: 'salads' },
  { id: 'fish', name: 'Fish', categoryId: 'salads' },
];

const baoSubcategories: MenuSubcategory[] = [
  { id: 'regular', name: 'Regular', categoryId: 'bao' },
  { id: 'plant-based', name: 'Plant based', categoryId: 'bao' },
];

const sushiSubcategories: MenuSubcategory[] = [
  { id: 'maki', name: 'Maki', categoryId: 'sushi' },
  { id: 'nigiri', name: 'Nigiri', categoryId: 'sushi' },
  { id: 'mix', name: 'Mix', categoryId: 'sushi' },
];

// Sample data for development
const sampleCategories: MenuCategory[] = [
  {
    // id stays 'salads' so existing dishes keep their category
    id: 'salads',
    name: 'Bowls',
    description: 'Fresh & Healthy',
    order: 1,
    subcategories: saladSubcategories
  },
  {
    id: 'bao',
    name: 'Bao',
    description: 'Steamed Buns',
    order: 2,
    subcategories: baoSubcategories
  },
  {
    id: 'sushi',
    name: 'Sushi',
    description: 'Fresh Rolls',
    order: 3,
    subcategories: sushiSubcategories
  },
  {
    id: 'sando',
    name: 'Sando',
    description: 'Sandwiches',
    order: 4
  },
  {
    id: 'sides',
    name: 'Sides',
    description: 'Perfect Accompaniments',
    order: 5
  },
  {
    id: 'drinks',
    name: 'Drinks',
    description: 'Refreshing Beverages',
    order: 6
  },
];

// Menu items live in src/data/menu/<category>.json (edited through Pages CMS).
// The file a dish is in decides its category; ids come from category + position.
type MenuFileItem = Omit<MenuItem, 'id' | 'categories'>;

const menuFiles: [categoryId: string, items: MenuFileItem[]][] = [
  ['salads', bowls as MenuFileItem[]], // shown as "Bowls"
  ['bao', bao as MenuFileItem[]],
  ['sushi', sushi as MenuFileItem[]],
  ['sando', sando as MenuFileItem[]],
  ['sides', sides as MenuFileItem[]],
  ['drinks', drinks as MenuFileItem[]],
];

const sampleMenuItems: MenuItem[] = menuFiles.flatMap(([categoryId, items]) =>
  items.map((item, index) => ({
    ...item,
    id: `${categoryId}-${index + 1}`,
    categories: [categoryId],
    subcategories: item.subcategories ?? [],
    tags: item.tags ?? [],
    available: item.available ?? true,
  }))
);

export const useMenuStore = create<MenuState>((set) => ({
  info: infoData as SiteInfo,
  banners: [],
  liveLoaded: false,
  loadLiveContent: async () => {
    const [menu, info, banners] = await Promise.all([fetchLiveMenu(), fetchLiveInfo(), fetchBanners(swedishDateKey())]);
    if (menu) set({ menuItems: menu });
    if (info) set({ info });
    set({ banners, liveLoaded: true });
  },
  categories: sampleCategories,
  menuItems: sampleMenuItems,
  selectedCategory: null,
  selectedSubcategory: null,
  loading: false,
  error: null,
  setSelectedCategory: (category) => set({ selectedCategory: category, selectedSubcategory: null }),
  setSelectedSubcategory: (subcategory) => set({ selectedSubcategory: subcategory }),
  setMenuItems: (items) => set({ menuItems: items }),
  setCategories: (categories) => set({ categories }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
