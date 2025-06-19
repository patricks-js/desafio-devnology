import { useMemo } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/features/products/types";
import type { CartItem } from "../types";

type CartStoreState = {
  cart: CartItem[];
  isCartOpen: boolean;
  actions: {
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, newQuantity: number) => void;
    clearCart: () => void;
    openCart: () => void;
    closeCart: () => void;
  };
};

const useCartStore = create<CartStoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      isCartOpen: false,
      actions: {
        openCart: () => set({ isCartOpen: true }),
        closeCart: () => set({ isCartOpen: false }),
        addToCart: (product) => {
          const { cart } = get();
          const existingItem = cart.find((item) => item.id === product.id);

          if (existingItem) {
            const updatedCart = cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            );
            set({ cart: updatedCart });
          } else {
            set({ cart: [...cart, { ...product, quantity: 1 }] });
          }
        },
        removeFromCart: (productId) => {
          set((state) => ({
            cart: state.cart.filter((item) => item.id !== productId),
          }));
        },
        updateQuantity: (productId, newQuantity) => {
          if (newQuantity <= 0) {
            get().actions.removeFromCart(productId);
          } else {
            set((state) => ({
              cart: state.cart.map((item) =>
                item.id === productId
                  ? { ...item, quantity: newQuantity }
                  : item,
              ),
            }));
          }
        },
        clearCart: () => set({ cart: [] }),
      },
    }),
    {
      name: "shopping-cart-storage",
      partialize: (state) => ({ cart: state.cart }),
    },
  ),
);

export function useCart() {
  const { cart, isCartOpen, actions } = useCartStore();

  const cartItemCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const totalPrice = useMemo(() => {
    return cart.reduce((total, item) => {
      const itemPrice = item.hasDiscount
        ? Math.round(item.price * (1 - (item.discountPercentage || 0)))
        : item.price;
      return total + itemPrice * item.quantity;
    }, 0);
  }, [cart]);

  return {
    cart,
    isCartOpen,
    cartItemCount,
    totalPrice,
    ...actions,
  };
}
