import { ListingRespose } from "./listResponse.interface";
import { Category, SubCategory } from "./category.interface";
import { IProducts } from "./product.interface";
import { IBrand } from "./brand.interface";

export type CategoryResponse = ListingRespose<Category>;
export type SubCategoryResponse = ListingRespose<SubCategory>;
export type ProductResponse = ListingRespose<IProducts>;
export type BrandResponse = ListingRespose<IBrand>;

export interface ApiError {
  status?: string;
  statusMsg?: string;
  message: string;
}
