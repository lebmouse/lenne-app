"use client";

import { observer } from "@legendapp/state/react";
import { admin$ } from "./store";
import { NodeRendererProps, Tree } from "react-arborist";
import { TreeViewItem } from "@/schema/type/render";
import { Folder, Leaf } from "lucide-react";
import { css } from "styled-system/css";
import { Button } from "@/park/button";
import { IconButton } from "@/park/icon-button";
import { Text } from "@/park/text";

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
  const removable = node.data.type !== "ReactNode";
  return (
    <div
      ref={dragHandle}
      className={css({
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: "8px",
        height: "28px",
      })}
      style={{ ...style, backgroundColor: node.isSelected ? "lightblue" : "" }}
    >
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          borderRadius: "8px",
          gap: "4px",
        })}
      >
        {node.isLeaf ? <Leaf size={18} /> : <Folder size={18} />}
        <Text>{node.data.name}</Text>
      </div>
      {removable && (
        <IconButton
          variant={"outline"}
          size={"xs"}
          className={css({ aspectRatio: 1, h: "90%", width: "auto" })}
          onClick={() => {
            admin$.removeTreeItem(node.data.id);
          }}
        >
          X
        </IconButton>
      )}
    </div>
  );
});
