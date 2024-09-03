"use client";
import componentJson from "@/schema/component.json";

import {
  ActionButton,
  ActionGroup,
  Button,
  ComboBox,
  Flex,
  Grid,
  Item,
  ListView,
  View,
} from "@adobe/react-spectrum";
import { admin$ } from "./store";

const schemas = componentJson.components.schemas;

const items = Object.entries(schemas.ComponentSchema.discriminator.mapping).map(
  ([name, $ref]) => ({ id: $ref, name })
);

export function SelectComponent() {
  return (
    <section>
      <ComboBox
        label={schemas.ComponentSchema.title}
        items={items}
        onSelectionChange={(id) => {
          if (typeof id === "string") {
            admin$.addTreeItem(null, id);
          }
        }}
      >
        {(item) => <Item key={item.id}>{item.name}</Item>}
      </ComboBox>
      <ActionGroup
        items={items}
        UNSAFE_style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "1rem",
        }}
        onAction={(id) => {
          if (typeof id === "string") {
            admin$.addTreeItem(null, id);
          }
        }}
      >
        {(item) => <Item key={item.id}>{item.name}</Item>}
      </ActionGroup>
    </section>
  );
}
