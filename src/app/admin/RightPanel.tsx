"use client";
import { JSONSchema7 } from "json-schema";
import { resolveRef } from "./store";
import {
  Button,
  ComboBox,
  Form,
  Item,
  NumberField,
  Text,
  TextField,
} from "@adobe/react-spectrum";
// import { validate } from "typia";
import schemas from "@/schema/action.json";
import { useState } from "react";

export function ComponentForm() {
  if (schemas === undefined) {
    return <div>empty</div>;
  }
  // const validated = validate<{
  //   type: "object";
  //   properties: {
  //     type: { const: string };
  //     props: JSONSchema7;
  //   };
  // }>(schemas);

  // if (validated.success) {
  //   return (
  //     <div>
  //       <Form>
  //         <Text>{validated.data.properties.type.const}</Text>
  //         <Field schema={validated.data.properties.props} propsName="" />
  //         <Button variant="cta">저장</Button>
  //       </Form>
  //     </div>
  //   );
  // }
  // if (validated.errors) {
  //   return <div> {JSON.stringify(validated.errors)}</div>;
  // }

  return (
    <div>
      <h2>rightPanel</h2>
      {JSON.stringify(schemas, null, 2)}
    </div>
  );
}

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
          schemas.components.schemas.ActionSchema.discriminator.mapping
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
