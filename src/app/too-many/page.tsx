import { Render, RenderData } from "@/render/Render";
import { range } from "es-toolkit";
import { nanoid } from "nanoid";

const moduleId = () => nanoid(4);

const genData = (count: number): RenderData => {
  if (count === 0) {
    return {
      id: moduleId(),
      type: "Card",
      props: { name: `Last`, age: 0 },
    };
  }
  const children: RenderData[] = range(1000).map((index) => ({
    id: moduleId(),
    type: "Card",
    props: { name: `John${index}`, age: index + 1 },
  }));
  children.push(genData(count - 1));
  return {
    id: moduleId(),
    type: "Container",
    props: {
      direction: "column",
      gap: 40,
      padding: 80,
    },
    children,
  };
};

const data = genData(100);
export default function Index() {
  return (
    <div>
      <h1>Many Card</h1>
      <Render renderValue={data} />
    </div>
  );
}
