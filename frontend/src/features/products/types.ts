export type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  imagesUrl: string[];
  price: number;
  material: string;
  department: string;
  hasDiscount: boolean;
  discountPercentage?: number;
};

export type ProductFilters = {
  categories: string[];
  departments: string[];
  materials: string[];
  minPrice?: number;
  maxPrice?: number;
};
