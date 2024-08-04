export default function Card({ name, age }: { name: string; age: number }) {
  return (
    <div
      style={{
        border: "1px solid black",
        padding: "10px",
        borderRadius: "5px",
      }}
    >
      <h1>Card1</h1>
      <h2>{name}</h2>
      <p>{age}</p>
    </div>
  );
}
