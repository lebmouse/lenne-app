"use client";
import { useId, useState } from "react";

export default function Input(props: { name: string }) {
  const [value, setValue] = useState("");
  const id = useId();
  const formId = `${props.name}-id`;
  return (
    <label id={formId}>
      <span>{props.name}</span>
      <input
        id={formId}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </label>
  );
}
