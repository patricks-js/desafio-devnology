import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CheckoutTable } from "@/features/checkout/components/checkout-table";
import { useGetOrders } from "@/features/checkout/hooks/use-get-orders";

export const Route = createFileRoute("/checkout")({
  component: RouteComponent,
});

function RouteComponent() {
  const { orders, isPending, error } = useGetOrders();

  if (isPending) {
    return <div className="text-center">Carregando pedidos...</div>;
  }

  if (error || !orders) {
    return (
      <div className="text-center text-red-500">
        Ocorreu um erro ao carregar os pedidos
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1440px] py-8">
      <Button variant="outline" asChild className="mb-8">
        <Link to="/">
          <ArrowLeft className="mr-2" />
          Voltar
        </Link>
      </Button>

      <h1 className="mb-6 font-bold text-2xl">Meus Pedidos</h1>
      {orders.length === 0 ? (
        <div className="text-center text-muted-foreground">
          Nenhum pedido encontrado.
        </div>
      ) : (
        <div className="space-y-10">
          {orders.map((order) => (
            <CheckoutTable order={order} key={order.id} />
          ))}
        </div>
      )}
    </div>
  );
}
