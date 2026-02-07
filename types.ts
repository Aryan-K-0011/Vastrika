export interface Product {
  id: string;
  name: string;
  price: number;
  salePrice?: number; // Added for discounts
  category: string;
  image: string;
  description: string;
  features: string[];
  stock?: number;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: CartItem[];
  shippingAddress: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  isActive: boolean;
}

export type PageView = 'HOME' | 'SHOP' | 'PRODUCT' | 'CART' | 'ABOUT' | 'CONTACT';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}