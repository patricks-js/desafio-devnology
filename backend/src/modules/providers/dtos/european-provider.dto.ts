export interface EuropeanProviderProductDTO {
  id: string;
  name: string;
  description: string;
  price: string;
  gallery: string[];
  details: {
    material: string;
    adjective: string;
  };
  hasDiscount: boolean;
  discountValue: string;
}
