"use client";
import componentJson from "@/schema/component.json";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { admin$ } from "./store";
import { Select } from "@/park/select";

const schemas = componentJson.components.schemas;

const items = Object.entries(schemas.ComponentSchema.discriminator.mapping).map(
  ([name, $ref]) => ({ id: $ref, name })
);

export function SelectComponent() {
  return (
    <section>
      <Select.Root positioning={{ sameWidth: true }} width="2xs" items={items}>
        <Select.Label>{schemas.ComponentSchema.title}</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Select a Framework" />
            <ChevronsUpDownIcon />
          </Select.Trigger>
        </Select.Control>
        <Select.Positioner>
          <Select.Content>
            <Select.ItemGroup>
              <Select.ItemGroupLabel>
                {schemas.ComponentSchema.title}
              </Select.ItemGroupLabel>
              {items.map((item) => (
                <Select.Item key={item.id} item={item}>
                  <Select.ItemText>{item.name}</Select.ItemText>
                  <Select.ItemIndicator>
                    <CheckIcon />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.ItemGroup>
          </Select.Content>
        </Select.Positioner>
      </Select.Root>
      {/* <ActionGroup
        items={items}
        UNSAFE_style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "1rem",
        }}
        onAction={(id) => {
          console.log(id);
          if (typeof id === "string") {
            admin$.addTreeItem(null, id);
          }
        }}
      >
        {(item) => <Item key={item.id}>{item.name}</Item>}
      </ActionGroup> */}
    </section>
  );
}
