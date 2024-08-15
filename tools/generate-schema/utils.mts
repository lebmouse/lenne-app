import fs from "fs-extra";
import { globby } from "globby";
import path from "node:path";
import { cwd } from "node:process";

export interface Tsconfig {
  baseUrl: string;
  paths: Record<string, string[]>;
}
export async function getTsconfig(tsconfigPath: string): Promise<Tsconfig> {
  const tsconfig = JSON.parse(await fs.readFile(tsconfigPath, "utf8"));
  const { baseUrl = ".", paths = {} } = tsconfig.compilerOptions || {};
  return { baseUrl: path.resolve(path.dirname(tsconfigPath), baseUrl), paths };
}

export type GenerateContext = {
  importPath: string;
  baseName: string;
};

export function getContexts(
  pathsToConvert: string[],
  tsconfig: Tsconfig
): GenerateContext[] {
  return pathsToConvert.map((filePath) => ({
    importPath: convertPathToImport(tsconfig.baseUrl, tsconfig.paths, filePath),
    baseName: extractBaseName(filePath),
  }));
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

function extractBaseName(filePath: string) {
  return path.basename(filePath).replace(/\.(ts|tsx)$/, "");
}

export async function generateSchema(option: {
  input: string;
  output: string;
  template: (contexts: GenerateContext[]) => Promise<string> | string;
  tsconfig: Tsconfig | string;
}) {
  const itemPaths = await globby([path.resolve(cwd(), option.input)]);
  const tsconfig = await parseTsconfig(option.tsconfig);
  const contexts = getContexts(itemPaths, tsconfig);
  const resultSource = await option.template(contexts);
  await fs.writeFile(path.resolve(cwd(), option.output), resultSource);
}

async function parseTsconfig(tsconfig: Tsconfig | string): Promise<Tsconfig> {
  if (typeof tsconfig === "string") {
    return await getTsconfig(path.resolve(cwd(), tsconfig));
  }
  return tsconfig;
}
