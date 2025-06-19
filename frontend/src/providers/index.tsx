import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/features/cart/hooks/use-cart";
import { ProductFiltersProvider } from "@/features/products/hooks/use-product-filters";
import { QueryClientProvider } from "./query-client-provider";
import { ThemeProvider } from "./theme-provider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <QueryClientProvider>
        <CartProvider>
          <ProductFiltersProvider>{children}</ProductFiltersProvider>
        </CartProvider>
      </QueryClientProvider>

      <Toaster />
    </ThemeProvider>
  );
}
