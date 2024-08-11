import { describe, expect, it } from "vitest";
import { extractComponentPropsType } from "./extractComponentPropsType.mjs";

function formatCode(code: string) {
  return code
    .replace(/[\r\n]+/g, "") // 모든 줄 바꿈 제거
    .replace(/\s+/g, " ") // 연속된 공백을 하나의 공백으로 치환
    .replace(/\s*({|}|;|:|,)\s*/g, "$1") // 특정 구문자 주변의 공백 제거
    .trim(); // 앞뒤 공백 제거
}

describe("extractComponentPropsType 함수", () => {
  const expectedPropsSource = formatCode("{ name: string; age: number; }");
  it("직접 명시된 props 객체 타입을 추출해야 한다.", async () => {
    const propsSource = extractComponentPropsType({
      source: `
    export default function Card(props: { name: string; age: number; }) {
      return (
        <div>
          <h1>Card2</h1>
          <h2>{props.name}</h2>
          <p>{props.age}</p>
        </div>
      );
    }
            `,
    });

    expect(formatCode(propsSource)).toBe(expectedPropsSource);
  });

  it("해체된 객체 매개변수의 타입을 추출해야 한다.", async () => {
    const propsSource = extractComponentPropsType({
      source: `
      export default function Card({ name, age }: { name: string; age: number; }) {
        return (
          <div>
            <h1>Card2</h1>
            <h2>{name}</h2>
            <p>{age}</p>
          </div>
        );
      }
              `,
    });
    expect(formatCode(propsSource)).toBe(expectedPropsSource);
  });

  it("인터페이스로 정의된 props 타입을 추출해야 한다.", async () => {
    const propsSource = extractComponentPropsType({
      source: `
        interface Props {
            name: string;
            age: number;
        }
      export default function Card(props: Props) {
        return (
          <div>
            <h1>Card2</h1>
            <h2>{props.name}</h2>
            <p>{props.age}</p>
          </div>
        );
      }
              `,
    });
    expect(formatCode(propsSource)).toBe(expectedPropsSource);
  });

  it("타입 별칭(type alias)으로 정의된 props 타입을 추출해야 한다.", async () => {
    const propsSource = extractComponentPropsType({
      source: `
        type Props = {
            name: string;
            age: number;
        };
      export default function Card(props: Props) {
        return (
          <div>
            <h1>Card2</h1>
            <h2>{props.name}</h2>
            <p>{props.age}</p>
          </div>
        );
      }
              `,
    });
    expect(formatCode(propsSource)).toBe(expectedPropsSource);
  });

  it("const를 참조하는 코드의 타입도 추출한다", async () => {
    const propsSource = extractComponentPropsType({
      source: `
      const Card = (props: { name: string; age: number; }) => {
        return (
          <div>
            <h1>Card2</h1>
            <h2>{props.name}</h2>
            <p>{props.age}</p>
          </div>
        );
      };
      export default Card;
    `,
    });
    console.log({ propsSource });
    expect(formatCode(propsSource)).toBe(expectedPropsSource);
  });

  it("function 참조하는 코드의 타입도 추출한다", async () => {
    const propsSource = extractComponentPropsType({
      source: `
      type Props = {
            name: string;
            age: number;
        };
      function Card(props: Props) {
        return (
          <div>
            <h1>Card2</h1>
            <h2>{props.name}</h2>
            <p>{props.age}</p>
          </div>
        );
      }
      export default Card;
    `,
    });
    expect(formatCode(propsSource)).toBe(expectedPropsSource);
  });
});
