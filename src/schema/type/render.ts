import { ComponentSchema } from "./component";

export type RenderSchema = {
  id: string;
  children?: RenderSchema[] | RenderSchema;
} & ComponentSchema;

export type TreeNode = {
  id: string;
  parentId: string | null; // 최상위 노드는 null
  childrenIds: string[]; // 자식 노드의 ID 배열
};

export type TreeRecord = Record<string, TreeNode>;

export type RenderItems = Record<string, RenderSchema>;

// const renderSchema: RenderItems = {
//   "1": { id: "1", type: "Card", props: { name: "name", age: 1 } },
//   "2": { id: "2", type: "Card", props: { name: "name2", age: 1 } },
// };

// const renderSchemaTree: TreeNode = {
//   id: "1",
//   childrenIds: ["2"],
//   parentId: null,
// };
