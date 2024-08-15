import typia from "typia";
import { ComponentSchema } from "../../../@types/component-schema";

const componentSchema = typia.json.application<[ComponentSchema]>();
export default function AdminPage() {
  console.log(componentSchema);

  return <div>{typia.json.stringify(componentSchema)} admin page</div>;
}
