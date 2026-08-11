import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { Phone } from "lucide-react";
import logoDark from "@/assets/logo-dark.svg";
import logoLight from "@/assets/logo-light.svg";

import { CtaButton } from "./CtaButton";
import { useQuoteModal } from "./QuoteModal";
import { CTA_LABEL, SITE } from "@/lib/site-data";

/**
 * Landing-page header: logo, phone, one CTA. No nav links.
 *
 * Nav is the difference between a website and a landing page — every link is an
 * exit from the only action this page is paid to produce. It also stays put
 * rather than hiding on scroll, so the CTA is always one click away.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  /** Only md and up pins the header; phones scroll it away with the hero. */
  const [pinned, setPinned] = useState(false);
  const lenis = useLenis();
  const { openQuote } = useQuoteModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setPinned(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // On a phone the bar sits over the hero and leaves with it, so it never picks
  // up the solid scrolled treatment — that would flash light as it scrolled off.
  const solid = scrolled && pinned;

  return (
    <header
      className={`absolute inset-x-0 top-0 z-50 border-b transition-colors duration-300 md:fixed ${
        solid ? "border-border bg-background/95 backdrop-blur" : "border-transparent"
      }`}
    >
      <div className="container-wide flex items-center justify-between gap-3 py-2.5 sm:gap-4 sm:py-3">
        <a
          href="#top"
          aria-label="Demo Bros, back to top"
          className="block shrink-0"
          onClick={(e) => {
            e.preventDefault();
            if (lenis) lenis.scrollTo(0);
            else window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          {/* Charcoal wordmark on the light bar, bone wordmark over the dark
              hero — the same logo in one colour would vanish in one of them. */}
          <img
            src={solid ? logoDark : logoLight}
            alt="Demo Bros"
            className="h-14 w-auto sm:h-16 lg:h-20"
            width={334}
            height={330}
          />
        </a>

        <div className="flex items-center gap-3 sm:gap-5">
          <a
            href={SITE.phoneHref}
            className={`flex items-center gap-2 text-sm font-semibold transition-colors hover:text-primary ${
              solid ? "text-foreground" : "text-secondary"
            }`}
          >
            <Phone className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">{SITE.phone}</span>
          </a>
          {/* Opens the quote modal rather than scrolling. From halfway down the
              page, scrolling all the way back up to the hero form was the longest
              path to the only action this page exists for. */}
          {/* Deck note 9: one button label, sentence case, everywhere. */}
          <CtaButton size="sm" onClick={openQuote} className="hidden sm:inline-flex">
            {CTA_LABEL}
          </CtaButton>
        </div>
      </div>
    </header>
  );
}
