import { ReactNodeTag } from "@/typia/tags";
import { ReactNode } from "react";

export default function Container(props: {
  children?: ReactNode & ReactNodeTag;
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
