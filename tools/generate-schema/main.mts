import {
  createTempInputPath,
  createTempOutputPath,
  generateSchema,
} from "./utils.mjs";
import config from "./config.mjs";
import { remove, pathExists } from "fs-extra";
import path from "path";
import { cwd } from "process";

(async function main() {
  try {
    await Promise.all(
      config.options.map((option) =>
        generateSchema(option)
          .then((result) => {
            console.log(`generated schema: ${option.typeOutput}`);
            return result;
          })
          .catch((e) => {
            console.error(`${option.typeOutput} error: ${e}`);
          })
      )
    ).finally(() => {
      config.options.map((option) => {
        const tempInputPath = createTempInputPath(option.typeOutput);
        const tempOutputPath = createTempOutputPath(option.typeOutput);
        pathExists(path.resolve(cwd(), path.dirname(tempInputPath))).then(
          (isExists) => {
            if (isExists) {
              remove(path.resolve(cwd(), path.dirname(tempInputPath)));
            }
          }
        );

        pathExists(path.resolve(cwd(), path.dirname(tempOutputPath))).then(
          (isExists) => {
            if (isExists) {
              remove(path.resolve(cwd(), path.dirname(tempOutputPath)));
            }
          }
        );

        // remove(path.resolve(cwd(), path.dirname(tempInputPath)));
        // remove(path.resolve(cwd(), path.dirname(tempOutputPath)));
      });
    });

    console.log("done all schema generation");
  } catch (e) {
    console.error(e);
  }
})();
