import React from "react";

export default function ComponentWithDefaultExport(props: { name: string; age: number }) {
  return (
    <div>
      <h1>{props.name}</h1>
      <p>{props.age}</p>
    </div>
  );
}
