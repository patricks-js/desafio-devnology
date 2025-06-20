import { createFileRoute } from "@tanstack/react-router";
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
    <div className="mx-auto max-w-[1440px] py-10">
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
      <div className="mt-8 flex flex-col gap-2">
        <Button variant="outline" asChild className="w-full">
          <a href="/">Voltar para a loja</a>
        </Button>
      </div>
    </div>
  );
}
