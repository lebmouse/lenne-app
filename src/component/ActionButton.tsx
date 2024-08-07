"use client";
import openAlert from "@/action/openAlert";

export default async function ActionButton(props: { name: string }) {
  return (
    <button
      onClick={() => {
        openAlert("hello");
      }}
    >
      {props.name}
    </button>
  );
}
