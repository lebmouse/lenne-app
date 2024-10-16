"use client";

import { observer } from "@legendapp/state/react";
import { admin$ } from "./store";
import { NodeRendererProps, Tree } from "react-arborist";
import { TreeViewItem } from "@/schema/type/render";
import { Folder, Leaf } from "lucide-react";
import { css } from "styled-system/css";

export const TreeContainer = observer(function TreeContainer() {
  const treeViewData = Object.values(admin$.treeView.get());
  const selection = admin$.selectedId.get() ?? undefined;
  return (
    <section>
      <Tree
        data={treeViewData}
        onMove={(args) => {
          console.log(args);
        }}
        className={css({ width: "100%", height: "100%" })}
        selection={selection}
        onSelect={(args) => {
          const newSelectedId = args[0]?.id;
          if (typeof newSelectedId === "string") {
            admin$.selectedId.set(newSelectedId);
          } else {
            admin$.selectedId.set(null);
          }
        }}
        onFocus={console.log}
      >
        {Node}
      </Tree>
    </section>
  );
});

const Node = observer(function Node({
  node,
  style,
  dragHandle,
}: NodeRendererProps<TreeViewItem>) {
  return (
    <div
      ref={dragHandle}
      className={css({
        display: "flex",
        alignItems: "center",
        borderRadius: "8px",
      })}
      style={{ ...style, backgroundColor: node.isSelected ? "lightblue" : "" }}
    >
      {node.isLeaf ? <Leaf size={18} /> : <Folder size={18} />}
      {node.data.name}
    </div>
  );
});
