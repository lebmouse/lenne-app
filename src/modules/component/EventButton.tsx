"use client";
import { useEvents } from "@/modules/core/hook/useEvents";

export default function EventButton(props: {
  name: string;
  events?: {
    onClick?: { name: string; option?: any };
    onMouseOver?: { name: string; option?: any };
  };
}) {
  const { onClick, onMouseOver } = useEvents(props.events);

  return (
    <button onClick={onClick} onMouseOver={onMouseOver}>
      {props.name}
    </button>
  );
}
