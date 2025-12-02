export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  quantity: number;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isOnSale?: boolean;
  category: string;
}
