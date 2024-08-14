#!/bin/bash

# 프로젝트 루트 디렉토리 설정
PROJECT_ROOT=$(pwd)
DIST_DIR="$PROJECT_ROOT/tools/generate-component-type/__mocks__"

# 디렉토리 생성
mkdir -p "$DIST_DIR"

# 파일 생성 및 내용 작성
cat <<EOL > "$DIST_DIR/ComponentWithInterface.tsx"
import React from "react";

interface Props {
  name: string;
  age: number;
}

const ComponentWithInterface: React.FC<Props> = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
      <p>{props.age}</p>
    </div>
  );
};

export default ComponentWithInterface;
EOL

cat <<EOL > "$DIST_DIR/ComponentWithTypeAlias.tsx"
import React from "react";

type Props = {
  name: string;
  age: number;
};

const ComponentWithTypeAlias: React.FC<Props> = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
      <p>{props.age}</p>
    </div>
  );
};

export default ComponentWithTypeAlias;
EOL

cat <<EOL > "$DIST_DIR/ComponentWithDirectProps.tsx"
import React from "react";

const ComponentWithDirectProps = (props: { name: string; age: number }) => {
  return (
    <div>
      <h1>{props.name}</h1>
      <p>{props.age}</p>
    </div>
  );
};

export default ComponentWithDirectProps;
EOL

cat <<EOL > "$DIST_DIR/ComponentWithForwardRef.tsx"
import React from "react";

type Props = {
  name: string;
  age: number;
};

const ComponentWithForwardRef = React.forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    return (
      <div ref={ref}>
        <h1>{props.name}</h1>
        <p>{props.age}</p>
      </div>
    );
  }
);

export default ComponentWithForwardRef;
EOL

cat <<EOL > "$DIST_DIR/ComponentWithDefaultExport.tsx"
import React from "react";

export default function ComponentWithDefaultExport(props: { name: string; age: number }) {
  return (
    <div>
      <h1>{props.name}</h1>
      <p>{props.age}</p>
    </div>
  );
}
EOL

echo "Mock files have been created successfully!"
