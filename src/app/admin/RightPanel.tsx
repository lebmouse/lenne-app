"use client";
import { JSONSchema7 } from "json-schema";
import {
  Button,
  ComboBox,
  Form,
  Item,
  NumberField,
  Text,
  TextField,
} from "@adobe/react-spectrum";
import actionSchemas from "@/schema/action.json";
import { useState } from "react";
import { admin$ } from "./store";
import { observer } from "@legendapp/state/react";

export const ComponentForm = observer(function ComponentForm() {
  const compoentSchemas = admin$.selectedComponentSchema.get();
  if (!compoentSchemas) {
    return <div>empty</div>;
  }

  return (
    <div>
      <Form>
        <Text>{compoentSchemas.properties.type.const}</Text>
        <Field schema={compoentSchemas.properties.props} propsName="" />
        <Button variant="cta">저장</Button>
      </Form>
    </div>
  );
});

declare module "json-schema" {
  interface JSONSchema7 {
    isRequired?: boolean;
  }
}

function Field({
  schema,
  propsName,
}: {
  schema: JSONSchema7;
  propsName: string;
}) {
  if (propsName === "events") {
    return <EventForm />;
  }
  if (schema.type === "object") {
    return (
      <ObjectField key={JSON.stringify(schema).slice(10)} schema={schema} />
    );
  }
  if (schema.type === "string") {
    return <TextField label={schema.title} isRequired={schema.isRequired} />;
  }
  if (schema.type === "number") {
    return <NumberField label={schema.title} isRequired={schema.isRequired} />;
  }
  return <div>invalidate field {JSON.stringify(schema)} </div>;
}

function ObjectField({ schema }: { schema: JSONSchema7 }) {
  if (schema.type === "object" && schema.properties !== undefined) {
    return (
      <div>
        {Object.entries(schema.properties).map(([key, value]) => {
          if (typeof value !== "boolean") {
            if (typeof value.title === "undefined") {
              value.title = key;
            }
            if (typeof value.isRequired === "undefined") {
              value.isRequired = schema.required?.includes(key) ?? false;
            }

            return <Field key={key} schema={value} propsName={key} />;
          }
          return <div key={key}>invalide-field(boolean)</div>;
        })}
      </div>
    );
  }
  throw new Error("schema.properties is required");
}

function EventForm() {
  const [key, setKey] = useState<string | undefined>(undefined);
  const [field, setField] = useState<JSONSchema7 | undefined>(undefined);
  return (
    <div>
      <ComboBox
        label={"events"}
        items={Object.entries(
          actionSchemas.components.schemas.ActionSchema.discriminator.mapping
        ).map(([name, $ref]) => ({ id: $ref, name }))}
        onSelectionChange={(key) => {
          // if (typeof key === "string") {
          //   const resovedSchema = resolveRef(key, schemas);
          //   setField(resovedSchema);
          //   setKey(key);
          // }
        }}
      >
        {(item) => <Item key={item.id}>{item.name}</Item>}
      </ComboBox>
      {typeof field?.properties?.option !== "boolean" &&
        typeof field?.properties?.option !== "undefined" && (
          <Field
            propsName={key ?? ""}
            schema={parseOption(field?.properties?.option)}
          />
        )}
    </div>
  );
}

function parseOption(schema: JSONSchema7) {
  if (typeof schema.title === "undefined") {
    schema.title = "option";
  }
  return schema;
}
