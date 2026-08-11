import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Set on charcoal sections so the type flips to bone. */
  onDark?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  onDark,
}: SectionHeadingProps) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {/* The `eyebrow` utility is fluid — it handles its own narrow-screen
          sizing, so there is nothing to override here. */}
      <p className="eyebrow">{eyebrow}</p>
      {/* Display sizes pulled back roughly a third. Oversized Akira was the main
          thing making the page read expensive rather than approachable. */}
      <h2
        className={`font-heading mt-3 text-[1.15rem] sm:text-balance sm:text-2xl lg:text-[1.75rem] ${
          onDark ? "text-secondary" : "text-foreground"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-3 text-[0.95rem] leading-relaxed sm:text-base ${
            onDark ? "text-secondary/70" : "text-muted-foreground"
          }`}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
