import type { Product } from "../products/types";

export type CartItem = Product & {
  quantity: number;
};
