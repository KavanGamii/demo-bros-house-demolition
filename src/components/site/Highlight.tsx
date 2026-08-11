import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Marker-pen highlight behind a phrase.
 *
 * The bar is a separate layer sized to the words and animated from zero width,
 * so it reads as someone drawing over the line rather than a coloured box that
 * was always there. `origin-left` keeps the sweep going left to right.
 */
export function Highlight({
  children,
  className = "",
  delay = 0.25,
  tone = "green",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** `green` on light panels, `white` on the green panel. */
  tone?: "green" | "white";
}) {
  return (
    <span className={`relative inline-block ${className}`}>
      <motion.span
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`absolute inset-x-0 bottom-[0.08em] -z-0 h-[0.62em] origin-left -skew-x-6 rounded-[2px] ${
          tone === "green" ? "bg-primary/25" : "bg-white/30"
        }`}
      />
      <span className="relative z-10">{children}</span>
    </span>
  );
}
