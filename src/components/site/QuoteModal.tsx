import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Phone, X } from "lucide-react";
import { useLenis } from "lenis/react";
import { QuoteForm } from "./QuoteForm";
import { Highlight } from "./Highlight";
import { GoogleRatingBadge } from "./GoogleRating";
import { FROM_PRICE, SITE, modalBenefits } from "@/lib/site-data";

/**
 * Two-panel quote modal opened from the header CTA.
 *
 * Left panel sells, right panel converts. The green side carries the form
 * because green is the page's action colour — putting the fields on it makes the
 * whole panel read as one call to action rather than a form on a background.
 *
 * Portalled to <body> so it escapes the header's stacking context, which is
 * fixed and would otherwise clip and out-paint it.
 */
const QuoteModalContext = createContext<{ openQuote: () => void }>({ openQuote: () => {} });

/**
 * Holds the modal open/closed state for the whole page.
 *
 * Every "Get My Fixed Price" below the fold opens this rather than scrolling
 * back to the hero form. Scrolling a visitor to the top of the page to act on a
 * CTA they just read is the longest possible path to a conversion.
 */
export function QuoteModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const value = useMemo(() => ({ openQuote: () => setOpen(true) }), []);

  return (
    <QuoteModalContext.Provider value={value}>
      {children}
      <QuoteModal open={open} onClose={() => setOpen(false)} />
    </QuoteModalContext.Provider>
  );
}

/** `const { openQuote } = useQuoteModal()` in any CTA. */
export function useQuoteModal() {
  return useContext(QuoteModalContext);
}

function QuoteModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  const lenis = useLenis();

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => onClose(), [onClose]);

  // Freeze the page behind the modal and close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
      document.documentElement.style.overflow = "";
    };
  }, [open, close, lenis]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Get a fixed price quote"
          // This element does the scrolling, so it carries data-lenis-prevent —
          // on the inner panel Lenis still swallowed the wheel events and the
          // modal could not be scrolled at all on a short screen.
          data-lenis-prevent
          className="fixed inset-0 z-[300] overflow-y-auto overscroll-contain bg-charcoal/70 backdrop-blur-sm"
        >
          {/* Grid rather than flex + my-auto: a centred flex child taller than the
              viewport gets its top cut off and becomes unreachable. */}
          <div className="grid min-h-full place-items-center p-3 sm:p-6">
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative grid w-full max-w-5xl overflow-hidden rounded-2xl shadow-2xl shadow-black/50 lg:grid-cols-2"
            >
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-charcoal shadow-lg transition-transform duration-300 hover:scale-110"
              >
                <X className="h-5 w-5" />
              </button>

              {/* ---------------- Left: the pitch ----------------
                  A real site photo behind it rather than flat bone. A crew
                  mid-demolition says more than any sentence on it.

                  On a phone this drops BELOW the form. Stacked, the pitch pushed
                  the fields most of a screen down, so someone who tapped a button
                  labelled "Get my fixed price" landed on more marketing instead
                  of the thing they asked for. On desktop the two sit side by side
                  and the order stops mattering. */}
              <div className="relative order-2 overflow-hidden bg-light p-5 sm:p-9 lg:order-1">
                <img
                  src="/images/house-demolition/hero.jpg"
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                {/* White wash rather than charcoal: the site photo still reads as
                    texture underneath, but the panel stays light so it does not
                    fight the green side for attention. */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/92 via-white/94 to-white/97" />

                <div className="relative">
                  {/* Eased tracking below sm — 0.28em across 26 uppercase
                      characters is about 247px, and the panel only offers 256
                      at 320px. */}
                  <p className="text-[0.7rem] font-bold tracking-[0.2em] text-primary uppercase sm:text-xs sm:tracking-[0.28em]">
                    Since 2013 · Melbourne wide
                  </p>

                  <h2 className="font-heading mt-3 text-xl text-light-foreground sm:text-2xl">
                    Melbourne house demolition from{" "}
                    <Highlight tone="green">{FROM_PRICE}</Highlight> — permit, asbestos and all.
                  </h2>

                  <ul className="mt-7 grid gap-4">
                    {modalBenefits.map((b) => (
                      <li key={b.lead} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        </span>
                        <span className="text-sm leading-relaxed text-light-foreground/65">
                          <span className="font-bold text-light-foreground">{b.lead}</span> {b.rest}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <GoogleRatingBadge />
                  </div>

                  <div className="mt-7 border-t border-black/10 pt-6">
                    <p className="text-sm text-light-foreground/65">Rather talk it through?</p>
                    <a
                      href={SITE.phoneHref}
                      className="font-heading mt-1 inline-flex items-center gap-2 text-lg text-light-foreground transition-colors hover:text-primary"
                    >
                      <Phone className="h-4 w-4 shrink-0" />
                      {SITE.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* ---------------- Right: the form ---------------- */}
              {/* p-5 not p-7 below sm: the overlay already spends 24px on its
                  own padding, so at 320px a 28px panel inset left 240px for the
                  fields. */}
              <div className="order-1 bg-primary p-5 pt-16 sm:p-9 sm:pt-16 lg:order-2 lg:pt-9">
                {/* Extra top padding on mobile only: this panel is first when
                    stacked, so it is what the close button sits on top of. */}
                <p className="text-xs font-bold tracking-[0.28em] text-primary-foreground/80 uppercase">
                  Get a quote
                </p>
                <h3 className="font-heading mt-2 text-xl text-primary-foreground sm:text-2xl">
                  Your fixed price, <Highlight tone="white">in 24 hours</Highlight>
                </h3>

                {/* No photos and no comments here: the modal is the quick-capture
                    version, and every extra field costs completions. The hero
                    form carries the full deck version. */}
                <div className="mt-6">
                  <QuoteForm compact tone="onGreen" photos={false} comments={false} />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
