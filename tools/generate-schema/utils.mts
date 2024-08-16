import fs from "fs-extra";
import { globby } from "globby";
import path from "node:path";
import { cwd } from "node:process";
import { GenerateContext, GenerateSchemaOption, Tsconfig } from "./config.mjs";
import { exec } from "node:child_process";
import { promisify } from "node:util";

const execPromise = promisify(exec);

export async function getTsconfig(tsconfigPath: string): Promise<Tsconfig> {
  const tsconfig = JSON.parse(await fs.readFile(tsconfigPath, "utf8"));
  const { baseUrl = ".", paths = {} } = tsconfig.compilerOptions || {};
  return { baseUrl: path.resolve(path.dirname(tsconfigPath), baseUrl), paths };
}

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

// tpyia 를 사용해서 json schema를 만들어주는 코드를 만든다.
// typia 제너레이터를 사용해서 json schema를 만들어주는 코드를 만든다.
// 위 코드의 객체를 가져와서 json 파일로 만든다.

export async function generateSchema(option: GenerateSchemaOption) {
  const itemPaths = await globby([path.resolve(cwd(), option.input)]);
  const tsconfig = await parseTsconfig(option.tsconfig);
  const contexts = getContexts(itemPaths, tsconfig);
  const templateResult = await option.template(contexts);
  await fs.ensureDir(path.dirname(path.resolve(cwd(), option.typeOutput)));
  await fs.writeFile(
    path.resolve(cwd(), option.typeOutput),
    templateResult.source,
    {}
  );

  const tempInputPath = createTempInputPath(option.typeOutput);
  const tempOutputPath = createTempOutputPath(option.typeOutput);
  await fs.ensureDir(path.dirname(path.resolve(cwd(), tempInputPath)));
  await fs.writeFile(
    path.resolve(cwd(), tempInputPath),
    `import typia from "typia";
import { ${templateResult.exportName} } from "${createImportPath(tempInputPath, option.typeOutput)}";
typia.json.application<[${templateResult.exportName}]>();\n`
  );

  console.log(
    `pnpm typia generate --input ${path.dirname(tempInputPath)} --output ${path.dirname(tempOutputPath)}`
  );
  await execPromise(
    `pnpm typia generate --input ${path.dirname(tempInputPath)} --output ${path.dirname(tempOutputPath)}`
  ).then(({ stdout, stderr }) => {
    if (stderr) {
      throw new Error(stderr);
    }
    console.log(stdout);
  });

  const result = await fs.readFile(path.resolve(cwd(), tempOutputPath), "utf8");
  const jsonString = parseJsonString(result);
  console.log(jsonString);
  try {
    await fs.writeFile(
      path.resolve(cwd(), option.schemaOutput),
      JSON.stringify(jsonString, null, 2)
    );
  } catch (e) {
    console.log(e);
  }
}

async function parseTsconfig(tsconfig: Tsconfig | string): Promise<Tsconfig> {
  if (typeof tsconfig === "string") {
    return await getTsconfig(path.resolve(cwd(), tsconfig));
  }
  return tsconfig;
}

function createTempInputPath(originalPath: string) {
  const parsedPath = path.parse(originalPath);

  return path.join(parsedPath.dir, "..", "temp_template", parsedPath.base);
}

function createTempOutputPath(originalPath: string) {
  const parsedPath = path.parse(originalPath);

  return path.join(parsedPath.dir, "..", "temp_schema", parsedPath.base);
}

function createImportPath(currentFile: string, targetFile: string) {
  let relativePath = path.relative(path.dirname(currentFile), targetFile);

  // 같은 디렉토리일 경우, './'을 경로 앞에 추가
  if (!relativePath.startsWith(".")) {
    relativePath = "./" + relativePath;
  }

  relativePath = relativePath.replace(path.extname(relativePath), "");

  return relativePath;
}

function parseJsonString(input: string): string {
  const startInex = input.indexOf("({");
  const endIndex = input.lastIndexOf("});");
  const matchString = input
    .slice(startInex + 1, endIndex + 1)
    .replace(/\s+/g, "");

  if (!matchString) {
    throw new Error("Error: No JSON object found in the input string.");
  }
  return JSON.parse(matchString);
}
