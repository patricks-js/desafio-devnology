import { NuqsAdapter } from "nuqs/adapters/react";
import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { QueryClientProvider } from "./query-client-provider";
import { ThemeProvider } from "./theme-provider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <QueryClientProvider>
        <NuqsAdapter>{children}</NuqsAdapter>
      </QueryClientProvider>

      <Toaster />
    </ThemeProvider>
  );
}
