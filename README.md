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