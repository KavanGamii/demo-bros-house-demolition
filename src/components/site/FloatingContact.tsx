import { AnimatePresence, motion } from "framer-motion";
import { Phone } from "lucide-react";
import { SITE } from "@/lib/site-data";
import { usePastHero } from "@/lib/use-past-hero";

/**
 * One floating button: tap it and the phone dials.
 *
 * Hidden until the hero has scrolled past, on the same signal as the sticky
 * quote bar. Over the hero it sat on top of the fold while the hero's own
 * "Call 1800 960 625" button was still on screen — a second copy of the same
 * action, covering the page underneath it.
 *
 * It is an <a href="tel:"> rather than a button with a handler, so it behaves
 * like a phone number should: long-press to copy, and it works with JavaScript
 * off.
 */

export function FloatingContact() {
  const visible = usePastHero();

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={SITE.phoneHref}
          aria-label={`Call ${SITE.phone}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          /* Lifted clear of the sticky quote bar below md. That bar is roughly
             72px tall including its safe-area padding, so this sits above it
             rather than half-buried in it. From md the bar is gone and it drops
             back down. */
          className="fixed right-5 bottom-24 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl shadow-black/30 transition-transform hover:scale-105 md:bottom-5"
        >
          {/* Slow pulse so the button reads as live without nagging. Behind the
              icon and non-interactive, so it never eats the tap. */}
          <span
            aria-hidden="true"
            className="absolute inset-0 animate-ping rounded-full bg-primary opacity-25 [animation-duration:2.6s]"
          />
          <Phone className="relative h-6 w-6" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
