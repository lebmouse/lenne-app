"use client";
import componentJson from "@/schema/component.json";
import {
  BasicRenderRecord,
  BasicRenderSchema,
  RenderRecord,
  RenderSchema,
  TreeRecord,
  TreeViewData,
  TreeViewItem,
} from "@/schema/type/render";
import { observable } from "@legendapp/state";
import { nanoid } from "nanoid";
import { SimpleTreeData } from "react-arborist";

export const admin$ = observable<{
  selectedId: string | null;
  treeRecord: TreeRecord;
  renderRecord: BasicRenderRecord;
  treeView: TreeViewData;
  renderSchema: BasicRenderSchema | null;
  addTreeItem: (parentId: string | null, id: string) => void;
}>({
  selectedId: null,
  treeRecord: {},
  treeView: () => {
    const treeRecord = admin$.treeRecord.get();
    const renderRecord = admin$.renderRecord.get();
    const rootIds = Object.values(treeRecord)
      .filter((node) => node.parentId === null)
      .map((node) => node.id);
    const createTreeView = (id: string): TreeViewItem => {
      const node = treeRecord[id];
      return {
        id: node.id,
        name: renderRecord[node.id].type,
        children: node.childrenIds.map(createTreeView),
      };
    };
    return rootIds.map(createTreeView);
  },

  renderSchema: null,
  renderRecord: {},
  addTreeItem(parentId, schemaRef) {
    const id = nanoid(4);
    const componentSchema = resolveRef(schemaRef, componentJson);
    admin$.renderRecord[id].assign({
      id: id,
      type: componentSchema.properties.type.const,
      props: componentSchema.properties.props,
    });

    const childrenIds = Object.entries(
      componentSchema.properties.props.properties
    ).reduce<(SimpleTreeData & { type?: "ReactNode" })[]>(
      (acc, [propsName, propsValue]) => {
        if (
          propsValue &&
          typeof propsValue === "object" &&
          "$ref" in propsValue &&
          typeof propsValue.$ref === "string" &&
          propsValue.$ref === "#/components/schemas/React.ReactNode"
        ) {
          acc.push({
            id: nanoid(4),
            name: propsName,
            children: [],
            type: "ReactNode",
          });
        }
        return acc;
      },
      []
    );
    console.log(childrenIds);

    // if (parentId === null) {
    //   admin$.treeRecord[id].assign({ id: id, parentId, childrenIds });
    // } else {
    //   admin$.treeRecord[parentId].childrenIds.push(id);
    //   admin$.treeRecord[id].assign({ id: id, parentId, childrenIds: [] });
    // }
  },
});

admin$.onChange((state) => {
  console.log(state.value);
});

interface ComponentSchema {
  type: string;
  properties: {
    type: { const: string };
    props: {
      type: "object";
      properties: Record<string, unknown>;
    };
  };
  required?: string[];
}

// TODO: 타입 파싱으로 변경
export function resolveRef(ref: string, schema: any): ComponentSchema {
  if (ref === undefined || schema === undefined) {
    throw new Error(`Schema ref not found: ${ref}`);
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
