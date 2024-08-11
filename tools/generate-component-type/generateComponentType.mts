import fs from "fs-extra";
import path from "node:path";
import { globby } from "globby";
import { extractComponentPropsType } from "./extractComponentPropsType.mjs";
import { cwd } from "node:process";

export async function generateComponentType() {
  const paths = await globby([
    `${path.resolve(cwd(), "src", "component")}/**/*.tsx`,
  ]);

  const sourceList = await Promise.all(
    paths.map(async (filePath) => {
      const source = await fs.readFile(filePath, "utf-8");
      return { filePath, source };
    })
  );

  const propsSourceList = sourceList.map(({ source, filePath }) => ({
    propsSource: extractComponentPropsType({ source }),
    filename: path.basename(filePath, ".tsx"),
  }));

  const componentTypesSource = propsSourceList
    .map(
      ({ filename, propsSource }) =>
        `interface ${filename}Component { name: '${filename}'; props: ${propsSource} }`
    )
    .join("\n\n");

  const componentUnionSource = propsSourceList
    .map(({ filename }) => `${filename}Component`)
    .join(" | ");

  await fs.writeFile(
    path.resolve(cwd(), "src", "schema", "component.d.ts"),
    `${componentTypesSource}\n\nexport type ComponentType = ${componentUnionSource};`
  );
}
