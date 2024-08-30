import { ComponentSchema } from "./component";

// RenderComponent 사용하는 렌더링 데이터
export type RenderSchema = {
  id: string;
  children?: RenderSchema[] | RenderSchema;
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

/**
 *  @example
 * const renderSchema: RenderRecord = {
 *   "1": { id: "1", type: "Card", props: { name: "name", age: 1 } },
 *   "2": { id: "2", type: "Card2", props: { name: "name2", age: 1 } },
 *   "3": { id: "3", type: "Container", props: { title: "title", children: ["1", "2"]  } },
 * };
 */
export type RenderRecord = Record<string, RenderSchema>;
