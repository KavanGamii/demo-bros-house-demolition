import { AnimatePresence, motion } from "framer-motion";
import { CtaButton } from "./CtaButton";
import { useQuoteModal } from "./QuoteModal";
import { CTA_LABEL } from "@/lib/site-data";
import { usePastHero } from "@/lib/use-past-hero";

/**
 * Full-width quote button pinned to the bottom of the screen on phones, per deck
 * build note 8.
 *
 * It slides up once the hero has scrolled fully out of view. Over the hero it
 * covered the bottom of the fold — the last hero bullet, the trust strip — while
 * the hero's own CTA was still on screen doing the same job. Past that point the
 * page is proof and detail, the original call to action is gone, and there is
 * nothing left competing with it.
 *
 * No panel behind it and no radius: the button IS the bar, edge to edge. The
 * white strip it used to sit on was a second surface announcing itself over the
 * page, and it cost the button width on exactly the screens with least of it.
 *
 * `usePastHero` is shared with the floating call button so the two arrive
 * together — see the hook for why it observes the hero rather than a scroll
 * offset.
 */
export function StickyMobileBar() {
  const visible = usePastHero();
  const { openQuote } = useQuoteModal();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-50 md:hidden"
        >
          <CtaButton
            size="md"
            fullWidth
            onClick={openQuote}
            /* The safe-area inset keeps the label clear of the home indicator on
               a notched iPhone, where the bottom ~34px of the viewport is not
               reliably tappable — and it keeps the green running under it rather
               than leaving a strip of page showing below the bar. */
            className="rounded-none py-4 pb-[calc(1rem+env(safe-area-inset-bottom))] text-[0.95rem] shadow-[0_-8px_24px_rgba(0,0,0,0.18)] active:brightness-95"
          >
            {CTA_LABEL}
          </CtaButton>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
