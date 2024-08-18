"use client";
import componentJson from "@/schema/component.json";
import { proxy } from "valtio";

export const componentFormProxy = proxy<{ ref?: string; schemas?: object }>({
  ref: undefined,
  get schemas() {
    return resolveRef(this.ref, componentJson);
  },
});

export function resolveRef(ref?: string, schema?: any): object | undefined {
  if (ref === undefined || schema === undefined) {
    return undefined;
  }

  const paths = ref.replace(/^#\//, "").split("/");
  let current = schema;
  for (const path of paths) {
    current = current[path];
    if (current === undefined) {
      throw new Error(`Schema path not found: ${ref}`);
    }
  }
  return current;
}
