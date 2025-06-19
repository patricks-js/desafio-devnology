import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProduct } from "@/features/products/hooks/use-product";

export const Route = createFileRoute("/products/$id")({
  loader: ({ params }) => ({ id: params.id }),
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useLoaderData();
  const { product, isPending, error } = useProduct(id);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Button variant="outline" asChild className="mb-8">
        <Link to="/">
          <ArrowLeft />
          Voltar
        </Link>
      </Button>

      <main>
        Hello!
        <pre>{JSON.stringify(product, null, 2)}</pre>
      </main>
    </div>
  );
}
