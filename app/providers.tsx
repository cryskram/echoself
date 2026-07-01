"use client";

import { client } from "@/lib/apolloClient";
import { ApolloProvider } from "@apollo/client/react";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <Toaster richColors position="top-center" />
      {children}
    </ApolloProvider>
  );
}
