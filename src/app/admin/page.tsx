import componentJson from "../../schema/component.json";

export default function AdminPage() {
  return (
    <div style={{ display: "flex" }}>
      <LeftPanel />
      <PreviewPanel />
      <RightPanel />
    </div>
  );
}

function LeftPanel() {
  return <div style={{ flex: "1" }}>Left Panel</div>;
}

function PreviewPanel() {
  return <div style={{ flex: "2" }}>Preview Panel</div>;
}

function RightPanel() {
  return <div style={{ flex: "1" }}>Right Panel</div>;
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
