import { createFileRoute } from "@tanstack/react-router";
import { ProductGrid } from "@/features/products/components/product-grid";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <main className="space-y-8">
      <header className="space-y-2">
        <h2 className="font-bold text-xl md:text-3xl">Nossos Produtos</h2>
        <p className="text-muted-foreground">
          Encontre os melhores produtos com qualidade garantida
        </p>
      </header>

      <ProductGrid />
    </main>
  );
}
