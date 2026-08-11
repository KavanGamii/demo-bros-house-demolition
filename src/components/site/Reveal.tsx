import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

/**
 * Short scroll-triggered fade.
 *
 * Was a 0.9s weighted reveal over 32px — cinematic, and slow enough that paid
 * traffic scrolls past content before it has arrived. Now a quick 0.4s lift.
 */
export function Reveal({ children, delay = 0, y = 12, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
