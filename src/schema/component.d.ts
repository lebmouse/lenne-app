interface ActionButtonComponent {
  name: "ActionButton";
  props: {
    name: string;
    /** @example hi-action */
    action: string;
    event?: {
      onClick?: string;
      onMouseOver?: string;
    };
  };
}

interface CardComponent {
  name: "Card";
  props: { name: string; age: number };
}

interface Card2Component {
  name: "Card2";
  props: { name: string; age: number };
}

interface Card3Component {
  name: "Card3";
  props: { name: string; age: number };
}

interface Card4Component {
  name: "Card4";
  props: { name: string; age: number };
}

interface ContainerComponent {
  name: "Container";
  props: {
    children: React.ReactNode;
    direction?: "row" | "column";
    gap: number;
    padding?: number;
  };
}

interface EventButtonComponent {
  name: "EventButton";
  props: {
    name: string;
    events?: {
      onClick?: { name: string; option?: any };
      onMouseOver?: { name: string; option?: any };
    };
  };
}

interface InputComponent {
  name: "Input";
  props: { name: string };
}

type ComponentType =
  | ActionButtonComponent
  | CardComponent
  | Card2Component
  | Card3Component
  | Card4Component
  | ContainerComponent
  | EventButtonComponent
  | InputComponent;
