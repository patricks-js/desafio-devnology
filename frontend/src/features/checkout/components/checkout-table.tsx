import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { OrderResponse } from "@/features/checkout/types";
import { formatPrice } from "@/lib/utils";

export function CheckoutTable({ order }: { order: OrderResponse }) {
  return (
    <div key={order.id} className="rounded-lg border p-6 shadow-sm">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-muted-foreground text-sm">
          Pedido #{order.id}
        </span>
        <Badge variant={order.status === "PENDING" ? "secondary" : "default"}>
          {order.status === "PENDING" ? "Pendente" : order.status}
        </Badge>
      </div>
      <div className="mb-4 text-muted-foreground text-sm">
        Realizado em: {new Date(order.createdAt).toLocaleString("pt-BR")}
      </div>
      <Table>
        <TableCaption>Itens do pedido</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead>Preço unitário</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Subtotal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {order.items.map((item) => (
            <TableRow key={item.product.id}>
              <TableCell>
                {item.product.name ?? (
                  <span className="text-muted-foreground italic">
                    Produto removido
                  </span>
                )}
              </TableCell>
              <TableCell>{formatPrice(item.product.price)}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{formatPrice(item.subtotal)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className="text-right font-semibold">
              Total
            </TableCell>
            <TableCell className="font-bold text-lg">
              {formatPrice(order.totalAmount)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
