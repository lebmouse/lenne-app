import React from "react";

const ComponentWithDirectProps = (props: { name: string; age: number }) => {
  return (
    <div>
      <h1>{props.name}</h1>
      <p>{props.age}</p>
    </div>
  );
};

export default ComponentWithDirectProps;
