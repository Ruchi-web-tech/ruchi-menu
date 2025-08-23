export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  priceLabel?: string;   // 👈 New optional field
  image?: string;
  categories: string[];   // (already updated for multi-category)
  subcategories?: string[];
  tags?: string[];
  available: boolean;
  created_at?: string;
}



export interface MenuSubcategory {
  id: string;
  name: string;
  categoryId: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  order: number;
  subcategories?: MenuSubcategory[];
}
