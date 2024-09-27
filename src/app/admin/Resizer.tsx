import { Splitter } from "@/park/splitter";
import { ReactNode } from "react";

export const Resizer = (props: {
  leftPannel: ReactNode;
  centerPannel: ReactNode;
  rightPannel: ReactNode;
}) => {
  return (
    <Splitter.Root
      size={[
        { id: "left", size: 60 },
        { id: "center", size: 40 },
        // { id: "right", size: 30 },
      ]}
      gap="0.5"
    >
      <Splitter.Panel id="left" alignItems="start" justifyContent={"start"}>
        {props.leftPannel}
      </Splitter.Panel>
      <Splitter.ResizeTrigger
        id="left:center"
        minW={"1"}
        transition={"ease-out 0.2s"}
        _hover={{ scaleX: 2 }}
      />
      <Splitter.Panel id="center" alignItems="start" justifyContent={"start"}>
        {props.centerPannel}
      </Splitter.Panel>
      {/* <Splitter.ResizeTrigger
        id="center:right"
        minW={"1"}
        transition={"ease-out 0.2s"}
        _hover={{ scaleX: 2 }}
      />
      <Splitter.Panel id="right" alignItems="start" justifyContent={"start"}>
        {props.rightPannel}
      </Splitter.Panel> */}
    </Splitter.Root>
  );
};
