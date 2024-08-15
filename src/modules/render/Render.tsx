import type { RenderSchema } from "../../../@types/render-schema";

export async function Render(props: { renderValue?: RenderSchema }) {
  const { renderValue } = props;
  if (!renderValue) return null;
  const RenderItem = (await import(`@/modules/component/${renderValue.type}`))
    .default;
  try {
    const { children, props } = renderValue;
    const renderItemProps = { ...props };
    if (!children) {
      return <RenderItem {...renderItemProps} />;
    }
    if (children instanceof Array && children.length > 0) {
      return (
        <RenderItem {...renderItemProps}>
          {children.map((child) => {
            return <Render key={child.id} renderValue={child} />;
          })}
        </RenderItem>
      );
    } else if (children instanceof Array === false) {
      return (
        <RenderItem {...renderItemProps}>
          <Render renderValue={children} />
        </RenderItem>
      );
    }
  } catch (e) {
    throw e;
  }
}
