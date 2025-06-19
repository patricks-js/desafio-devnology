export interface ProductFiltersDTO {
  q?: string;
  categories?: string[];
  departments?: string[];
  materials?: string[];
  minPrice?: number;
  maxPrice?: number;
}
