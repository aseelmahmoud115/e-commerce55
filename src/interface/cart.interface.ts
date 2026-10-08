import { Brand, Category, Subcategory } from "./product.interface";

export interface CartProduct {
  _id: string;
  title: string;
  imageCover: string;
  quantity: number;
  category: Category;
  brand?: Brand;
  subcategory?: Subcategory[];
  ratingsAverage?: number;
  id: string;
}

export interface CartItem {
  _id?: string;
  count: number;
  price: number;
  product: CartProduct;
}

export interface CartData {
  _id: string;
  cartOwner: string;
  products: CartItem[];
  totalCartPrice: number;
  totalAfterDiscount?: number;
}

export interface CartResponse {
  status: string;
  message?: string;
  numOfCartItems: number;
  cartId: string;
  data: CartData;
}
