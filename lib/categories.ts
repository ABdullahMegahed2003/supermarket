import {
  Beef,
  Milk,
  Croissant,
  Wine,
  Package,
  SprayCan,
  HeartPulse,
  Snowflake,
  type LucideIcon,
} from "lucide-react";

export type CategoryItem = {
  id: number;
  name: string;
  image?: string;
};

const STORAGE_KEY = "store-categories";

export const defaultCategories: CategoryItem[] = [
  { id: 1, name: "اللحوم والدواجن", image: "https://images.unsplash.com/photo-1544025162-d76694265947" },
  { id: 2, name: "الألبان والأجبان", image: "https://images.unsplash.com/photo-1563636619-e9143da7973b" },
  { id: 3, name: "المخبوزات", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff" },
  { id: 4, name: "المشروبات", image: "https://images.unsplash.com/photo-1564419320408-38e24e038739" },
  { id: 5, name: "المواد الغذائية", image: "https://images.unsplash.com/photo-1542838132-92c53300491e" },
  { id: 6, name: "المنظفات", image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952" },
  { id: 7, name: "العناية الشخصية", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03" },
  { id: 8, name: "المجمدات", image: "https://images.unsplash.com/photo-1574484284002-952d924569dd" },
];

const iconMap: Record<string, LucideIcon> = {
  "اللحوم والدواجن": Beef,
  "الألبان والأجبان": Milk,
  "المخبوزات": Croissant,
  "المشروبات": Wine,
  "المواد الغذائية": Package,
  "المنظفات": SprayCan,
  "العناية الشخصية": HeartPulse,
  "المجمدات": Snowflake,
};

export const getCategoryIcon = (name: string): LucideIcon => {
  return iconMap[name] ?? Package;
};

export const getStoredCategories = (): CategoryItem[] => {
  if (typeof window === "undefined") {
    return defaultCategories;
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultCategories;

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return defaultCategories;

    return parsed.filter(
      (item): item is CategoryItem =>
        typeof item === "object" &&
        item !== null &&
        typeof item.name === "string" &&
        typeof item.id === "number"
    );
  } catch {
    return defaultCategories;
  }
};

export const saveCategories = (categories: CategoryItem[]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
};
