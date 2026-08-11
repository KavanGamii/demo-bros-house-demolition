/**
 * Anchor scrolling for the single-page layout.
 *
 * Lenis owns the scroll position, so `scrollIntoView` fights it and lands in the
 * wrong place. When a Lenis instance is available we hand the target to Lenis;
 * otherwise (SSR hydration gap, reduced motion, Lenis not mounted) we fall back
 * to the native behaviour.
 */

type LenisLike = { scrollTo: (target: HTMLElement, options?: { offset?: number }) => void };

/** Height of the fixed header, so a section never lands underneath it. */
const HEADER_OFFSET = -88;

export function smoothScrollTo(id: string, lenis?: LenisLike | null): void {
  if (typeof document === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;

  if (lenis) {
    lenis.scrollTo(el, { offset: HEADER_OFFSET });
    return;
  }
  window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET,
    behavior: "smooth",
  });
}
