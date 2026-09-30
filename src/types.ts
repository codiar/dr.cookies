export interface SauceOption {
  id: string;
  name: string;
  color: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isBestSeller?: boolean;
  hasOptions?: boolean;
  availableSauces?: SauceOption[];
  badge?: string;
}

export interface CartItem {
  id: string; // unique item instance id
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedSauces?: string[];
  notes?: string;
}

export interface CustomerOrderInfo {
  name: string;
  phone: string;
  address: string;
  landmark: string;
  notes: string;
}

export interface BusinessInfo {
  name: string;
  nameEn: string;
  category: string;
  slogan: string;
  city: string;
  address: string;
  workingHours: string;
  openingHour: number;
  closingHour: number;
  instagramUrl: string;
  instagramHandle: string;
  freeDeliveryThreshold: number;
}
