import { Link } from "@tanstack/react-router";
import { Eye, ShoppingCart, Tag } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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
      <Card className="group hover:-translate-y-1 transform overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="relative overflow-hidden">
          {imageLoading && (
            <div className="absolute inset-0 animate-pulse bg-gray-200" />
          )}
          <img
            src={product.imagesUrl[0]}
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
          <div className="absolute top-12 right-2 opacity-0 transition-opacity group-hover:opacity-100">
            <Button variant="secondary" size="icon" asChild className="h-8 w-8">
              <Link to="/products/$id" params={{ id: product.id }}>
                <Eye />
              </Link>
            </Button>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="mb-2">
            <Badge variant="outline" className="mb-2 text-xs">
              {product.category}
            </Badge>
          </div>
          <h3 className="mb-2 line-clamp-2 font-semibold text-lg transition-colors group-hover:text-blue-600">
            {product.name}
          </h3>
          <p className="mb-3 line-clamp-2 text-gray-600 text-sm">
            {product.description}
          </p>
          <div className="mb-3 flex items-center">
            <Tag className="mr-1 h-4 w-4 text-gray-500" />
            <span className="text-gray-500 text-sm">{product.material}</span>
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
              <div className="font-bold text-2xl text-blue-600">
                {formatPrice(product.price)}
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button
            onClick={() => addToCart(product)}
            className="w-full bg-blue-600 transition-colors hover:bg-blue-700"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Adicionar ao Carrinho
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
