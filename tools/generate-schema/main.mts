import { generateSchema } from "./utils.mjs";
import config from "./config.mjs";

(async function main() {
  try {
    await Promise.allSettled(
      config.options.map((option) =>
        generateSchema(option)
          .then((result) => {
            console.log(`generated schema: ${option.typeOutput}`);
            return result;
          })
          .catch((e) => {
            throw e;
          })
      )
    );

    console.log("done all schema generation");
  } catch (e) {
    console.error(e);
  }
})();
