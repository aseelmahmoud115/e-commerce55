import { IProducts } from "./product.interface";

export interface WishlistResponse {
  status: string;
  count: number;
  data: IProducts[];
}

export interface WishlistMutationResponse {
  status: string;
  message: string;
  data: string[];
}
