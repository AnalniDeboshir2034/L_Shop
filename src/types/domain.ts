export type UserId = string;
export type ProductId = string;

export type ProductCategory = 'sneakers' | 'clothes';

export interface User {
  id: UserId;
  name: string;
  email: string;
  login: string;
  phone: string;
  passwordHash: string;
  sessionToken?: string;
  createdAt: string;
}

export interface Product {
  id: ProductId;
  title: string;
  description: string;
  category: ProductCategory;
  brand: string;
  price: number;
  available: boolean;
  imageUrl: string;
}

export interface BasketItem {
  productId: ProductId;
  quantity: number;
}

export interface Basket {
  userId: UserId;
  items: BasketItem[];
}

export type PaymentMethod = 'card' | 'cash' | 'online';

export interface DeliveryInfo {
  address: string;
  phone: string;
  email: string;
  paymentMethod: PaymentMethod;
}

export interface RegisterRequest {
  name: string;
  email: string;
  login: string;
  phone: string;
  password: string;
}

export interface LoginRequest {
  loginOrEmail: string;
  password: string;
}

export type SortOrder = 'asc' | 'desc';

export interface ProductQuery {
  search?: string;
  category?: ProductCategory;
  brand?: string;
  available?: boolean;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price';
  sortOrder?: SortOrder;
}

