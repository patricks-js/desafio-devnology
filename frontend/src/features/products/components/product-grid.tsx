import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Skeleton } from "@/components/ui/skeleton";
import { useProducts } from "../hooks/use-products";
import { ProductCard } from "./product-card";

export function ProductGrid() {
  const {
    products,
    error,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProducts();

  const { ref, inView } = useInView({
    threshold: 0, // Dispara assim que o elemento entra na view
  });

  // Este useEffect observa a variável 'inView'. Quando ela se torna 'true',
  // significa que o usuário rolou até o final da lista, então buscamos a próxima página.
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

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

  if (!isPending && products.length === 0) {
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
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div ref={ref} className="h-1 w-full" />

      {isFetchingNextPage && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-4">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      )}

      {!hasNextPage && products.length > 0 && (
        <p className="py-4 text-center text-gray-500">
          Isso é tudo, pessoal! 🎉
        </p>
      )}
    </div>
  );
}
