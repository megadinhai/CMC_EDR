import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Layout } from "./Layout";
import { DashboardPage } from "@/pages/DashboardPage";

// Placeholder for a future auth guard: wrap <DashboardPage /> once a real
// login flow exists (BA spec pre-condition: user must be authenticated
// and have dashboard view permission).
export function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <DashboardPage />
      </Layout>
    </QueryClientProvider>
  );
}
