"use client";
import componentJson from "@/schema/component.json";

import { ComboBox, Item } from "@adobe/react-spectrum";
import { componentFormProxy } from "./store";

const schemas = componentJson.components.schemas;

export function LeftPanel() {
  return (
    <div style={{ flex: "1" }}>
      <ComboBox
        label={schemas.ComponentSchema.title}
        items={Object.entries(
          schemas.ComponentSchema.discriminator.mapping
        ).map(([name, $ref]) => ({ id: $ref, name }))}
        onSelectionChange={(key) => {
          if (typeof key === "string") {
            componentFormProxy.ref = key;
          }
        }}
      >
        {(item) => <Item key={item.id}>{item.name}</Item>}
      </ComboBox>
    </div>
  );
}
