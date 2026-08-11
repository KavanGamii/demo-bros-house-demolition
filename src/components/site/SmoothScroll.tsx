import { ReactNode } from "react";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

/** Single-page site — no route changes, so no scroll reset is needed. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.12, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
