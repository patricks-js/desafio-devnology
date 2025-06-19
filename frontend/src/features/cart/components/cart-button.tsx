import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "../hooks/use-cart";

export function CartButton() {
  const { cartItemCount, openCart } = useCart();

  return (
    <div className="relative">
      <Button variant="outline" size="icon" onClick={openCart}>
        <ShoppingCart />
        {cartItemCount > 0 && (
          <Badge
            variant="destructive"
            className="-top-1 -right-1 absolute flex size-4 items-center justify-center rounded-full p-0 text-[10px]"
          >
            {cartItemCount}
          </Badge>
        )}
      </Button>
    </div>
  );
}
