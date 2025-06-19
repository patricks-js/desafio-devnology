import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { CartSidebar } from "@/features/cart/components/cart-sidebar";
import { Providers } from "@/providers";

export const Route = createRootRoute({
  component: () => (
    <>
      <Providers>
        <Header categories={["Category 1", "Category 2", "Category 3"]} />
        <CartSidebar />

        <div className="mx-auto min-h-screen max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
          <Outlet />
        </div>

        <Footer />
      </Providers>

      <TanStackRouterDevtools />
    </>
  ),
});
