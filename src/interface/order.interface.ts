import { CartProduct } from "./cart.interface";

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
  postalCode?: string;
}

export interface OrderItem {
  _id: string;
  count: number;
  price: number;
  product: CartProduct;
}

export interface IOrder {
  _id: string;
  id: number;
  shippingAddress?: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: "cash" | "card";
  isPaid: boolean;
  isDelivered: boolean;
  paidAt?: string;
  user: { _id: string; name: string; email: string; phone: string };
  cartItems: OrderItem[];
  createdAt: string;
  updatedAt: string;
}
