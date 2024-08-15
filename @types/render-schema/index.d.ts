import { ComponentSchema } from "../component-schema";

type RenderSchema = { id: string; children?: RenderSchema } & ComponentSchema;
