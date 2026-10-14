import { useEffect } from "react";
import { useMatches } from "react-router-dom";

type RouteHandle = {
  title?: string;
};

export function RouteTitle() {
  const matches = useMatches();

  const title = [...matches]
    .reverse()
    .map((match) => (match.handle as RouteHandle | undefined)?.title)
    .find(Boolean);

  useEffect(() => {
    document.title = title ?? "VaultaPass";
  }, [title]);

  return null;
}
