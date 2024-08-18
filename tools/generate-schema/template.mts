import { TemplateGenerator } from "./config.mjs";

export const componentSchemaTemplate: TemplateGenerator = async (contexts) => {
  const componentImports = contexts
    .map(
      ({ importPath, baseName }) =>
        `import type ${baseName} from '${importPath}';`
    )
    .join("\n");

  const componentTypes = contexts
    .map(
      ({ baseName }) =>
        `interface ${baseName}Component { \n\ttype: "${baseName}";\n\tprops: ComponentProps<typeof ${baseName}>\n};`
    )
    .join("\n");

  const componentTypesUnion = contexts
    .map(({ baseName }) => `${baseName}Component`)
    .join(" | ");

  const resultSource = `
import type { ComponentProps } from 'react';
${componentImports}

${componentTypes}

export type ComponentSchema = ${componentTypesUnion};
`;

  return { source: resultSource, exportName: "ComponentSchema" };
};

export const actionSchemaTemplate: TemplateGenerator = async (contexts) => {
  const actionImports = contexts
    .map(
      ({ importPath, baseName }) =>
        `import type ${baseName} from '${importPath}';`
    )
    .join("\n");

  const actionTypes = contexts
    .map(
      ({ baseName }) =>
        `interface ${baseName}Action { \n\ttype: "${baseName}";\n\toption: Parameters<typeof ${baseName}>\n};`
    )
    .join("\n");

  const actionTypeUnion = contexts
    .map(({ baseName }) => `${baseName}Action`)
    .join(" | ");

  const resultSource = `
${actionImports}

${actionTypes}

export type ActionSchema = ${actionTypeUnion};
`;

  return { source: resultSource, exportName: "ActionSchema" };
};
