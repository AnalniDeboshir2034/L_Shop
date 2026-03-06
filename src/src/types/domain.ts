export type UserId = string;
export type ProductId = string;

export type ProductCategory = 'sneakers' | 'clothes';

export interface UserDto {
  id: UserId;
  name: string;
  email: string;
  login: string;
  phone: string;
}

export interface ProductDto {
  id: ProductId;
  title: string;
  description: string;
  category: ProductCategory;
  brand: string;
  price: number;
  available: boolean;
  imageUrl: string;
}

export interface BasketItemDto {
  productId: ProductId;
  quantity: number;
}

export interface BasketDto {
  userId: UserId;
  items: BasketItemDto[];
  products: ProductDto[];
}

export type PaymentMethod = 'card' | 'cash' | 'online';

export interface DeliveryInfoDto {
  address: string;
  phone: string;
  email: string;
  paymentMethod: PaymentMethod;
}

export interface RegisterRequestDto {
  name: string;
  email: string;
  login: string;
  phone: string;
  password: string;
}

export interface LoginRequestDto {
  loginOrEmail: string;
  password: string;
}

export type SortOrder = 'asc' | 'desc';

export interface ProductQueryDto {
  search?: string;
  category?: ProductCategory;
  brand?: string;
  available?: boolean;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price';
  sortOrder?: SortOrder;
}

