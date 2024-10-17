"use client";
import { Provider, defaultTheme } from "@adobe/react-spectrum";
export function SpectrumProvider({ children }: { children: React.ReactNode }) {
  return <Provider theme={defaultTheme}>{children}</Provider>;
}
