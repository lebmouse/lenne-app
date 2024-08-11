import { generateComponentType } from "./generateComponentType.mjs";

generateComponentType()
  .then(() => console.log("done"))
  .catch(console.error);
