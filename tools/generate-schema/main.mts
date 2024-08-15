import path from "node:path";
import { cwd } from "node:process";
import { generateSchema, getTsconfig } from "./utils.mjs";
import { actionSchemaTemplate, componentSchemaTemplate } from "./template.mjs";

(async function main() {
  try {
    const tsconfig = await getTsconfig(path.resolve(cwd(), "tsconfig.json"));
    await generateSchema({
      input: "src/modules/component/**/*.tsx",
      tsconfig,
      output: "@types/component-schema/index.d.ts",
      template: componentSchemaTemplate,
    });

    // action schema
    await generateSchema({
      input: "src/modules/action/**/*.ts",
      tsconfig,
      output: "@types/action-schema/index.d.ts",
      template: actionSchemaTemplate,
    });
    console.log("done generating schema");
  } catch (e) {
    console.error(e);
  }
})();
