import { TextField } from "@adobe/react-spectrum";
import {
  Field,
  FieldPath,
  FieldProps,
  FieldValues,
  ResponseData,
} from "@modular-forms/react";

export function StringField<
  TFieldValues extends FieldValues,
  TResponseData extends ResponseData,
  TFieldName extends FieldPath<TFieldValues>,
>(props: FieldProps<TFieldValues, TResponseData, TFieldName>) {
  return (
    <Field {...props}>
      {(field, fieldProps) => {
        return <TextField value={field.value as any} />;
      }}
    </Field>
  );
}
