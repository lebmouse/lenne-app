"use client";

import { useRouter } from "next/navigation";
import { defaultTheme, Provider } from "@adobe/react-spectrum";
import { ReactNode } from "react";

declare module "@adobe/react-spectrum" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function ClientProviders({ children }: { children: ReactNode }) {
  let router = useRouter();
  return (
    <Provider theme={defaultTheme} router={{ navigate: router.push }}>
      {children}
    </Provider>
  );
}
