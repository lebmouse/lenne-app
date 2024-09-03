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
    const componentSchema = resolveRef(
      schemaRef,
      componentJson.components.schemas
    );

    admin$.renderRecord[schemaRef].assign({
      id: id,
      type: componentSchema.type,
      props: componentSchema.props,
    });

    admin$.renderRecord[schemaRef].id.set(id);
    admin$.renderRecord[schemaRef].props.assign(componentSchema.props);
    admin$.renderRecord[schemaRef].type.set(componentSchema.type);

    if (parentId === null) {
      admin$.treeRecord[schemaRef].set({ id: id, parentId, childrenIds: [] });
    } else {
      admin$.treeRecord[parentId].childrenIds.push(schemaRef);
      admin$.treeRecord[schemaRef].set({ id: id, parentId, childrenIds: [] });
    }
  },
});

interface ComponentSchema {
  type: string;
  props: Record<string, unknown>;
}

export function resolveRef(ref: string, schema: any): ComponentSchema {
  if (ref === undefined || schema === undefined) {
    throw new Error(`Schema path not found: ${ref}`);
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
