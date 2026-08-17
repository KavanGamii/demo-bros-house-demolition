import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Set on charcoal sections so the type flips to bone. */
  onDark?: boolean;
  /**
   * Set on the green (`bg-primary`) sections. Flips the whole heading to white —
   * including the eyebrow, which the `eyebrow` utility paints brand green, and
   * green on green is invisible. That one needs the important modifier because
   * the utility sets `color` itself.
   */
  onGreen?: boolean;
  /**
   * Drops the description below md, for sections where the phone needs to reach
   * the content itself sooner. The heading and eyebrow always stay.
   */
  hideDescriptionOnMobile?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  onDark,
  onGreen,
  hideDescriptionOnMobile = false,
}: SectionHeadingProps) {
  const titleColor = onGreen
    ? "text-primary-foreground"
    : onDark
      ? "text-secondary"
      : "text-foreground";
  const descriptionColor = onGreen
    ? "text-primary-foreground/85"
    : onDark
      ? "text-secondary/70"
      : "text-muted-foreground";

  return (
    <Reveal className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {/* The `eyebrow` utility is fluid — it handles its own narrow-screen
          sizing, so there is nothing to override here but the colour. */}
      <p className={`eyebrow ${onGreen ? "text-primary-foreground/85!" : ""}`}>{eyebrow}</p>
      {/* Display sizes pulled back roughly a third. Oversized Akira was the main
          thing making the page read expensive rather than approachable. */}
      <h2
        className={`font-heading mt-3 text-[1.15rem] sm:text-balance sm:text-2xl lg:text-[1.75rem] ${titleColor}`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-3 text-[0.95rem] leading-relaxed sm:text-base ${descriptionColor} ${
            hideDescriptionOnMobile ? "hidden md:block" : ""
          }`}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
