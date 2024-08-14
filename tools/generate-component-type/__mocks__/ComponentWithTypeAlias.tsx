import React from "react";

type Props = {
  name: string;
  age: number;
};

const ComponentWithTypeAlias: React.FC<Props> = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
      <p>{props.age}</p>
    </div>
  );
};

export default ComponentWithTypeAlias;
