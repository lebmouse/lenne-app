import { SelectComponent } from "./SelectComponent";
import { ComponentForm } from "./SchemaFrom";
import { TreeContainer } from "./TreeContainer";
import { Resizer } from "./Resizer";
import { Box } from "styled-system/jsx";
import { SpectrumProvider } from "./provider";

export default function AdminPage() {
  return (
    <SpectrumProvider>
      <Box h="100vh">
        <Resizer
          leftPannel={
            <section>
              <SelectComponent />
              <TreeContainer />
            </section>
          }
          centerPannel={<PreviewPanel />}
          rightPannel={<ComponentForm />}
        />
      </Box>
    </SpectrumProvider>
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
