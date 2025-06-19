import { Link } from "@tanstack/react-router";
import { Eye, ShoppingCart, Tag } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/features/cart/hooks/use-cart";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const calculateDiscountedPrice = () => {
    if (product.hasDiscount && product.discountPercentage) {
      return product.price * (1 - product.discountPercentage / 100);
    }
    return product.price;
  };

  return (
    <>
      <Card className="group overflow-hidden pt-0">
        <div className="relative overflow-hidden">
          {imageLoading && <Skeleton className="h-64 w-full" />}
          <img
            src={"https://placehold.co/256x256?text=Product+Image"}
            alt={product.name}
            className={`h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
              imageLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setImageLoading(false)}
            onError={() => setImageLoading(false)}
          />
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="text-xs">
              {product.department}
            </Badge>
          </div>
          {product.hasDiscount && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-emerald-500 text-xs">
                -{product.discountPercentage}%
              </Badge>
            </div>
          )}
          <div className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
            <Button variant="secondary" size="icon" asChild className="size-8">
              <Link to="/products/$id" params={{ id: product.id }}>
                <Eye />
              </Link>
            </Button>
          </div>
        </div>

        <CardContent>
          <div className="mb-2">
            <Badge variant="outline" className="mb-2 text-xs">
              {product.category}
            </Badge>
          </div>
          <h3 className="mb-2 line-clamp-2 font-semibold text-lg">
            {product.name}
          </h3>
          <p className="mb-3 line-clamp-2 text-muted-foreground text-sm">
            {product.description}
          </p>
          <div className="mb-3 flex items-center">
            <Tag className="mr-1 size-4 text-muted-foreground" />
            <span className="text-muted-foreground text-sm">
              {product.material}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            {product.hasDiscount ? (
              <>
                <div className="text-lg text-muted-foreground line-through">
                  {formatPrice(product.price)}
                </div>
                <div className="font-bold text-2xl text-emerald-600">
                  {formatPrice(calculateDiscountedPrice())}
                </div>
              </>
            ) : (
              <div className="font-bold text-2xl text-primary">
                {formatPrice(product.price)}
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter>
          <Button onClick={() => addToCart(product)} className="w-full">
            <ShoppingCart />
            Adicionar ao Carrinho
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
