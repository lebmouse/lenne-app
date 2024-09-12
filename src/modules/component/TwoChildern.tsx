import { ReactNodeTag } from "@/typia/tags";
import { ReactNode } from "react";

export default function TwoChildern(props: {
  /**
   * @type {ReactNode}
   */
  children?: ReactNode;
  /**
   * @type {ReactNode}
   */
  twoChildren?: ReactNode;
}) {
  return (
    <div>
      {props.children}
      {props.twoChildren}
    </div>
  );
}
