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
    { id: moduleId(), type: "Card", props: { name: "John1", age: 21 } },
    { id: moduleId(), type: "Card2", props: { name: "John2", age: 22 } },
    { id: moduleId(), type: "Card2", props: { name: "John3", age: 23 } },
    { id: moduleId(), type: "Card3", props: { name: "John4", age: 24 } },
    { id: moduleId(), type: "Card3", props: { name: "John5", age: 25 } },
    {
      id: moduleId(),
      type: "Container",
      props: {
        direction: "row",
        gap: 20,
      },
      children: [
        { id: moduleId(), type: "Card", props: { name: "John6", age: 26 } },
        { id: moduleId(), type: "Card3", props: { name: "John8", age: 28 } },
      ],
    },
  ],
};

export default function Index() {
  return (
    <div>
      <h1>Many Card</h1>
      <Render renderValue={data} />
    </div>
  );
}
