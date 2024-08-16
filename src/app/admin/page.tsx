import { ComponentSchema } from "@/schema/type/component";
import typia from "typia";

const componentSchema = typia.json.application<[ComponentSchema]>();
export default function AdminPage() {
  return (
    <div>
      <JsonViewer value={componentSchema} />
    </div>
  );
}

function JsonViewer(props: { value: unknown }) {
  return (
    <pre
      style={{
        backgroundColor: "#f5f5f5",
        padding: "10px",
        borderRadius: "5px",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        fontSize: "14px",
        lineHeight: "1.6",
      }}
    >
      {formatJson(props.value)}
    </pre>
  );
  function formatJson(json: unknown) {
    return JSON.stringify(json, null, 2);
  }
}
