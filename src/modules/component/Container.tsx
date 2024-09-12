import { ReactNode } from "react";

export default function Container(props: {
  /**
   * @type {ReactNode}
   */
  children?: ReactNode;
  title?: string;
  description?: string;
}) {
  return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.description}</p>
      {props.children}
      <Container>5</Container>
    </div>
  );
}
