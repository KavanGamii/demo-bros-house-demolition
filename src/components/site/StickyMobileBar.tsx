import { CtaButton } from "./CtaButton";
import { useQuoteModal } from "./QuoteModal";
import { CTA_LABEL } from "@/lib/site-data";

/**
 * Persistent action bar below 768px, per deck build note 8.
 *
 * On a phone the header CTA scrolls out of reach almost immediately and the next
 * one can be a full screen away. This keeps the action the page wants — the
 * quote — permanently within thumb reach. Calling has its own floating button.
 *
 * The page reserves room for it with `pb-*` on <main>, so the bar never sits on
 * top of the last line of the footer.
 */
export function StickyMobileBar() {
  const { openQuote } = useQuoteModal();

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur md:hidden">
      <div className="flex items-center gap-2 px-3 py-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))]">
        <CtaButton size="sm" fullWidth onClick={openQuote} className="h-11 px-3 sm:px-5">
          {CTA_LABEL}
        </CtaButton>
      </div>
    </div>
  );
}
