"use client";

import { observer } from "@legendapp/state/react";
import { admin$ } from "./store";
import { NodeRendererProps, Tree } from "react-arborist";
import { TreeViewItem } from "@/schema/type/render";

export const TreeContainer = observer(function TreeContainer() {
  const treeView = admin$.treeView.get();
  const treeRecord = admin$.treeRecord.get();
  return (
    <section>
      <ul>
        {Object.entries(treeRecord).map((record, index) => (
          <li key={record[0]}>{JSON.stringify(record, null, 2)}</li>
        ))}
      </ul>
      <hr />
      <ul>
        {Object.entries(treeView).map((view, index) => (
          <li key={view[0]}>{JSON.stringify(view, null, 2)}</li>
        ))}
      </ul>
      <Tree
        data={Object.values(treeView)}
        onMove={(args) => {
          console.log(args);
        }}
      >
        {Node}
      </Tree>
    </section>
  );
});

function Node({ node, style, dragHandle }: NodeRendererProps<TreeViewItem>) {
  return (
    <div style={style} ref={dragHandle}>
      {node.isLeaf ? "" : "📁"}
      {node.data.name}
    </div>
  );
}
