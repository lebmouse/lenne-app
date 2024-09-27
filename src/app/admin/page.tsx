import { SelectComponent } from "./SelectComponent";
import { ComponentForm } from "./RightPanel";
import { TreeContainer } from "./TreeContainer";
import { css } from "../../../styled-system/css";
import { Resizer } from "./Resizer";
import { Box, VStack } from "styled-system/jsx";

export default function AdminPage() {
  return (
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
