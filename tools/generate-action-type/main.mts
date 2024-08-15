import fs from "fs-extra";
import path from "node:path";
import { globby } from "globby";
import { cwd } from "node:process";

async function generateActionSchema() {
  // @example ['/Users/youngkwonkwon/lab/linne/lenne-app/src/modules/action/printLog.ts']
  const pathsToConvert = await globby([
    path.resolve(cwd(), "src/modules/action/**/*.{ts,tsx}"),
  ]);
  /**
   * @example { baseUrl: '/Users/youngkwonkwon/lab/linne/lenne-app', paths: { '@/*': [ './src/*' ] }}
   */
  const tsconfigPath = await getTsconfigPaths(
    path.resolve(cwd(), "tsconfig.json")
  );

  /**
   * @example [{importPath:'@/modules/action/printLog', basename: 'printLog' } ]
   */
  const contexts = pathsToConvert.map((filePath) => ({
    importPath: convertPathToImport(
      tsconfigPath.baseUrl,
      tsconfigPath.paths,
      filePath
    ),
    baseName: extractBaseName(filePath),
  }));

  const componentImports = contexts
    .map(
      ({ importPath, baseName }) =>
        `import type ${baseName} from '${importPath}';`
    )
    .join("\n");

  const componentTypes = contexts
    .map(
      ({ baseName }) =>
        `interface ${baseName}Action { \n\ttype: "${baseName}";\n\toption: Parameters<typeof ${baseName}>[0]\n};`
    )
    .join("\n");

  const componentTypesUnion = contexts
    .map(({ baseName }) => `${baseName}Action`)
    .join(" | ");

  const resultSource = `
${componentImports}

${componentTypes}

declare global {
  type ActionSchema = ${componentTypesUnion};
}
  `;

  await fs.writeFile(
    path.resolve(cwd(), "@types/action-schema/index.d.ts"),
    resultSource
  );
}

generateActionSchema();

async function getTsconfigPaths(tsconfigPath: string) {
  const tsconfig = JSON.parse(await fs.readFile(tsconfigPath, "utf8"));
  const { baseUrl = ".", paths = {} } = tsconfig.compilerOptions || {};
  return { baseUrl: path.resolve(path.dirname(tsconfigPath), baseUrl), paths };
}

function extractBaseName(filePath: string) {
  return path.basename(filePath).replace(/\.(ts|tsx)$/, "");
}

function convertPathToImport(
  basePath: string,
  paths: Record<string, string[]>,
  filePath: string
) {
  const relativePath = path.relative(basePath, filePath).replace(/\\/g, "/");

  for (const [alias, [aliasPath]] of Object.entries(paths)) {
    const aliasBasePath = aliasPath.replace(/\/\*$/, "");
    const relativeAliasBasePath = path
      .relative(basePath, aliasBasePath)
      .replace(/\\/g, "/");

    if (relativePath.startsWith(relativeAliasBasePath)) {
      const importPath = relativePath
        .replace(relativeAliasBasePath, alias.replace("/*", ""))
        .replace(/\.tsx$/, "");
      return importPath;
    }
  }

  return relativePath.replace(/\.tsx$/, "");
}
