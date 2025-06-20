import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CreditCard, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/features/cart/hooks/use-cart";
import { CheckoutButton } from "@/features/checkout/components/checkout-button";
import { useProduct } from "@/features/products/hooks/use-product";
import { formatPrice } from "@/lib/utils";

export const Route = createFileRoute("/products/$id")({
  loader: ({ params }) => ({ id: params.id }),
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useLoaderData();
  const { product, isPending, error } = useProduct(id);
  const { addToCart } = useCart();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isPending || !product) {
    return <div>Loading...</div>;
  }

  const discountedPrice =
    product.hasDiscount && product.discountPercentage
      ? Math.round(product.price * (1 - product.discountPercentage / 100))
      : product.price;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Button variant="outline" asChild className="mb-8">
        <Link to="/">
          <ArrowLeft className="mr-2" />
          Voltar
        </Link>
      </Button>

      <div className="flex items-center gap-8 sm:gap-16">
        <div className="">
          <img
            src="https://placehold.co/400x400?text=Produto"
            alt={product.name}
            className="aspect-square rounded-lg bg-muted object-cover"
          />
          {product.hasDiscount && (
            <Badge className="mt-4 bg-emerald-500 text-white">
              {product.discountPercentage}% OFF
            </Badge>
          )}
        </div>

        {/* Detalhes do produto */}
        <div className="flex flex-1 flex-col justify-between p-0">
          <div>
            <h2 className="mb-2 font-bold text-3xl">
              {product.name.at(0)?.toUpperCase() + product.name.substring(1)}
            </h2>
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge variant="outline">{product.category}</Badge>
              <Badge variant="secondary">{product.department}</Badge>
              <Badge variant="outline">{product.material}</Badge>
            </div>
            <p className="mb-6 text-muted-foreground">{product.description}</p>
            <div className="mb-6">
              {product.hasDiscount ? (
                <div className="flex items-end gap-2">
                  <span className="font-bold text-2xl text-emerald-600">
                    {formatPrice(discountedPrice)}
                  </span>
                  <span className="text-base text-muted-foreground line-through">
                    {formatPrice(product.price)}
                  </span>
                  <span className="ml-2 font-semibold text-emerald-700 text-xs">
                    {product.discountPercentage}% OFF
                  </span>
                </div>
              ) : (
                <span className="font-bold text-2xl text-primary">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Button
              className="flex-1"
              onClick={() => addToCart(product)}
              variant="default"
            >
              <ShoppingCart className="mr-2" />
              Adicionar ao Carrinho
            </Button>
            <CheckoutButton
              variant="secondary"
              product={product}
              className="flex-1"
            >
              <CreditCard className="mr-2" />
              Comprar Agora
            </CheckoutButton>
          </div>
        </div>
      </div>
    </div>
  );
}
