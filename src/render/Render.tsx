export interface RenderData {
  id: string;
  type: string;
  props: Record<string, unknown>;
  children?: RenderData[] | RenderData;
}

export async function Render(props: { renderValue?: RenderData }) {
  const { renderValue } = props;
  if (!renderValue) return null;
  const RenderItem = (await import(`../component/${renderValue.type}`)).default;
  try {
    const { children } = renderValue;
    if (!children) {
      return <RenderItem {...renderValue.props} />;
    }
    if (children instanceof Array && children.length > 0) {
      return (
        <RenderItem {...renderValue.props}>
          {children.map((child) => {
            return <Render key={child.id} renderValue={child} />;
          })}
        </RenderItem>
      );
    } else if (children instanceof Array === false) {
      return (
        <RenderItem {...renderValue.props}>
          <Render renderValue={children} />
        </RenderItem>
      );
    }
  } catch (e) {
    throw e;
  }
}
