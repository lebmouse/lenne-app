"use client";
import componentJson from "@/schema/component.json";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { admin$ } from "./store";
import { Select } from "@/park/select";
import { useState } from "react";
import { Button } from "@/park/button";
import { Flex, Grid } from "styled-system/jsx";

const schemas = componentJson.components.schemas;

const items = Object.entries(schemas.ComponentSchema.discriminator.mapping).map(
  ([name, $ref]) => ({ id: $ref, name })
);

export function SelectComponent() {
  const [value, setValue] = useState<string[]>([]);
  return (
    <Flex gap="2" direction={"column"}>
      <Select.Root
        items={items}
        value={value}
        onValueChange={(details) => {
          setValue(details.value);
        }}
        positioning={{ sameWidth: true }}
      >
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
              {items.map((item) => (
                <Select.Item key={item.id} item={item.id}>
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
      <Grid gridTemplateColumns={"3"} gap="2">
        {items.map((item) => (
          <Button
            key={item.id}
            variant="outline"
            onClick={() => {
              admin$.addTreeItem(null, item.id);
            }}
          >
            {item.name}
          </Button>
        ))}
      </Grid>
    </Flex>
  );
}
