import { Provider, defaultTheme } from "@adobe/react-spectrum";
export default function Template({ children }: { children: React.ReactNode }) {
  return <Provider theme={defaultTheme}>{children}</Provider>;
}
