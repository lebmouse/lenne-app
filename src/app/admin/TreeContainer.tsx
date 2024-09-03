"use client";
import { admin$ } from "./store";

export function TreeContainer() {
  const treeView = admin$.treeView.get();
  const treeRecord = admin$.treeRecord.get();
  return (
    <section>
      {JSON.stringify(treeView)}
      {JSON.stringify(treeRecord)}
    </section>
  );
}
