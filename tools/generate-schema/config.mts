import { actionSchemaTemplate, componentSchemaTemplate } from "./template.mjs";

export type GenerateContext = {
  importPath: string;
  baseName: string;
};

export interface Tsconfig {
  baseUrl: string;
  paths: Record<string, string[]>;
}

export type TemplateResult = {
  source: string;
  exportName: string;
};

export type TemplateGenerator = (
  contexts: GenerateContext[]
) => Promise<TemplateResult> | TemplateResult;

export type GenerateSchemaOption = {
  input: string;
  typeOutput: string;
  schemaOutput: string;
  template: TemplateGenerator;
  tsconfig: Tsconfig | string;
};

type GenerateSchemaConfig = {
  options: GenerateSchemaOption[];
};

const config: GenerateSchemaConfig = {
  options: [
    {
      input: "src/modules/component/**/*.tsx",
      typeOutput: "src/schema/type/component.ts",
      schemaOutput: "src/schema/component.json",
      tsconfig: "tsconfig.json",
      template: componentSchemaTemplate,
    },
    {
      input: "src/modules/action/**/*.ts",
      typeOutput: "src/schema/type/action.ts",
      schemaOutput: "src/schema/action.json",
      tsconfig: "tsconfig.json",
      template: actionSchemaTemplate,
    },
  ],
};
export default config;
