import { GenerateContext } from "./utils.mjs";

export async function componentSchemaTemplate(contexts: GenerateContext[]) {
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

declare global {
  type ComponentSchema = ${componentTypesUnion};
}
  `;

  return resultSource;
}

export async function actionSchemaTemplate(contexts: GenerateContext[]) {
  const actionImports = contexts
    .map(
      ({ importPath, baseName }) =>
        `import type ${baseName} from '${importPath}';`
    )
    .join("\n");

  const actionTypes = contexts
    .map(
      ({ baseName }) =>
        `interface ${baseName}Action { \n\ttype: "${baseName}";\n\toption: Parameters<typeof ${baseName}>[0]\n};`
    )
    .join("\n");

  const actionTypeUnion = contexts
    .map(({ baseName }) => `${baseName}Action`)
    .join(" | ");

  const resultSource = `
${actionImports}

${actionTypes}

declare global {
type ActionSchema = ${actionTypeUnion};
}
`;
  return resultSource;
}
