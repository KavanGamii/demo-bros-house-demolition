import { ChevronDown } from "lucide-react";

/**
 * FAQ list built on native <details>/<summary>.
 *
 * Deck build note 4: the first item opens by default, and every answer is in the
 * HTML on load rather than injected on click. That rules out a JS accordion that
 * mounts its panel when you click it — with <details> the answers are in the
 * markup the crawler and the reader both get, and the whole thing still works
 * with JavaScript blocked. `open` on the first item is a plain HTML attribute,
 * so it is true in the server-rendered response too.
 */
export function FaqList({ faqs, light }: { faqs: { q: string; a: string }[]; light?: boolean }) {
  return (
    <div className="w-full">
      {faqs.map((f, i) => (
        <details
          key={f.q}
          open={i === 0}
          className={`group border-b ${light ? "border-light-foreground/15" : "border-border"}`}
        >
          {/* `list-none` plus the ::-webkit-details-marker reset kills the default
              disclosure triangle so the chevron is the only affordance. */}
          <summary
            className={`flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-[0.95rem] leading-snug font-semibold transition-colors hover:text-primary [&::-webkit-details-marker]:hidden sm:py-6 sm:text-lg ${
              light ? "text-light-foreground" : "text-foreground"
            }`}
          >
            {f.q}
            <ChevronDown
              className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <p
            className={`pb-5 text-[0.95rem] leading-relaxed sm:pb-6 sm:text-base ${
              light ? "text-light-foreground/70" : "text-muted-foreground"
            }`}
          >
            {f.a}
          </p>
        </details>
      ))}
    </div>
  );
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
