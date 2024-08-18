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

export type RenderItems = Record<string, RenderSchema>;
