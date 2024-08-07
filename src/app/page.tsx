import { Render, RenderData } from "@/render/Render";

export default function Index() {
  const data: RenderData = {
    id: "1",
    type: "Container",
    props: {
      direction: "row",
      gap: 40,
      padding: 80,
    },
    children: [
      { id: "2", type: "Card", props: { name: "John", age: 20 } },
      { id: "3", type: "Card", props: { name: "John2", age: 30 } },
    ],
  };
  return (
    <div>
      123
      <Render renderValue={data} />
    </div>
  );
}
