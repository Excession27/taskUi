import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

export const queryClient = new QueryClient();

type QueryUsers = {
  children: ReactNode;
};

export default function ReactQueryProvider({ children }: QueryUsers) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export const invalidateQuery = () =>
  queryClient.invalidateQueries(["task-list"]);
