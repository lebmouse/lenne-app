"use client";

import { useProxy } from "valtio/utils";
import { componentFormProxy } from "./store";
import { useSnapshot } from "valtio";

export function RightPanel() {
  const { schemas } = useSnapshot(componentFormProxy);
  if (schemas === undefined) {
    return <div>empty</div>;
  }
  return (
    <div>
      <h2>rightPanel</h2>
      {JSON.stringify(schemas, null, 2)}
    </div>
  );
}
