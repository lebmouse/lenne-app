"use client";
import { useEffect, useState } from "react";

export function useAction(name: string) {
  const [action, setAction] = useState<((name: string) => void) | null>(null);

  useEffect(() => {
    import(`@/action/${name}`)
      .then((module) => {
        setAction(() => module.default);
      })
      .catch((error) => {
        console.error("Failed to load action module:", error);
        setAction(() => null);
      });
  }, [name]);
  return action;
}
