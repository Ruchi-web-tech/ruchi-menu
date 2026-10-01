
import { create } from 'zustand';
import { MenuItem, MenuCategory, MenuSubcategory } from '@/types/menu';
import menuData from '@/data/menu.json';

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
    id: 'salads', 
    name: 'Salads', 
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
    id: 'sides', 
    name: 'Sides', 
    description: 'Perfect Accompaniments', 
    order: 4 
  },
  { 
    id: 'drinks', 
    name: 'Drinks', 
    description: 'Refreshing Beverages', 
    order: 5 
  },
];

// Menu items live in src/data/menu.json (edited through Pages CMS).
// Each item gets a stable id from its position in the file.
const sampleMenuItems: MenuItem[] = (menuData as Omit<MenuItem, 'id'>[]).map(
  (item, index) => ({ ...item, id: String(index + 1) })
);

export const useMenuStore = create<MenuState>((set) => ({
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
