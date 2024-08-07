# lenne 일지

## 동적 문자열로 서버컴포넌트 사용
```

const data: RenderData = {
  id: "1",
  type: "Container",
  props: {
    direction: "row",
    gap: 40,
    padding: 80,
  },
  children: [
    { id: "2", type: "Card", props: { name: "John", age: 20 } },
    { id: "3", type: "Card", props: { name: "John2", age: 30 } },
  ],
};

const RenderItem = (await import(`../component/${renderValue.type}`)).default;
```

위와 같은 데이터를 사용해서 동적으로 렌더링 시키는게 가능

```
 ✓ Generating static pages (5/5)
 ✓ Collecting build traces    
 ✓ Finalizing page optimization    

Route (app)                              Size     First Load JS
┌ ○ /                                    138 B          87.2 kB
└ ○ /_not-found                          874 B          87.9 kB
+ First Load JS shared by all            87 kB
  ├ chunks/465-3c8c609a03ee62f2.js       31.5 kB
  ├ chunks/f14ca715-be5973fc1a0704a8.js  53.6 kB
  └ other shared chunks (total)          1.86 kB


○  (Static)  prerendered as static content
```

여러 파일을 참조해도 서버 컴포넌트라서 실제 로드 데이터는 차이 안남
```
┌ ○ /                                    142 B          87.2 kB // card 1만
└ ○ /many-card                           142 B          87.2 kB // card 1,2,3


```

## 클라이언트 상태가 있는 컴포넌트 테스트
```tsx
// component/input.tsx
"use client";
import { useId, useState } from "react";

export default function Input(props: { name: string }) {
  const [value, setValue] = useState("");
  const id = useId();
  const formId = `${props.name}-id`;
  return (
    <label id={formId}>
      <span>{props.name}</span>
      <input
        id={formId}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </label>
  );
}
```

입력도 잘 됨

## 컨테이터 100개가 아이템을 1000개로 재귀적 트리로 그림
```tsx
const genData = (count: number): RenderData => {
  if (count === 0) {
    return {
      id: moduleId(),
      type: "Card",
      props: { name: `Last`, age: 0 },
    };
  }
  const children: RenderData[] = range(1000).map((index) => ({
    id: moduleId(),
    type: "Card",
    props: { name: `John${index}`, age: index + 1 },
  }));
  children.push(genData(count - 1));
  return {
    id: moduleId(),
    type: "Container",
    props: {
      direction: "column",
      gap: 40,
      padding: 80,
    },
    children,
  };
};

```

번들 사이즈 없이 잘 그려지고 빌드 속도에도 큰 문제가 없음

## 이벤트가 있는 컴포넌트
```tsx
"use client";
import openAlert from "@/action/openAlert";

export default async function ActionButton(props: { name: string }) {
  return (
    <button
      onClick={() => {
        openAlert("hello");
      }}
    >
      {props.name}
    </button>
  );
}
```
rsc라서 위와 같이 openAlert이 있을 때는 "use client";라고 붙혀야됨
대신 클라이언트 컴포넌트임
```tsx
    {
      id: moduleId(),
      type: "ActionButton",
      props: { name: "openAlert first", onClick: () => console.log("hi") },
    },
```
대신 이벤트 함수를 직접 전달해주면 안되고 다른 방법이 필요함. 다음과 같은 에러가 나옴
```
Error: Event handlers cannot be passed to Client Component props.
  <... name=... onClick={function onClick}>
                        ^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
```

## 비동기 액션
```tsx
const [action, setAction] = useState();
useEffect(() => {
  import(`@/action/${actionName}`)
  .then((value)=> setAction(value.default));
},[actionName])
```
와 같은 방식으로 하면 동적으로 할 수 있음
```
Route (app)                              Size     First Load JS
┌ ○ /                                    628 B          87.7 kB
├ ○ /_not-found                          874 B            88 kB
├ ○ /action-test                         628 B          87.7 kB
├ ○ /many-card                           628 B          87.7 kB
├ ○ /too-many                            628 B          87.7 kB
└ ○ /with-state                          628 B          87.7 kB
```
번들도 그대로임
아쉬운건 use로 하면 깔끔한데 사용하지 말라고 경고를 줌

```tsx
const action = use(import(`@/action/${props.action}`).then((m) => m.default));
// A component was suspended by an uncached promise. 
// Creating promises inside a Client Component or hook is not yet supported, 
// except via a Suspense-compatible library or framework.
```

## 파일 베이스 vs 코드 베이스
- 파일베이스
  - 장점
    - 파일 구조를 강제할 수 있음 : 파일구조로 강제하면 구조파악이 쉬워짐
  - 단점
    - 유연성이 떨어짐
    - 타입안전하게 힘들것 같음
      - 동적으로 가져오거나 코드를 감시해서 생성하게 해야하는데 좀 이상할 것 같음