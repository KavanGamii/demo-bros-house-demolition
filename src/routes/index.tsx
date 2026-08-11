import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import {
  Building2,
  Check,
  Clock,
  FileCheck,
  FileText,
  Handshake,
  HardHat,
  Layers,
  MapPin,
  MessagesSquare,
  Phone,
  Plug,
  ShieldCheck,
  Star,
} from "lucide-react";

/**
 * Hero background: an excavator mid-demolition on a residential block — the one
 * page in the account where the excavator shot belongs.
 *
 * To swap it, change this one path. Another demolition shot that works:
 *   /images/knock-down/knock-down-rebuild.jpg
 */
const HERO_IMAGE = "/images/house-demolition/hero.jpg";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { FaqList, faqJsonLd } from "@/components/site/FaqList";
import { CtaButton } from "@/components/site/CtaButton";
import { QuoteForm } from "@/components/site/QuoteForm";
import { useQuoteModal } from "@/components/site/QuoteModal";
import { FloatingContact } from "@/components/site/FloatingContact";
import { StickyMobileBar } from "@/components/site/StickyMobileBar";
import {
  GoogleG,
  GoogleRatingBadge,
  GoogleRatingSticky,
  GoogleStars,
} from "@/components/site/GoogleRating";

import {
  CTA_LABEL,
  FROM_PRICE,
  SITE,
  asbestos,
  beforeAfterHeading,
  beforeAfterPairs,
  builders,
  compare,
  faqHeading,
  faqs,
  finalCta,
  greenStripClaims,
  guaranteeHeading,
  guarantees,
  hero,
  heroStats,
  included,
  pricing,
  processHeading,
  processSteps,
  quoteForm,
  reviewsHeading,
  serviceArea,
  timeline,
  testimonials,
} from "@/lib/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(faqJsonLd(faqs)) }],
  }),
  component: LandingPage,
});

/**
 * Paid-traffic landing page for Campaign 1 (Full Home Demolition), built to the
 * deck's section order, top to bottom.
 *
 * Deliberately NOT a website: no nav links to leak clicks, no sitemap footer.
 * The section that does the selling is §06, the inclusions table. A CTA repeats
 * after sections 05, 06, 07, 11, 13 and 16.
 */
function LandingPage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <TrustStats />
      <BeforeAfter />
      <Price />
      <Included />
      <CompareQuotes />
      <Asbestos />
      <Timeline />
      <Process />
      <Builders />
      <Guarantee />
      <Reviews />
      <ServiceArea />
      <Faqs />
      <FinalCta />
      <GoogleRatingSticky />
      <FloatingContact />
      <StickyMobileBar />
    </>
  );
}

/* ============================== 01 · HERO ============================== */

const HERO_ICONS: Record<string, typeof Plug> = {
  plug: Plug,
  shield: ShieldCheck,
  layers: Layers,
  file: FileText,
};

/**
 * Highlighted phrase with a hand-drawn underline swoosh, drawn around the price
 * token so the number is the thing the eye lands on.
 */
function HandUnderline({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block whitespace-nowrap text-primary">
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 14"
        preserveAspectRatio="none"
        className="absolute -bottom-1 left-0 h-[0.42em] w-full overflow-visible"
      >
        <motion.path
          d="M3 9.5C34 4.2 74 2.4 116 5.1c28 1.8 52 3.6 81 1.4"
          fill="none"
          stroke="currentColor"
          strokeWidth={4}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.7, ease: "easeOut" }}
        />
      </svg>
    </span>
  );
}

function Hero() {
  const { openQuote } = useQuoteModal();

  /* One source for the headline: the H1 lives in site-data as plain text (it has
     to, because the title tag and meta description quote the same price), and the
     swoosh is drawn around the price token here. */
  const [beforePrice, afterPrice] = hero.title.split(FROM_PRICE);
  const trailingPunctuation = /^\S*/.exec(afterPrice)?.[0] ?? "";
  const restOfTitle = afterPrice.slice(trailingPunctuation.length);

  return (
    <section id="top" className="relative overflow-hidden bg-background">
      {/* Static image, no video: it loads instantly and costs nothing on mobile data. */}
      <img
        src={HERO_IMAGE}
        alt="A Demo Bros excavator mid-demolition on a Melbourne residential block"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Darkest on the left where the copy sits, easing to the right so the
          excavator still reads behind it. */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/92 via-charcoal/72 to-charcoal/45" />

      <div className="container-wide relative z-10 grid items-center gap-10 pt-28 pb-14 lg:grid-cols-2 lg:gap-14  lg:pb-20">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-3"
          >
            <GoogleRatingBadge />
            <span className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">
              {hero.eyebrow}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-heading mt-5 text-[1.55rem] leading-[1.13] text-secondary sm:text-[2rem] lg:text-[2.5rem]"
          >
            {beforePrice}
            <span className="whitespace-nowrap">
              <HandUnderline>{FROM_PRICE}</HandUnderline>
              {trailingPunctuation}
            </span>
            {restOfTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 hidden max-w-xl text-base leading-relaxed text-secondary/85 md:block"
          >
            {hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
          >
            <CtaButton size="md" onClick={openQuote} className="w-full sm:w-auto">
              {CTA_LABEL}
            </CtaButton>
            <CtaButton
              href={SITE.phoneHref}
              variant="outlineLight"
              size="md"
              icon={false}
              className="w-full sm:w-auto"
            >
              <Phone className="mr-2 h-4 w-4" />
              Call {SITE.phone}
            </CtaButton>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 grid max-w-xl gap-3.5 sm:gap-4"
          >
            {hero.bullets.map(({ icon, label }) => {
              const Icon = HERO_ICONS[icon] ?? ShieldCheck;
              return (
                <li key={label} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-black/25 sm:h-11 sm:w-11">
                    <Icon className="h-[18px] w-[18px] sm:h-5 sm:w-5" strokeWidth={2.25} />
                  </span>
                  <span className="text-[0.9rem] leading-snug font-bold text-secondary sm:text-[0.95rem]">
                    {label}
                  </span>
                </li>
              );
            })}
          </motion.ul>
        </div>

        {/* White card against the dark site photography: the highest-contrast
            thing on the page, which is exactly where the eye should land. */}
        <motion.div
          id="quote-form"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full scroll-mt-24 rounded-xl border border-border bg-light p-5 shadow-2xl shadow-black/10 sm:p-6 lg:scroll-mt-28"
        >
          <h2 className="font-heading text-xl text-light-foreground">{quoteForm.title}</h2>
          <p className="mt-1.5 text-sm text-light-foreground/70">{quoteForm.lede}</p>
          <div className="mt-5">
            <QuoteForm compact />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/** The hero trust row, on the green strip directly under the fold. */
function TrustStrip() {
  return (
    <section aria-label="Why Demo Bros" className="bg-primary py-4 lg:py-6">
      <div className="container-wide">
        <ul className="grid grid-cols-2 gap-x-3 gap-y-2.5 text-center sm:gap-x-6 lg:flex lg:flex-wrap lg:items-center lg:justify-center lg:gap-x-10">
          {greenStripClaims.map((claim) => (
            <li
              key={claim}
              className="text-[0.9rem] leading-snug font-bold sm:text-balance text-white sm:text-base lg:text-xl"
            >
              {claim}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* =========================== 03 · TRUST STATS =========================== */

const STAT_ICONS: Record<string, typeof Star> = {
  rating: Star,
  reviews: MessagesSquare,
  since: Handshake,
  liability: ShieldCheck,
};

function TrustStats() {
  return (
    <section className="border-y border-border bg-card py-12 lg:py-14">
      <div className="container-wide">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border lg:grid-cols-4">
          {heroStats.map((s) => {
            const Icon = STAT_ICONS[s.id] ?? Star;
            const isRating = s.id === "rating";
            return (
              <div
                key={s.id}
                className="group flex flex-col items-center justify-center bg-card px-3 py-6 text-center transition-colors duration-300 hover:bg-background sm:px-4"
              >
                <dd className="font-heading text-2xl text-foreground lg:text-3xl">{s.value}</dd>
                {isRating ? (
                  <>
                    <span className="mt-2.5 flex items-center gap-2">
                      <GoogleG className="h-5 w-5" />
                      <GoogleStars className="h-[17px] w-[17px]" />
                    </span>
                    <dt className="mt-2 text-[0.8rem] leading-tight font-medium text-muted-foreground sm:text-sm">
                      {s.label}
                    </dt>
                  </>
                ) : (
                  <dt className="mt-2.5 flex flex-col items-center gap-1.5 text-[0.8rem] leading-tight font-medium text-muted-foreground sm:flex-row sm:gap-2 sm:text-sm">
                    <Icon className="h-5 w-5 shrink-0 text-primary" strokeWidth={2} />
                    {s.label}
                  </dt>
                )}
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}

/* ========================= 04 · BEFORE AND AFTER ========================= */

/**
 * Proof before persuasion — sits high, straight after the trust bar. The "after"
 * (a flat, clean, empty block) is the whole sell on this page.
 */
function BeforeAfter() {
  if (beforeAfterPairs.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container-wide">
        <SectionHeading
          align="center"
          eyebrow={beforeAfterHeading.eyebrow}
          title={beforeAfterHeading.title}
          description={beforeAfterHeading.description}
        />

        {/* Each pair is a single combined photo — house standing on the left
            half, cleared block on the right. BEFORE (top-left) and AFTER
            (top-right) sit on the two halves; the split is 50/50, so the tags
            land correctly every time, and a green seam marks the divide. */}
        <div className="mt-10 grid gap-6 sm:gap-8 lg:grid-cols-3">
          {beforeAfterPairs.map((pair, i) => (
            <Reveal key={pair.id} delay={(i % 3) * 0.05}>
              <figure className="h-full overflow-hidden rounded-xl border border-border bg-card">
                <div className="relative">
                  <img
                    src={pair.image}
                    alt={`${pair.label} — before on the left, after on the right`}
                    loading="lazy"
                    className="aspect-[3/2] w-full object-cover"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-primary/80"
                  />
                  <span className="absolute top-3 left-3 rounded-sm bg-charcoal/80 px-2.5 py-1 text-[0.65rem] font-bold tracking-[0.18em] text-secondary uppercase backdrop-blur">
                    Before
                  </span>
                  <span className="absolute top-3 right-3 rounded-sm bg-primary px-2.5 py-1 text-[0.65rem] font-bold tracking-[0.18em] text-primary-foreground uppercase">
                    After
                  </span>
                </div>
                <figcaption className="border-t border-border px-5 py-4">
                  <span className="font-heading text-base">{pair.label}</span>
                  <span className="mt-0.5 block text-sm text-muted-foreground">
                    {pair.location}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================== 05 · PRICE ============================== */

function Price() {
  return (
    <section
      id="prices"
      className="scroll-mt-24 border-t border-border py-16 lg:scroll-mt-28 lg:py-20"
    >
      <div className="container-wide">
        <SectionHeading
          align="center"
          eyebrow={pricing.eyebrow}
          title={pricing.title}
          description={pricing.lede}
        />

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <Reveal delay={0.05} className="order-1 lg:order-2">
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              <table className="w-full border-collapse text-left">
                <caption className="sr-only">House demolition starting prices in Melbourne</caption>
                <thead>
                  <tr className="border-b border-border">
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-[0.7rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase sm:px-6"
                    >
                      Property
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-right text-[0.7rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase sm:px-6"
                    >
                      From
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pricing.table.map((row) => {
                    const isNumber = row.from.startsWith("$");
                    return (
                      <tr key={row.job} className="border-b border-border last:border-0">
                        <td className="px-4 py-3.5 sm:px-6">
                          <span className="block text-sm font-semibold sm:text-base">
                            {row.job}
                          </span>
                          <span className="mt-0.5 block text-[0.8rem] leading-snug text-muted-foreground">
                            {row.how}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-right align-top sm:px-6">
                          {/* The price is what this section is read for, so the
                              figures get the tinted chip and the heading face —
                              they should be the first thing the eye lands on. */}
                          {isNumber ? (
                            <span className="font-heading inline-flex items-center rounded-md bg-primary/10 px-2.5 py-1 text-base whitespace-nowrap text-primary tabular-nums ring-1 ring-primary/20 sm:text-xl">
                              {row.from}
                            </span>
                          ) : (
                            <span className="text-[0.8rem] font-bold text-muted-foreground sm:text-sm">
                              {row.from}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <p className="mt-5 text-[0.95rem] leading-relaxed text-muted-foreground">
              {pricing.note}
            </p>
          </Reveal>

          <Reveal delay={0.08} className="lg:order-1">
            <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
              <h3 className="font-heading text-lg lg:text-xl">{pricing.factorsTitle}</h3>
              <ul className="mt-5 grid gap-3.5">
                {pricing.factors.map((factor) => (
                  <li
                    key={factor}
                    className="flex items-start gap-3 text-[0.95rem] text-foreground/85"
                  >
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" strokeWidth={2.25} />
                    {factor}
                  </li>
                ))}
              </ul>

              <p className="mt-6 border-t border-border pt-6 leading-relaxed text-muted-foreground">
                {pricing.close}{" "}
                <strong className="font-bold text-foreground">{pricing.closeEmphasis}</strong>
              </p>

              {/* CTA after section 05. */}
              <CtaRow className="mt-7 lg:justify-start" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ========================= 06 · WHAT'S INCLUDED ========================= */

/**
 * The section that does the selling — the inclusions list, as a docket rather
 * than a table.
 *
 * Fourteen items in one column ran the better part of a screen and a half on a
 * phone, and the whole point of the list is that it can be scanned against
 * another quote in one go. Three grouped columns cut the height to about a
 * third without hiding anything: no tabs, no accordion, all fourteen on screen.
 * Below lg the columns stack, and each row keeps its plain-English line, because
 * that line is what a rival quote is missing.
 */
function Included() {
  const total = included.groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <section
      id="included"
      className="scroll-mt-24 border-y border-border bg-card py-16 lg:scroll-mt-28 lg:py-20"
    >
      <div className="container-wide">
        <SectionHeading
          align="center"
          eyebrow={included.eyebrow}
          title={included.title}
          description={included.lede}
        />

        <Reveal delay={0.05}>
          <div className="mx-auto mt-10 max-w-6xl overflow-hidden rounded-xl border border-border bg-background">
            {/* Docket header: the count is the argument — fourteen lines, one price. */}
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-border bg-primary px-5 py-3 text-primary-foreground sm:px-6">
              <p className="font-heading text-sm tracking-wide uppercase sm:text-base">
                {total} inclusions, one fixed price
              </p>
              <p className="text-[0.8rem] font-semibold text-primary-foreground/85">
                Every line below is already in your number
              </p>
            </div>

            {/* gap-px over a border-coloured ground draws the hairline grid, so
                the three groups read as columns of one docket, not three cards. */}
            <div className="grid gap-px bg-border lg:grid-cols-3">
              {included.groups.map((group) => (
                <div key={group.label} className="bg-background">
                  <p className="border-b border-border px-5 py-2.5 text-[0.7rem] font-bold tracking-[0.16em] text-muted-foreground uppercase sm:px-6">
                    {group.label}
                    <span className="ml-2 text-primary">{group.items.length}</span>
                  </p>

                  <ul className="px-5 py-1.5 sm:px-6">
                    {group.items.map((row) => (
                      <li key={row.item} className="flex items-start gap-3 py-2.5">
                        <Check
                          className="mt-[0.15rem] h-4 w-4 shrink-0 text-primary"
                          strokeWidth={3}
                        />
                        <div className="min-w-0">
                          <span className="font-heading block text-[0.9rem] leading-tight">
                            {row.item}
                          </span>
                          <span className="mt-1 block text-[0.78rem] leading-snug text-muted-foreground">
                            {row.means}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <p className="mx-auto mt-6 max-w-3xl text-[0.95rem] leading-relaxed text-muted-foreground">
          {included.close}
        </p>

        {/* CTA after section 06. */}
        <CtaRow className="mt-8" />
      </div>
    </section>
  );
}

/* =============== 07 · THREE QUOTES, THOUSANDS APART =============== */

function CompareQuotes() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container-wide grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <p className="eyebrow">{compare.eyebrow}</p>
            <h2 className="font-heading mt-3 text-xl sm:text-balance sm:text-2xl lg:text-[1.75rem]">
              {compare.title}
            </h2>
            {compare.body.map((para) => (
              <p key={para} className="mt-4 leading-relaxed text-muted-foreground">
                {para}
              </p>
            ))}
            <p className="mt-6 leading-relaxed text-muted-foreground">{compare.close}</p>
            {/* CTA after section 07. */}
            <QuoteCta className="mt-7" />
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
            <p className="text-[0.7rem] font-bold tracking-[0.18em] text-primary uppercase">
              What gets left out
            </p>
            <ul className="mt-5 grid gap-4">
              {compare.points.map((point) => {
                const [head, ...rest] = point.split(". ");
                return (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span className="text-[0.95rem] leading-relaxed text-foreground/85">
                      <strong className="font-bold text-foreground">{head}.</strong>{" "}
                      {rest.join(". ")}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================= 08 · ASBESTOS ============================= */

function Asbestos() {
  return (
    <section className="bg-charcoal py-12 sm:py-16 lg:py-20">
      <div className="container-wide grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <p className="eyebrow">{asbestos.eyebrow}</p>
            <h2 className="font-heading mt-3 text-xl sm:text-balance text-secondary sm:text-2xl lg:text-[1.75rem]">
              {asbestos.title}
            </h2>
            {asbestos.body.map((para) => (
              <p key={para} className="mt-4 leading-relaxed text-secondary/70">
                {para}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.06}>
            <ul className="mt-7 grid gap-3">
              {asbestos.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-[0.95rem] text-secondary/85">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" strokeWidth={2.25} />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-xl border border-white/12">
            <img
              src={asbestos.image}
              alt="A Demo Bros crew member removing asbestos sheeting before demolition"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover sm:aspect-[4/3] lg:aspect-[4/5]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================= 09 · TIMELINE ============================= */

/**
 * The most-read section for a knock-down-rebuild homeowner. A walked rail: it
 * fills with green as the section scrolls past, so progress down the page reads
 * as progress toward a start date.
 */
function Timeline() {
  const trackRef = useRef<HTMLOListElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 75%", "end 60%"],
  });
  const railProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 25, mass: 0.4 });

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container-wide">
        <SectionHeading
          align="center"
          eyebrow={timeline.eyebrow}
          title={timeline.title}
          description={timeline.lede}
        />

        <ol ref={trackRef} className="relative mx-auto mt-12 max-w-2xl">
          <span
            aria-hidden="true"
            className="absolute top-6 bottom-6 left-[1.375rem] w-0.5 -translate-x-1/2 bg-border"
          />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: prefersReducedMotion ? 1 : railProgress }}
            className="absolute top-6 bottom-6 left-[1.375rem] w-0.5 origin-top -translate-x-1/2 bg-primary"
          />

          {timeline.steps.map((step) => (
            <motion.li
              key={step.n}
              initial={prefersReducedMotion ? false : "idle"}
              whileInView="reached"
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex gap-5 pb-9 last:pb-0 sm:gap-6"
            >
              <motion.span
                variants={{
                  idle: { backgroundColor: "rgba(255,255,255,0)", scale: 0.92 },
                  reached: { backgroundColor: "var(--color-primary)", scale: 1 },
                }}
                className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background"
              >
                <motion.span
                  variants={{
                    idle: { color: "var(--color-primary)" },
                    reached: { color: "var(--color-primary-foreground)" },
                  }}
                  className="text-[0.85rem] font-bold tabular-nums"
                >
                  {step.n}
                </motion.span>
              </motion.span>

              <motion.div
                variants={{ idle: { opacity: 0, x: 14 }, reached: { opacity: 1, x: 0 } }}
                className="pt-1.5"
              >
                <h3 className="font-heading text-base sm:text-lg">{step.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">
                  {step.detail}
                </p>
              </motion.div>
            </motion.li>
          ))}
        </ol>

        <p className="mx-auto mt-8 max-w-2xl text-center leading-relaxed text-muted-foreground">
          {timeline.close}
        </p>
      </div>
    </section>
  );
}

/* =========================== 10 · HOW IT WORKS =========================== */

/** Six numbered step cards on white — a visible sequence, not plain text blocks. */
function Process() {
  return (
    <section className="border-y border-border bg-card py-12 sm:py-16 lg:py-20">
      <div className="container-wide">
        <SectionHeading
          align="center"
          eyebrow={processHeading.eyebrow}
          title={processHeading.title}
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, i) => (
            <Reveal key={step.n} delay={(i % 3) * 0.05}>
              <article className="flex h-full flex-col rounded-xl border border-border bg-background p-6 transition-colors duration-300 hover:border-primary/50">
                <span className="font-heading text-2xl text-primary">{step.n}</span>
                <h3 className="font-heading mt-3 text-base sm:text-lg">{step.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">
                  {step.detail}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==================== 11 · BUILDERS AND DEVELOPERS ==================== */

function Builders() {
  return (
    <section id="trade" className="scroll-mt-24 py-12 sm:py-16 lg:scroll-mt-28 lg:py-20">
      <div className="container-wide grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <p className="eyebrow">{builders.eyebrow}</p>
            <h2 className="font-heading mt-3 text-xl sm:text-balance sm:text-2xl lg:text-[1.75rem]">
              {builders.title}
            </h2>
            <p className="mt-5 text-lg font-bold text-foreground">{builders.lead}</p>
          </Reveal>

          <Reveal delay={0.06}>
            <ul className="mt-7 grid gap-3">
              {builders.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-[0.95rem] text-foreground/85"
                >
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" strokeWidth={2.25} />
                  {point}
                </li>
              ))}
            </ul>

            {/* CTA after section 11. */}
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <QuoteCta />
              <CtaButton href={SITE.phoneHref} variant="outline" size="md" icon={false}>
                <Phone className="mr-2 h-4 w-4" />
                Call {SITE.phone}
              </CtaButton>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:order-first">
          <div className="overflow-hidden rounded-xl border border-border">
            <img
              src={builders.image}
              alt="A Demo Bros excavator working a knock-down rebuild site"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="flex items-center gap-3 border-t border-border bg-card px-5 py-4">
              <Building2 className="h-5 w-5 shrink-0 text-primary" strokeWidth={2} />
              <span className="text-sm font-semibold">
                SWMS and inductions on every site · program dates held
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================ 12 · GUARANTEE ============================ */

const GUARANTEE_ICONS: Record<string, typeof FileCheck> = {
  "fixed-price": FileCheck,
  approvals: HardHat,
  handover: ShieldCheck,
  "one-crew": Handshake,
};

function Guarantee() {
  return (
    <section className="bg-charcoal py-12 sm:py-16 lg:py-20">
      <div className="container-wide">
        <SectionHeading
          onDark
          align="center"
          eyebrow={guaranteeHeading.eyebrow}
          title={guaranteeHeading.title}
          description={guaranteeHeading.description}
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {guarantees.map((g, i) => {
            const Icon = GUARANTEE_ICONS[g.id] ?? ShieldCheck;
            return (
              <Reveal key={g.id} delay={(i % 2) * 0.05}>
                <article className="flex h-full gap-3.5 rounded-xl border border-white/10 bg-white/[0.04] p-5 transition-colors duration-300 hover:border-primary/50 sm:gap-4 sm:p-6">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground sm:h-11 sm:w-11">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <div>
                    <h3 className="font-heading text-base text-secondary">{g.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-secondary/70">{g.detail}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================= 13 · REVIEWS ============================= */

function Reviews() {
  return (
    <section
      id="reviews"
      className="scroll-mt-24 border-y border-border bg-card py-16 lg:scroll-mt-28 lg:py-20"
    >
      <div className="container-wide">
        <div className="flex flex-col items-center text-center">
          <GoogleRatingBadge />
          <h2 className="font-heading mt-4 max-w-2xl text-xl sm:text-balance sm:text-2xl lg:text-[1.75rem]">
            {reviewsHeading.title}
          </h2>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 2) * 0.05}>
              <figure className="flex h-full flex-col rounded-xl border border-border bg-background p-5 sm:p-6">
                <div aria-label={`${t.rating} out of 5 stars`} className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star
                      key={s}
                      className="h-4 w-4 text-[#FBBC04]"
                      fill="currentColor"
                      strokeWidth={0}
                    />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/85">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-2.5 text-sm">
                  <GoogleG className="h-4 w-4 shrink-0" />
                  <span>
                    <span className="block font-semibold">{t.name}</span>
                    <span className="text-muted-foreground">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* CTA after section 13. */}
        <CtaRow className="mt-10" />
      </div>
    </section>
  );
}

/* =========================== 14 · SERVICE AREA =========================== */

function ServiceArea() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container-wide">
        <SectionHeading
          align="center"
          eyebrow={serviceArea.eyebrow}
          title={serviceArea.title}
          description={serviceArea.lede}
        />
        <Reveal delay={0.06}>
          <p className="mx-auto mt-5 max-w-3xl text-center leading-relaxed text-muted-foreground">
            {serviceArea.body}
          </p>
          <p className="mt-8 flex items-center justify-center gap-2 text-sm font-semibold text-primary">
            <MapPin className="h-4 w-4 shrink-0" />
            Melbourne metro and Victoria wide
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* =============================== 15 · FAQ =============================== */

function Faqs() {
  return (
    <section
      id="faqs"
      className="scroll-mt-24 border-t border-border py-16 lg:scroll-mt-28 lg:py-20"
    >
      <div className="container-wide max-w-3xl">
        <SectionHeading align="center" eyebrow={faqHeading.eyebrow} title={faqHeading.title} />
        <div className="mt-8">
          <FaqList faqs={faqs} />
        </div>
      </div>
    </section>
  );
}

/* ============================ 16 · FINAL CTA ============================ */

function FinalCta() {
  const { openQuote } = useQuoteModal();

  return (
    <section className="bg-primary py-12 sm:py-16 lg:py-20">
      <div className="container-wide text-center">
        <h2 className="font-heading mx-auto max-w-2xl text-2xl sm:text-balance text-primary-foreground sm:text-3xl lg:text-4xl">
          {finalCta.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/90">{finalCta.lede}</p>
        <p className="mx-auto mt-3 max-w-2xl font-bold text-primary-foreground">{finalCta.body}</p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <CtaButton variant="solidLight" size="md" onClick={openQuote}>
            {CTA_LABEL}
          </CtaButton>
          <CtaButton href={SITE.phoneHref} variant="outlineLight" icon={false} size="md">
            <Phone className="mr-2 h-4 w-4" />
            Call {SITE.phone}
          </CtaButton>
        </div>

        <p className="mt-6 flex items-center justify-center gap-1.5 text-sm text-primary-foreground/85">
          <Clock className="h-4 w-4 shrink-0" />
          {finalCta.fine}
        </p>
      </div>
    </section>
  );
}

/* ------------------------------ shared ------------------------------ */

/** Repeated mid-page nudge back to the form — the only exit a landing page wants. */
function CtaRow({ className = "" }: { className?: string }) {
  const { openQuote } = useQuoteModal();

  return (
    <div className={`flex flex-wrap items-center justify-center gap-4 ${className}`}>
      <CtaButton size="md" onClick={openQuote}>
        {CTA_LABEL}
      </CtaButton>
      <CtaButton href={SITE.phoneHref} variant="outline" size="md" icon={false}>
        <Phone className="mr-2 h-4 w-4" />
        Call {SITE.phone}
      </CtaButton>
    </div>
  );
}

/** Single-button variant for left-aligned copy blocks. */
function QuoteCta({ className = "" }: { className?: string }) {
  const { openQuote } = useQuoteModal();

  return (
    <CtaButton size="md" className={className} onClick={openQuote}>
      {CTA_LABEL}
    </CtaButton>
  );
}
