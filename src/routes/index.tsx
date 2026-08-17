import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import {
  AlertTriangle,
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
  X,
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
  audiences,
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
 *
 * Two departures from the deck's order:
 *
 * §09 "How long it takes" runs directly after the price and BEFORE the inclusions
 * list. A knock-down-rebuild homeowner arrives with their builder already asking
 * for a date, so the price and the timeline are the two answers they came for —
 * the inclusions list is what they read once those two have landed. "Who we work
 * with" sits between them, answering the question the price prompts next.
 *
 * §10 "How it works" now runs before §08, the asbestos case. Both explain how the
 * job is handled; the six steps are the general answer and asbestos is the
 * specific one, so the general belongs first.
 */
function LandingPage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <TrustStats />
      <BeforeAfter />
      <Price />
      <Audiences />
      <Timeline />
      <Included />
      <CompareQuotes />
      <Process />
      <Asbestos />
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
function HandUnderline({ children }: { children: ReactNode }) {
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
            <span className="rounded-full bg-primary px-2.5 py-1 text-[0.7rem] font-semibold text-primary-foreground sm:py-1.5 sm:text-xs">
              {hero.eyebrow}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            /* 1.875rem = 30px on mobile, stepping up on wider screens. */
            className="font-heading mt-5 text-[1.875rem] leading-[1.13] text-secondary sm:text-[2rem] lg:text-[2.5rem]"
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
            thing on the page, which is exactly where the eye should land.

            Desktop only. Stacked on a phone it sat below the whole hero — six
            fields nobody had scrolled to yet, pushing the proof and the pricing
            further down the page. On mobile the two CTAs and the sticky bar open
            the same form in the modal instead, at the moment it is asked for. */}
        <motion.div
          id="quote-form"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden w-full scroll-mt-24 rounded-xl border border-border bg-light p-5 shadow-2xl shadow-black/10 sm:p-6 md:block lg:scroll-mt-28"
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
        {/* No description line. It read "Every one of these is a Demo Bros site",
            which the pairs below cannot currently back up — they are illustrative
            stand-ins until the real job photos land (see beforeAfterPairs). */}
        <SectionHeading
          align="center"
          eyebrow={beforeAfterHeading.eyebrow}
          title={beforeAfterHeading.title}
        />

        {/* Each pair is a single combined photo — house standing on the left
            half, cleared block on the right. BEFORE (top-left) and AFTER
            (top-right) sit on the two halves; the split is 50/50, so the tags
            land correctly every time, and a green seam marks the divide. */}
        {/* Two up on a phone, so the proof is one glance instead of three
            screens of scrolling. An odd last pair takes the full width rather
            than sitting next to a gap — with three pairs that reads as a 2 + 1.
            At lg the three go across in a row and nothing spans. */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {beforeAfterPairs.map((pair, i) => {
            const isOddLast =
              beforeAfterPairs.length % 2 === 1 && i === beforeAfterPairs.length - 1;

            return (
              <Reveal
                key={pair.id}
                delay={(i % 3) * 0.05}
                className={isOddLast ? "col-span-2 lg:col-span-1" : ""}
              >
                <figure className="h-full overflow-hidden rounded-xl border border-border bg-card">
                  <div className="relative">
                    {/* The full-width card runs a shallower crop — at twice the
                        width of its neighbours a 3:2 frame stood about a third
                        taller than it needed to. 15:7 takes 30% of that height
                        back; from lg it is an ordinary column again, so 3:2. */}
                    <img
                      src={pair.image}
                      alt={`${pair.label} — before on the left, after on the right`}
                      loading="lazy"
                      className={`w-full object-cover ${
                        isOddLast ? "aspect-[15/7] lg:aspect-[3/2]" : "aspect-[3/2]"
                      }`}
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-primary/80"
                    />
                    {/* Tags step down with the cards — at half a phone's width
                        the full-size pair nearly met in the middle. */}
                    <span className="absolute top-2 left-2 rounded-sm bg-charcoal/80 px-1.5 py-0.5 text-[0.55rem] font-bold tracking-[0.12em] text-secondary uppercase backdrop-blur sm:top-3 sm:left-3 sm:px-2.5 sm:py-1 sm:text-[0.65rem] sm:tracking-[0.18em]">
                      Before
                    </span>
                    <span className="absolute top-2 right-2 rounded-sm bg-primary px-1.5 py-0.5 text-[0.55rem] font-bold tracking-[0.12em] text-primary-foreground uppercase sm:top-3 sm:right-3 sm:px-2.5 sm:py-1 sm:text-[0.65rem] sm:tracking-[0.18em]">
                      After
                    </span>
                  </div>
                  <figcaption className="border-t border-border px-3 py-3 sm:px-5 sm:py-4">
                    <span className="font-heading block text-[0.8rem] leading-tight sm:text-base">
                      {pair.label}
                    </span>
                    <span className="mt-1 block text-[0.7rem] text-muted-foreground sm:mt-0.5 sm:text-sm">
                      {pair.location}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
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
          hideDescriptionOnMobile
        />

        {/* Reversed on mobile: the price table comes first, the "what moves the
            price" card second. Stacked the other way round, someone who tapped
            through to a section called "Prices" got a screen of qualifiers and a
            CTA before a single number. Side by side at lg the pair swaps back —
            factors left, table right — where reading order stops mattering. */}
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
                          {/* Marker-pen highlight behind the property name, the
                              same motif the hero uses on the price. Drawn as a
                              hard-edged gradient rather than an absolute bar so a
                              name that wraps gets the mark on both of its lines,
                              and `box-decoration-clone` keeps the padding on each
                              fragment instead of only the first and last. */}
                          <span className="box-decoration-clone bg-linear-to-b from-transparent from-55% to-primary/25 to-55% px-1 text-sm font-bold text-foreground sm:text-base">
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

            {/* Desktop only. On a phone this sat between the table and the
                "what moves the price" card, both of which say the same thing in
                fewer words — the table's own "Quoted on the day" rows and the
                card's factor list. */}
            <p className="mt-5 hidden text-[0.95rem] leading-relaxed text-muted-foreground md:block">
              {pricing.note}
            </p>
          </Reveal>

          <Reveal delay={0.08} className="order-2 lg:order-1">
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

        {/* Desktop only. On a phone this is six lines of qualifier sitting between
            the fourteen inclusions and the CTA — the exceptions matter, but not
            enough to stand between someone who has just read the list and the
            button. The same ground is covered in the FAQ. */}
        <p className="mx-auto mt-6 hidden max-w-3xl text-[0.95rem] leading-relaxed text-muted-foreground md:block">
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
          {/* This card is the section's evidence, so it gets to look like it:
              a charcoal header band over a white body, the way the inclusions
              docket is built, and a lift off the page rather than a hairline
              box that reads as a sidebar. */}
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-xl shadow-black/10">
            <div className="flex items-center gap-2.5 bg-charcoal px-6 py-3.5 sm:px-8">
              <AlertTriangle className="h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
              <p className="text-[0.7rem] font-bold tracking-[0.18em] text-secondary uppercase">
                What gets left out
              </p>
            </div>

            <ul className="grid gap-4 p-6 sm:p-8">
              {compare.points.map((point) => {
                const [head, ...rest] = point.split(". ");
                return (
                  <li key={point} className="flex items-start gap-3">
                    {/* A struck-out mark, not a green bullet. Every line here is
                        something MISSING from a rival quote, and a tick-shaped
                        green dot was reading as a feature list. */}
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                      <X className="h-3 w-3" strokeWidth={3.5} />
                    </span>
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
            {/* 8:5 on a phone, not 4:5 — half the height. A portrait crop at
                full phone width filled the screen on its own, so the removalist
                arrived with no copy either side of him to say what he was doing.
                Landscape keeps the crop readable at half the scroll. */}
            <img
              src={asbestos.image}
              alt="A Demo Bros crew member removing asbestos sheeting before demolition"
              loading="lazy"
              className="aspect-[8/5] w-full object-cover sm:aspect-[4/3] lg:aspect-[4/5]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ========================= WHO WE WORK WITH ========================= */

/**
 * Four audiences, one word each, drawn as line art — ported from the main Demo
 * Bros landing page so the two pages answer "do you work with people like me?"
 * the same way.
 *
 * Sits directly after the price: the visitor has just read the number, and this
 * is the next question they would have asked.
 */
function Audiences() {
  return (
    /* White band between two sections that both sit on the page's bone
       background, with the hairlines top and bottom that every other card-toned
       section on this page uses — white against bone is a two-percent difference
       in lightness, and without the rules the band's edges are guesswork. */
    <section className="border-y border-border bg-card py-12 sm:py-16 lg:py-20">
      <div className="container-wide">
        <h2 className="font-heading text-center text-[1.15rem] sm:text-2xl lg:text-[1.75rem]">
          {audiences.title}
        </h2>

        {/* Hairlines between columns, never at the start of a row. `odd:` clears
            them in the 2-up phone layout; `nth-[4n+1]` clears only the first of
            the four-up row. Getting this wrong leaves a stray rule floating at
            the left edge of the second row. */}
        <div className="mt-8 grid grid-cols-2 sm:mt-12 sm:grid-cols-4">
          {audiences.items.map((a, i) => (
            // The nth-child rules belong on the GRID CHILD, which is Reveal — not
            // the div inside it. Inside the wrapper that div is an only child, so
            // `odd:` would match every time and every column would lose its rule.
            <Reveal
              key={a.label}
              delay={i * 0.06}
              className="border-l border-border odd:border-l-0 sm:odd:border-l sm:nth-[4n+1]:border-l-0"
            >
              <div className="flex flex-col items-center gap-5 px-2 py-6 text-center">
                {/* `alt=""` and aria-hidden on purpose: the word underneath is
                    already the label, so describing the artwork as well would have
                    a screen reader announce every audience twice. */}
                <img
                  src={a.image}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  width={80}
                  height={80}
                  className="h-16 w-16 object-contain opacity-85 sm:h-20 sm:w-20"
                />
                <span className="text-base font-extrabold sm:text-lg lg:text-xl">{a.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================= 09 · TIMELINE ============================= */

/**
 * The most-read section for a knock-down-rebuild homeowner, as five photographic
 * tiles — the same treatment the main site's process band uses.
 *
 * The photograph IS the tile rather than sitting in a white box on top of one.
 * The card-with-a-picture-on-top pattern makes every section on every website
 * look the same and spends half of each tile on chrome; washing the photo down to
 * charcoal and setting the copy into it makes the pictures the design instead of
 * an illustration of it, and the row reads as job site rather than brochure.
 *
 * PHONES get a different card from the same markup — a compact row: small square
 * photo, then the copy beside it. A full-bleed photo with text washed over it is
 * the one layout where, at phone width, neither the picture nor the words get
 * enough room. Restyled at `sm`, not two blocks with one hidden, which would put
 * every step in the document twice.
 *
 * Tile heights are fixed rather than set by an aspect ratio, so the three across
 * and the two below line up instead of the bottom row standing taller.
 */
function Timeline() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container-wide">
        <SectionHeading
          align="center"
          eyebrow={timeline.eyebrow}
          title={timeline.title}
          description={timeline.lede}
          hideDescriptionOnMobile
        />

        {/* Wrapping flex, not a 3-column grid: five cards in a grid leave the
            last row hanging at the left with a hole beside it, where this centres
            the remaining two under the three above them. */}
        <ol className="mt-10 flex flex-wrap justify-center gap-2.5 sm:mt-12 sm:gap-4 lg:gap-5">
          {timeline.steps.map((step, i) => {
            /* "Quote — within 24 hours" → heading plus its own duration chip.
               The em dash is the authored separator in site-data; a step written
               without one (the handover, which has no fixed duration) simply
               gets no chip. */
            const [heading, duration] = step.title.split(" — ");

            /* Three across, then the remainder SHARES the full width rather than
               sitting centred at a third each with a gap at both ends. Five steps
               → 3 + 2 at half width. Derived from the count, so a sixth step
               makes it an even 3 + 3 on its own. */
            const remainder = timeline.steps.length % 3;
            const inLastRow = remainder !== 0 && i >= timeline.steps.length - remainder;
            const lgWidth = inLastRow
              ? remainder === 2
                ? "lg:w-[calc(50%-0.625rem)]"
                : "lg:w-full"
              : "lg:w-[calc(33.333%-0.834rem)]";

            return (
              /* Reveal renders a <div>, and a <div> is not a permitted child of
                 <ol> — it goes inside the item, not around it. */
              <li key={step.n} className={`w-full sm:w-[calc(50%-0.5rem)] ${lgWidth}`}>
                <Reveal delay={(i % 3) * 0.05} className="h-full">
                  <article className="group relative flex h-full items-center gap-3.5 overflow-hidden rounded-xl border border-border bg-card p-3 sm:block sm:h-[17rem] sm:gap-0 sm:border-0 sm:p-0 lg:h-[19rem]">
                    {/* A thumbnail in the flow on a phone; the whole tile from sm.
                        The step number rides on the picture's corner there rather
                        than taking a column of its own. */}
                    <div className="relative h-[5.5rem] w-[5.5rem] shrink-0 overflow-hidden rounded-lg sm:absolute sm:inset-0 sm:h-full sm:w-full sm:rounded-none">
                      {step.image && (
                        <img
                          src={step.image}
                          alt={step.imageAlt}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 sm:group-hover:scale-[1.06]"
                        />
                      )}
                      <span
                        aria-hidden="true"
                        className="absolute top-1.5 left-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-[0.7rem] font-bold text-primary-foreground tabular-nums shadow-md shadow-black/30 ring-1 ring-white/60 sm:hidden"
                      >
                        {step.n}
                      </span>
                    </div>

                    {/* Opaque at the foot, clearing by roughly two thirds up. The
                        copy needs solid ground to sit on; the top of the picture
                        needs to stay a picture. Only exists once the copy is over
                        the photo — on a phone it sits beside it. */}
                    <div className="absolute inset-0 hidden bg-gradient-to-t from-charcoal via-charcoal/80 via-45% to-charcoal/15 sm:block" />

                    {/* The numeral is the loudest thing in the tile, in the
                        display face and brand green. At that size it carries the
                        order on its own — no rail, no chevrons between cards. */}
                    <span
                      aria-hidden="true"
                      className="font-heading absolute top-3 left-4 hidden text-4xl text-primary drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] sm:block lg:text-5xl"
                    >
                      {step.n}
                    </span>

                    {/* Desktop only. On the tile the chip sits on the photo where
                        it costs nothing; in the phone row it was a third column
                        taking width off a title that already had to wrap, so the
                        phone card carries its timing in the `short` line instead. */}
                    {duration && (
                      <span className="absolute top-3 right-3 hidden rounded-full bg-primary px-2.5 py-1 text-[0.7rem] font-bold whitespace-nowrap text-primary-foreground tabular-nums shadow-lg shadow-black/30 sm:block">
                        {duration}
                      </span>
                    )}

                    {/* Thumbnail first, copy second: photo left, text right on a
                        phone. From sm this block lifts out of the row and sits on
                        the foot of the photo instead. */}
                    <div className="min-w-0 flex-1 sm:absolute sm:inset-x-0 sm:bottom-0 sm:flex-none sm:p-5">
                      {/* Green rule that draws itself out on hover — the one piece
                          of movement in the copy, so it reads as a response rather
                          than decoration competing with the image zoom. */}
                      <span
                        aria-hidden="true"
                        className="mb-3 hidden h-0.5 w-8 origin-left bg-primary transition-transform duration-500 group-hover:scale-x-[2.5] sm:block"
                      />
                      {/* The display face at both sizes, charcoal on the white
                          phone card and bone once it sits on the photo. Held to
                          0.85rem on a phone: Akira Expanded is 800 weight, forced
                          uppercase and negatively tracked, so it needs the wider
                          measure the compact row gives it beside the thumbnail. */}
                      <h3 className="font-heading text-[0.85rem] leading-tight text-foreground sm:text-sm sm:leading-snug sm:text-secondary lg:text-base">
                        {heading}
                      </h3>
                      {/* One line on a phone, the deck's full sentence from sm —
                          two different strings, so both are in the markup with
                          one hidden rather than one string truncated by CSS. */}
                      <p className="mt-1.5 text-[0.8rem] leading-snug text-muted-foreground sm:hidden">
                        {step.short ?? step.detail}
                      </p>
                      <p className="mt-2 hidden text-[0.8rem] leading-relaxed text-secondary/75 sm:block lg:text-[0.85rem]">
                        {step.detail}
                      </p>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>
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

/** Seconds each card spends crossing the viewport — the marquee's pace. */
const REVIEW_SECONDS_PER_CARD = 7;

/**
 * Reviews, on a marquee that never stops.
 *
 * The track holds the review list twice over and slides exactly half its own
 * width, so the second copy is under the first at the moment it wraps and there
 * is no seam or snap-back. The list is repeated up to `MIN_CARDS` first,
 * because with only a couple of reviews one copy is narrower than a desktop
 * viewport and the loop would show a gap at the tail.
 *
 * Duration is derived from the card count rather than fixed, so adding reviews
 * makes the belt longer instead of making it faster. It pauses on hover and on
 * keyboard focus, and `motion-reduce` stops it outright.
 */
function Reviews() {
  const MIN_CARDS = 6;
  const copies = Math.max(2, Math.ceil(MIN_CARDS / testimonials.length));
  const half = Array.from({ length: copies }, () => testimonials).flat();
  const track = [...half, ...half];

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
      </div>

      {/* Full-bleed, not inside container-wide: the belt should run off both
          edges of the screen rather than stopping at the text column. */}
      <div className="group marquee-viewport relative mt-10">
        {/* Cards fade into the page edges instead of being cut off mid-word. */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-card to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-card to-transparent sm:w-24" />

        <ul
          className="animate-marquee flex w-max gap-4 group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:animate-none"
          style={{ animationDuration: `${track.length * REVIEW_SECONDS_PER_CARD}s` }}
        >
          {track.map((t, i) => (
            <li
              key={`${t.name}-${i}`}
              /* Only the first copy is read out; the rest are the same words
                 again, and a screen reader should not hear them twice. */
              aria-hidden={i >= testimonials.length ? true : undefined}
              className="w-[280px] shrink-0 sm:w-[360px]"
            >
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
            </li>
          ))}
        </ul>
      </div>

      <div className="container-wide">
        {/* CTA after section 13. */}
        <CtaRow className="mt-10" />
      </div>
    </section>
  );
}

/* =========================== 14 · SERVICE AREA =========================== */

function ServiceArea() {
  return (
    <section className="bg-primary py-12 sm:py-16 lg:py-20">
      <div className="container-wide">
        <SectionHeading
          onGreen
          align="center"
          eyebrow={serviceArea.eyebrow}
          title={serviceArea.title}
          description={serviceArea.lede}
        />
        <Reveal delay={0.06}>
          <p className="mx-auto mt-5 max-w-3xl text-center leading-relaxed text-primary-foreground/90">
            {serviceArea.body}
          </p>
          <p className="mt-8 flex items-center justify-center gap-2 text-sm font-semibold text-primary-foreground">
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
    /* Two across on a phone, one row of flex from sm. Stacked, the pair took two
       full-width bars and a gutter — the quote button and the phone number are
       the same decision offered two ways, so they belong on one line. The mobile
       padding and label size come down to match the half-width cells. */
    <div
      className={`grid grid-cols-2 items-stretch gap-2.5 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-4 ${className}`}
    >
      <CtaButton size="md" onClick={openQuote} className="px-2.5 text-[0.78rem] sm:px-7 sm:text-sm">
        {CTA_LABEL}
      </CtaButton>
      <CtaButton
        href={SITE.phoneHref}
        variant="outline"
        size="md"
        icon={false}
        className="px-2.5 text-[0.78rem] sm:px-7 sm:text-sm"
      >
        <Phone className="mr-1.5 h-4 w-4 shrink-0 sm:mr-2" />
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
