import React from "react";

interface Props {
  name: string;
  age: number;
}

const ComponentWithInterface: React.FC<Props> = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
      <p>{props.age}</p>
    </div>
  );
};

export default ComponentWithInterface;
