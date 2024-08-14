import React from "react";

type Props = {
  name: string;
  age: number;
};

const ComponentWithForwardRef = React.forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    return (
      <div ref={ref}>
        <h1>{props.name}</h1>
        <p>{props.age}</p>
      </div>
    );
  }
);

export default ComponentWithForwardRef;
