import { ComponentSchema } from "./component";

export type BasicRenderSchema = {
  id: string;
  name: string;
  type: string;
  props: Record<string, unknown>;
  children?: BasicRenderSchema[];
};

// RenderComponent 사용하는 렌더링 데이터
export type RenderSchema = {
  id: string;
  children?: RenderSchema[];
} & ComponentSchema;

export type TreeNode = {
  id: string;
  parentId: string | null; // 최상위 노드는 null
  childrenIds: string[]; // 자식 노드의 ID 배열
};

/**
 * @example
 * const treeRecord: TreeRecord = {
 *   "1": { id: "1", parentId: null, childrenIds: ["2", "3"] },
 *   "2": { id: "2", parentId: "1", childrenIds: [] },
 *   "3": { id: "3", parentId: "1", childrenIds: ["4"] },
 *   "4": { id: "4", parentId: "3", childrenIds: [] }
 * };
 */
export type TreeRecord = Record<string, TreeNode>;

export type TreeViewItem = {
  id: string;
  name: string;
  type: string;
  children?: TreeViewItem[];
};

export type TreeViewData = TreeViewItem[];

export type BasicRenderRecord = Record<string, BasicRenderSchema>;

/**
 *  @example
 * const renderSchema: RenderRecord = 
 * {
  "wFTd": {
      "id": "wFTd",
      "name": "TwoChildern",
      "props": {
          "type": "object",
          "properties": {
              "children": {
                  "$ref": "#/components/schemas/React.ReactNode"
              },
              "twoChildren": {
                  "$ref": "#/components/schemas/React.ReactNode"
              }
          }
      }
  },
  "cq11": {
      "id": "cq11",
      "name": "children",
      "type": "ReactNode",
      "children": []
  },
  "4PXx": {
      "id": "4PXx",
      "name": "twoChildren",
      "type": "ReactNode",
      "children": []
  },
  "0W5i": {
      "id": "0W5i",
      "name": "Input",
      "props": {
          "type": "object",
          "properties": {
              "name": {
                  "type": "string",
                  "title": "name",
                  "isRequired": true
              }
          },
          "required": [
              "name"
          ]
      }
  }
};
 */
export type RenderRecord = Record<string, RenderSchema>;
