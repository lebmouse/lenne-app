export interface RenderData {
  id: string;
  type: string;
  props: Record<string, unknown>;
  events?: Record<string, Record<string, unknown>>;
  //   styles?: Record<string, unknown>;
  //   store?: Record<string, unknown>;
  children?: RenderData[] | RenderData | undefined;
}
