/**
 * Google review badge.
 *
 * Shows the real Google Business Profile figures (4.9 from 54 reviews) with
 * Google's own mark and amber review stars, rather than a generic green star —
 * the familiar colours are what make the rating read as verified rather than
 * self-reported. The 4.9 is drawn accurately as a partial fifth star, not
 * rounded up to five.
 */

const RATING = 4.9;
const REVIEW_COUNT = 54;

/** Google's four-colour G. */
export function GoogleG({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>
  );
}

/** Amber review stars with the fractional last star drawn to scale. */
export function GoogleStars({
  rating = RATING,
  className = "h-4 w-4",
}: {
  rating?: number;
  className?: string;
}) {
  const percent = Math.max(0, Math.min(100, (rating / 5) * 100));

  return (
    <span
      className="relative inline-flex shrink-0"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {/* Empty track */}
      <span className="flex gap-0.5 text-black/15">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={className} />
        ))}
      </span>
      {/* Filled overlay, clipped to the score */}
      <span
        className="absolute inset-0 flex gap-0.5 overflow-hidden text-[#FBBC04]"
        style={{ width: `${percent}%` }}
        aria-hidden="true"
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`${className} shrink-0`} />
        ))}
      </span>
    </span>
  );
}

function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

/**
 * Sticky corner badge, pinned bottom-left for the whole scroll.
 *
 * Keeps the strongest piece of proof on screen the entire time, including next
 * to the form and the final CTA. Hidden below `md`, which is exactly where the
 * sticky mobile action bar takes over the bottom of the screen — two fixed
 * elements in the same corner is one too many.
 */
export function GoogleRatingSticky() {
  return (
    <div className="pointer-events-none fixed bottom-5 left-5 z-40 hidden md:block">
      <div className="animate-in fade-in slide-in-from-bottom-2 flex items-center gap-3 rounded-2xl border border-black/10 bg-white py-2.5 pr-5 pl-3 shadow-xl shadow-black/15 duration-700">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/5 bg-white shadow-sm">
          <GoogleG className="h-6 w-6" />
        </span>
        <span className="leading-tight">
          <span className="block text-[0.8rem] font-bold text-[#1A1A1A]">Google Rating</span>
          <span className="mt-0.5 flex items-center gap-1.5">
            <span className="text-[0.9rem] font-bold text-[#E7711B]">{RATING}</span>
            <GoogleStars className="h-[15px] w-[15px]" />
          </span>
          <span className="mt-0.5 block text-[0.7rem] text-black/55">
            Based on {REVIEW_COUNT} reviews
          </span>
        </span>
      </div>
    </div>
  );
}

/**
 * Inline pill for the hero and section headings.
 *
 * Everything steps down below `sm`. Four items plus the word "Google" measured
 * about 290px, which is wider than the content box of a 320px phone — so the
 * pill was the one element pushing the whole page sideways. The word is dropped
 * at that width (the four-colour G says "Google" perfectly well on its own) and
 * the padding, gaps and stars each give up a couple of pixels.
 */
export function GoogleRatingBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 shadow-sm sm:gap-2 sm:px-3 sm:py-1.5 ${className}`}
    >
      <GoogleG className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
      <span className="text-[0.8rem] font-bold text-foreground">{RATING}</span>
      <GoogleStars className="h-3 w-3 sm:h-[13px] sm:w-[13px]" />
      <span className="text-[0.7rem] whitespace-nowrap text-muted-foreground">
        {REVIEW_COUNT} <span className="hidden sm:inline">Google </span>reviews
      </span>
    </span>
  );
}
