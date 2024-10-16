"use client";
import componentJson from "@/schema/component.json";
import {
  BasicRenderRecord,
  BasicRenderSchema,
  TreeRecord,
  TreeViewData,
  TreeViewItem,
} from "@/schema/type/render";
import { observable } from "@legendapp/state";
import { nanoid } from "nanoid";

export const admin$ = observable<{
  selectedId: string | null;
  selectedIds: string[];
  treeRecord: TreeRecord;
  selectedHasChildren: boolean;
  renderRecord: BasicRenderRecord;
  treeView: TreeViewData;
  renderSchema: BasicRenderSchema | null;
  addTreeItem: (parentId: string | null, id: string) => void;
}>({
  selectedId: null,
  selectedIds: [],
  treeRecord: {},
  selectedHasChildren: () => {
    const selectedId = admin$.selectedId.get();
    if (!selectedId) return false;
    const renderItem = admin$.renderRecord[selectedId].children.get();
    if (renderItem instanceof Array) return true;
    return false;
  },
  treeView: () => {
    const treeRecord = admin$.treeRecord.get();
    const renderRecord = admin$.renderRecord.get();
    const rootIds = Object.values(treeRecord)
      .filter((node) => node.parentId === null)
      .map((node) => node.id);
    const createTreeView = (id: string): TreeViewItem | undefined => {
      const treeNode = treeRecord[id];
      const renderNode = renderRecord?.[id];
      if (renderNode) {
        return {
          id: id,
          name: renderNode.name,
          children: treeNode?.childrenIds
            ?.map(createTreeView)
            .filter((item) => item !== undefined),
        };
      }
    };
    return rootIds
      .map(createTreeView)
      .filter((item) => item !== undefined) as TreeViewData;
  },
  renderSchema: null,
  renderRecord: {},

  addTreeItem(parentId, schemaRef) {
    const id = nanoid(4);
    const componentSchema = resolveRef(schemaRef, componentJson);

    admin$.renderRecord[id].assign({
      id: id,
      name: componentSchema.properties.type.const,
      props: componentSchema.properties.props,
    });

    const childrenIds = Object.entries(
      componentSchema.properties.props.properties
    ).reduce<string[]>((acc, [propsName, propsValue]) => {
      if (
        propsValue &&
        typeof propsValue === "object" &&
        "$ref" in propsValue &&
        typeof propsValue.$ref === "string" &&
        propsValue.$ref === "#/components/schemas/React.ReactNode"
      ) {
        const childrenId = nanoid(4);
        acc.push(childrenId);
        admin$.renderRecord[childrenId].assign({
          id: childrenId,
          name: propsName,
          type: "ReactNode",
          children: [],
        });
        admin$.treeRecord[childrenId].assign({
          id: childrenId,
          parentId: id,
          childrenIds: [],
        });
      }
      return acc;
    }, []);

    if (parentId === null) {
      admin$.treeRecord[id].assign({
        id: id,
        parentId,
        childrenIds: childrenIds.length > 0 ? childrenIds : undefined,
      });
    } else {
      admin$.treeRecord[parentId].childrenIds.push(id);
      admin$.treeRecord[id].assign({
        id: id,
        parentId,
        childrenIds: childrenIds.length > 0 ? childrenIds : undefined,
      });
    }
  },
});

admin$.onChange((args) => {
  console.log(args.value);
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
