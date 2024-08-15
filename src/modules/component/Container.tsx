export default function Container({
  children,
  direction = "row",
  gap = 0,
  padding = 0,
}: {
  children: React.ReactNode;
  direction?: "row" | "column";
  gap: number;
  padding?: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: direction,
        gap,
        padding,
      }}
    >
      {children}
    </div>
  );
}
