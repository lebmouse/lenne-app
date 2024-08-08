export interface RenderData {
  id: string;
  type: string;
  props: Record<string, unknown>;
  events?: Record<string, Record<string, unknown>>;
  children?: RenderData[] | RenderData | undefined;
}

export async function Render(props: { renderValue?: RenderData }) {
  const { renderValue } = props;
  if (!renderValue) return null;
  const RenderItem = (await import(`../component/${renderValue.type}`)).default;
  try {
    const { children, props, events } = renderValue;
    const renderItemProps = { ...props, events };
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
