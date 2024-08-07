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
    {
      id: moduleId(),
      type: "ActionButton",
      props: { name: "openAlert first" },
    },
    {
      id: moduleId(),
      type: "ActionButton",
      props: { name: "openAlert second" },
    },
  ],
};

export default function Index() {
  return (
    <div>
      <h1>Action Test</h1>
      <Render renderValue={data} />
    </div>
  );
}
