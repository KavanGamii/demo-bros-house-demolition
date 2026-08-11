import { Phone } from "lucide-react";
import { SITE } from "@/lib/site-data";

/**
 * Floating call button.
 *
 * Call is the only channel here, so it dials straight from the button — a
 * popover holding a single option is one tap of friction for nothing.
 */
export function FloatingContact() {
  return (
    /* Lifted clear of the sticky mobile action bar below md, where the two
       would otherwise stack on top of each other in the same corner. */
    <div className="fixed right-5 bottom-[5.25rem] z-50 md:bottom-5">
      <a
        href={SITE.phoneHref}
        aria-label={`Call ${SITE.phone}`}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl shadow-black/30 transition-transform hover:scale-105"
      >
        {/* Slow pulse so the button reads as live without nagging */}
        <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-25 [animation-duration:2.6s]" />
        <Phone className="relative h-6 w-6" />
      </a>
    </div>
  );
}
