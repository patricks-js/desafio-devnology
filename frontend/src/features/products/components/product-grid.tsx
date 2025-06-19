import { Skeleton } from "@/components/ui/skeleton";
import { useProducts } from "../hooks/use-products";
import { ProductCard } from "./product-card";

export function ProductGrid() {
  const { products, error, isPending } = useProducts();

  if (isPending) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="space-y-4">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-8 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (products.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="mb-4 text-gray-500 text-xl">
          Nenhum produto encontrado
        </div>
        <p className="text-gray-400">
          Tente ajustar os filtros ou termos de busca
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
