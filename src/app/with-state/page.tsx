import { Render, RenderData } from "@/render/Render";
import { nanoid } from "nanoid";

const moduleId = () => nanoid(4);

const data: RenderData = {
  id: moduleId(),
  type: "Container",
  props: {
    direction: "column",
    gap: 40,
    padding: 80,
  },
  children: [
    { id: moduleId(), type: "Input", props: { name: "Foo1" } },
    { id: moduleId(), type: "Input", props: { name: "Foo2" } },
    { id: moduleId(), type: "Input", props: { name: "Foo3" } },
    { id: moduleId(), type: "Input", props: { name: "Foo4" } },
  ],
};

export default function Index() {
  return (
    <div>
      <h1>With State</h1>
      <Render renderValue={data} />
    </div>
  );
}
