"use client";
import { useAction } from "@/modules/core/hook/useAction";

export default function ActionButton(props: {
  name: string;
  /** @example hi-action */
  action: string;
  event?: {
    onClick?: string;
    onMouseOver?: string;
  };
}) {
  const action = useAction(props.action);

  const handleClick = () => {
    if (action) {
      action(props.name);
    } else {
      console.warn("Action function is not loaded yet.");
    }
  };

  const handleMouseOver = () => {
    if (action) {
      action(props.name);
    } else {
      console.warn("Action function is not loaded yet.");
    }
  };

  return (
    <button onClick={handleClick} onMouseOver={handleMouseOver}>
      {props.name}
    </button>
  );
}
