import { SelectComponent } from "./SelectComponent";
import { ComponentForm } from "./RightPanel";
import { TreeContainer } from "./TreeContainer";
import { css } from "../../../styled-system/css";

export default function AdminPage() {
  return (
    <div>
      <h1>AdminPage</h1>
      <div className={css({ fontSize: "2xl", fontWeight: "bold" })}>
        Hello 🐼!
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "30% 30% 30%",
          gap: "16px",
        }}
      >
        <section>
          <SelectComponent />
          <TreeContainer />
        </section>
        <PreviewPanel />
        <ComponentForm />
      </div>
    </div>
  );
}

function PreviewPanel() {
  return <div style={{ flex: "2" }}>Preview Panel</div>;
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
