"use client";
import { useState, useEffect } from "react";

export default function ActionButton(props: { name: string; action: string }) {
  const [action, setAction] = useState<((name: string) => void) | null>(null);

  useEffect(() => {
    import(`@/action/${props.action}`)
      .then((module) => {
        setAction(() => module.default);
      })
      .catch((error) => {
        console.error("Failed to load action module:", error);
        setAction(() => null);
      });
  }, [props.action]);

  const handleClick = () => {
    if (action) {
      action(props.name);
    } else {
      console.warn("Action function is not loaded yet.");
    }
  };

  return <button onClick={handleClick}>{props.name}</button>;
}
