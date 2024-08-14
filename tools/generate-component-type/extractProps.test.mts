import { describe, it, expect } from "vitest";
import { extractComponentPropsTypeFromFile } from "./extractProps.mjs";
import path from "path";

function formatCode(code: string | null) {
  return (
    code
      ?.replace(/[\r\n]+/g, "") // 모든 줄 바꿈 제거
      .replace(/\s+/g, " ") // 연속된 공백을 하나의 공백으로 치환
      .replace(/\s*({|}|;|:|,)\s*/g, "$1") // 특정 구문자 주변의 공백 제거
      .trim() ?? ""
  ); // 앞뒤 공백 제거
}

const __dirname = import.meta.dirname;

describe("extractComponentPropsTypeFromFile", () => {
  const expectedPropsSource = formatCode("{ name: string; age: number; }");

  it("인터페이스로 정의된 props 타입을 추출해야 한다.", () => {
    const filePath = path.resolve(
      __dirname,
      "__mocks__/ComponentWithInterface.tsx"
    );
    console.log(filePath);
    const propsType = extractComponentPropsTypeFromFile(filePath);
    console.log(propsType);
    expect(formatCode(propsType)).toBe(expectedPropsSource);
  });

  it("타입 별칭으로 정의된 props 타입을 추출해야 한다.", () => {
    const filePath = path.resolve(
      __dirname,
      "__mocks__/ComponentWithTypeAlias.tsx"
    );
    const propsType = extractComponentPropsTypeFromFile(filePath);
    expect(formatCode(propsType)).toBe(expectedPropsSource);
  });

  it("직접 명시된 props 객체 타입을 추출해야 한다.", () => {
    const filePath = path.resolve(
      __dirname,
      "__mocks__/ComponentWithDirectProps.tsx"
    );
    const propsType = extractComponentPropsTypeFromFile(filePath);
    expect(formatCode(propsType)).toBe(expectedPropsSource);
  });

  it("forwardRef로 정의된 컴포넌트의 props 타입을 추출해야 한다.", () => {
    const filePath = path.resolve(
      __dirname,
      "__mocks__/ComponentWithForwardRef.tsx"
    );
    const propsType = extractComponentPropsTypeFromFile(filePath);
    expect(formatCode(propsType)).toBe(expectedPropsSource);
  });

  it("export default 함수에서 직접 정의된 props 타입을 추출해야 한다.", () => {
    const filePath = path.resolve(
      __dirname,
      "__mocks__/ComponentWithDefaultExport.tsx"
    );
    const propsType = extractComponentPropsTypeFromFile(filePath);
    expect(formatCode(propsType)).toBe(expectedPropsSource);
  });
});
