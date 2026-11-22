import type { JSX } from "react";

export function Spinner(): JSX.Element {
  return (
    <span
      aria-hidden="true"
      className="inline-block size-[18px] shrink-0 rounded-full border-2 border-current border-r-transparent motion-safe:animate-spin"
    />
  );
}
