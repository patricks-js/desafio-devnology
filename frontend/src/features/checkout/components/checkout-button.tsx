import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useCheckout } from "../hooks/use-checkout";

export function CheckoutButton() {
  const { isCheckingOut, processCheckout } = useCheckout();
  const navigate = useNavigate()

  async function handleCheckout() {
    try {
      const order = await processCheckout();
      if (order) {
        toast.success("Pedido criado com sucesso:", order);
        navigate({to: "/"});
      }
    } catch (error) {
      console.error("Erro ao processar o checkout:", error);
      toast.error("Erro ao processar o checkout");
    }
  }

  return (
    <Button onClick={handleCheckout} className="w-full">
      {isCheckingOut ? "Processando..." : "Finalizar Compra"}
    </Button>
  );
}
