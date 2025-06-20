import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/features/cart/hooks/use-cart";
import { CheckoutButton } from "@/features/checkout/components/checkout-button";
import { formatPrice } from "@/lib/utils";

export function CartSidebar() {
  const {
    isCartOpen,
    closeCart,
    cart,
    cartItemCount,
    totalPrice,
    updateQuantity,
    removeFromCart,
  } = useCart();

  const calculateDisplayPrice = (item: (typeof cart)[0]) => {
    return item.hasDiscount
      ? Math.round(item.price * (1 - (item.discountPercentage || 0)))
      : item.price;
  };

  function renderEmptyCart() {
    return (
      <>
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <ShoppingBag className="mr-2 size-5" />
            Carrinho de Compras
          </SheetTitle>
        </SheetHeader>
        <div className="flex h-full flex-col items-center justify-center p-4 text-center">
          <ShoppingBag className="mb-4 size-16 text-muted-foreground" />
          <h3 className="mb-2 font-medium text-lg">Seu carrinho está vazio</h3>
          <p className="mb-6 text-muted-foreground">
            Adicione produtos para vê-los aqui.
          </p>
          <Button onClick={closeCart} className="w-full">
            Continuar Comprando
          </Button>
        </div>
      </>
    );
  }

  function renderCartItems() {
    return (
      <>
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <ShoppingBag className="mr-2 size-5" />
              Carrinho ({cartItemCount} {cartItemCount === 1 ? "item" : "itens"}
              )
            </div>
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-4 rounded-lg bg-secondary p-4"
              >
                <img
                  src={"https://placehold.co/64x64"}
                  alt={item.name}
                  className="size-16 rounded-md object-cover"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="line-clamp-2 font-medium text-sm">
                    {item.name}
                  </h4>
                  <div className="flex items-center space-x-2">
                    {item.hasDiscount ? (
                      <>
                        <span className="text-muted-foreground text-xs line-through">
                          {formatPrice(item.price)}
                        </span>
                        <span className="text-destructive text-sm">
                          {formatPrice(calculateDisplayPrice(item))}
                        </span>
                      </>
                    ) : (
                      <span className="text-muted-foreground text-sm">
                        {formatPrice(item.price)}
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-xs">
                    {item.department}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus />
                  </Button>
                  <span className="w-8 text-center font-medium">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="size-3" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 px-4 py-6">
          <Separator />
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal:</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Frete:</span>
              <span className="text-emerald-600">Grátis</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
          </div>
          <div className="space-y-2">
            <CheckoutButton />
            <Button variant="outline" onClick={closeCart} className="w-full">
              Continuar Comprando
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <Sheet open={isCartOpen} onOpenChange={closeCart}>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        {cart.length === 0 ? renderEmptyCart() : renderCartItems()}
      </SheetContent>
    </Sheet>
  );
}
