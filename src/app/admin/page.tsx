import { LeftPanel } from "./LeftPanel";
import { RightPanel } from "./RightPanel";

export default function AdminPage() {
  return (
    <div>
      <h1>AdminPage</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "30% 30% 30%",
          gap: "16px",
        }}
      >
        <LeftPanel />
        <PreviewPanel />
        <RightPanel />
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
