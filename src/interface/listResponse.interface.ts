export interface ListingRespose<type> {
  metadata: MetaData;
  data: type[];
  results: number;
}

export interface MetaData {
  currentPage: number;
  limit: number;
  numberOfPages: number;
  nextPage?: number;
  prevPage?: number;
}
