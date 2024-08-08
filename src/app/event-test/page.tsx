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
      type: "EventButton",
      props: { name: "openAlert(onClick)" },
      events: {
        onClick: { name: "openAlert", option: "hi younggwon" },
      },
    },
    {
      id: moduleId(),
      type: "EventButton",
      props: {
        name: "openConfirm(onClick)+printLog(mouseOver)",
      },
      events: {
        onClick: { name: "openConfirm", option: "hi zero" },
        onMouseOver: { name: "printLog" },
      },
    },
  ],
};

export default function Index() {
  return (
    <div>
      <h1>Event Test</h1>
      <Render renderValue={data} />
    </div>
  );
}
