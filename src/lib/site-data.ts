// Single-page landing content for Demo Bros — Campaign 1 (Full Home Demolition).
//
// Source of truth: "Demo Bros — Campaign 1 Landing Page Copy Deck v1 (Build ready)".
// Copy here is the deck verbatim, in the deck's page order. Theme, fonts, logo
// and imagery are carried over unchanged from the main demo-bros site.
//
// The deck's argument, from headline to footer: a demolition quote is only a
// price if it covers everything. Ours does — permit, disconnections, asbestos,
// slab and a level block — fixed, in writing, in 24 hours. The section that does
// the selling is §06, the inclusions table.

export const SITE = {
  name: "Demo Bros",
  tagline: "Melbourne house demolition — permit, asbestos and all",
  phone: "1800 960 625",
  phoneHref: "tel:1800960625",
  email: "info@demobros.com.au",
  address: "103/181 Rosamond Rd, Maribyrnong VIC 3032",
};

/**
 * The two "from" prices this page quotes, in one place.
 *
 * Deck build note: the same number set appears in the H1, the price table, the
 * FAQ, the final CTA and the page meta — so they all read from here.
 *
 * !!! INDICATIVE STARTING PRICES — CONFIRM WITH JOHN BEFORE THIS PAGE GOES LIVE !!!
 * Grounded in published 2026 Melbourne guides: full residential demolition runs
 * roughly $15,000–$45,000 (about $40–$105/m²), with a small, clear, asbestos-free
 * block at the bottom of the range and a standard weatherboard around $12k–$18k.
 * The figures below sit at that honest floor. The deck warns a "from" number that
 * is too low just produces angry quote calls and burns the fixed-price promise
 * the whole brand rests on — so swap these for a figure Demo Bros would genuinely
 * honour on a small, clean, easy-access job the moment John confirms it.
 *
 * `from` (the H1 / meta / final-CTA anchor) is the SMALL-home figure.
 */
export const PRICING = {
  small: "$14,900", // small house or unit — 2 br, clear access, no asbestos
  standard: "$18,900", // standard single-storey home — 3 br
} as const;

/** The one figure the H1, meta and final CTA quote — the lowest "from". */
export const FROM_PRICE = PRICING.small;

/** The one button label, used everywhere. Sentence case. */
export const CTA_LABEL = "Get my fixed price";

/* ============================== 01 · HERO ============================== */

export const hero = {
  // No "free quote" pill on this page — the deck had it removed.
  eyebrow: "Fixed price in 24 hours",
  title: `House demolition in Melbourne from ${FROM_PRICE} — permit, asbestos and all.`,
  sub: "Everything from the demolition permit to a clean, level block your builder can start on. Disconnections, asbestos, slab and footings, waste — all inside one fixed price, in writing within 24 hours. Nothing gets added later.",
  /** `icon` is a lucide name resolved in index.tsx, keeping this file pure content. */
  bullets: [
    {
      icon: "plug",
      label: "Permit and all four disconnections handled — power, gas, water, telecommunications",
    },
    { icon: "shield", label: "Asbestos assessed and removed before we start, inside the price" },
    { icon: "layers", label: "Slab and footings out, block left clean and level for the slab" },
    { icon: "file", label: "One fixed price in writing within 24 hours, and it doesn't move" },
  ],
};

/** The hero trust row, carried on the green strip directly under the fold. */
export const greenStripClaims = [
  "4.9 ★ from 54 Google reviews",
  "Family owned since 2013",
  "$20M public liability",
  "VBA registered",
];

/* =========================== 02 · QUOTE FORM =========================== */

export const quoteForm = {
  title: "Get your number",
  lede: "Tell us about the house. Itemised, in writing, within 24 hours.",
  fine: "Free, itemised, no obligation. One quote, one follow-up.",
  /** Sits directly under the submit button, on its own. */
  fineEmphasis: "We do not chase you.",
};

/**
 * "What needs to come out?" — MULTI-SELECT, in exactly this order.
 * The lead record must store every option ticked. `value` travels to GoHighLevel.
 *
 * Shared with the main Demo Bros landing page so both forms hand GoHighLevel the
 * same service slugs. The house-demolition questions this form used to ask —
 * house size, asbestos and start date — are asked on the follow-up call instead.
 */
export const quoteServiceOptions = [
  { value: "strip-out", label: "Strip Out" },
  { value: "partial-demolition", label: "Partial Demolition" },
  { value: "full-home-demolition", label: "Full Home Demolition" },
  { value: "rubbish-removal", label: "Rubbish Removal" },
  { value: "other", label: "Other" },
];

/* =========================== 03 · TRUST STATS =========================== */

export interface HeroStat {
  id: string;
  value: string;
  label: string;
}

/** Real values in the HTML on load. No animating up from zero. */
export const heroStats: HeroStat[] = [
  { id: "rating", value: "4.9", label: "Google rating" },
  { id: "reviews", value: "54", label: "Google reviews" },
  { id: "since", value: "2013", label: "Family owned since" },
  { id: "liability", value: "$20M", label: "Public liability" },
];

/* ========================= 04 · BEFORE AND AFTER ========================= */

/**
 * Proof before persuasion — sits high, straight after the trust bar. The "after"
 * (a flat, clean, empty block) is the whole sell on this page.
 *
 * Each pair is a SINGLE combined image: the house standing on the left half, the
 * cleared level block on the right half, same viewpoint. The page overlays its
 * own BEFORE / AFTER tags on the two halves, so the image carries no text.
 *
 * !!! ILLUSTRATIVE PLACEHOLDERS — SWAP FOR REAL VERIFIED DEMO BROS JOB PHOTOS
 * BEFORE PUBLISH. These three are AI-generated stand-ins that match real
 * knock-down jobs (double-storey, brick and weatherboard homes → cleared, level
 * blocks). The section says "Every one of these is a Demo Bros site", so replace
 * them with genuine before/after photos as soon as they're available — the
 * Deanside knock-down especially.
 */
export interface BeforeAfterPair {
  id: string;
  label: string;
  location: string;
  /** One image, house standing on the left half, cleared block on the right. */
  image: string;
}

export const beforeAfterPairs: BeforeAfterPair[] = [
  {
    id: "weatherboard",
    label: "Weatherboard home → cleared, level block",
    location: "Melbourne",
    image: "/images/before-after/ba-weatherboard.jpg",
  },
  {
    id: "brick-home",
    label: "Brick home → cleared, ready for the slab",
    location: "Melbourne",
    image: "/images/before-after/ba-brick-home.jpg",
  },
  {
    id: "double-storey",
    label: "Double-storey knock-down → level block",
    location: "Melbourne",
    image: "/images/before-after/ba-double-storey.jpg",
  },
];

export const beforeAfterHeading = {
  eyebrow: "Before and after",
  title: "House standing. Block ready. Melbourne jobs.",
  description: "Every one of these is a Demo Bros site.",
};

/* ============================== 05 · PRICE ============================== */

export const pricing = {
  eyebrow: "Up-front pricing",
  title: "What a house demolition actually costs in Melbourne.",
  lede: "Nobody publishes this, which is exactly why it's hard to work out whether you're being quoted fairly. Here's where ours starts.",
  table: [
    {
      job: "Small house or unit",
      how: "2 bedrooms, clear access, no asbestos",
      from: PRICING.small,
    },
    { job: "Standard single-storey home", how: "3 bedrooms", from: PRICING.standard },
    {
      job: "Large or double-storey home",
      how: "More house, more machine time",
      from: "Quoted on the job",
    },
    {
      job: "House with asbestos",
      how: "Assessed first, then priced",
      from: "Quoted after assessment",
    },
    {
      job: "Pool, extra outbuildings or heavy concrete",
      how: "Priced as their own lines",
      from: "Quoted on the job",
    },
  ],
  note: "The bottom three vary too much for a starting number to mean anything, so we don't invent one. They get priced properly, in writing, within 24 hours.",
  factorsTitle: "What moves the price",
  factors: [
    "Size and build. A double-brick home takes longer to bring down than a weatherboard",
    "Asbestos. Anything pre-1990 gets assessed first — it's the single biggest variable on an older house",
    "Access. A narrow street, a tight side boundary or overhead power all change the machine and the method",
    "What else is on the block. Pool, garage, driveway, big trees, retaining walls",
    "What's under the house. A slab, footings and old fill all have to go somewhere",
  ],
  close:
    "All of that gets priced before you commit, not discovered when the machine is already on site.",
  closeEmphasis: "Whatever number comes back, that's the number.",
};

/* ========================= 06 · WHAT'S INCLUDED ========================= */

/**
 * The section that does the selling: the list to hold the other two quotes
 * against. Anything on it that isn't in theirs is a cost that turns up later.
 *
 * !!! CONFIRM WITH JOHN BEFORE PUBLISH: is the asset protection permit genuinely
 * inside the base price (or billed at cost), and is site fencing included as
 * standard? If either is "sometimes", move it to the separately-priced note. The
 * credibility of the whole page rests on this table being exactly true.
 */
export const included = {
  eyebrow: "What's included",
  title: "What's in the price.",
  lede: "Everything below is in the number we quote you. This is the list to hold your other quotes against — anything on it that isn't in theirs is a cost that turns up later.",
  /**
   * The same fourteen inclusions, grouped in the order they happen on a job.
   * Grouping is what lets all fourteen sit side by side instead of in one long
   * column — and the middle group is the "all four disconnections" claim the
   * hero makes, standing on its own where it can be counted.
   */
  groups: [
    {
      label: "Before we start",
      items: [
        { item: "Demolition permit", means: "We coordinate the application, not you" },
        {
          item: "Asset protection permit",
          means: "Council permit protecting kerb, footpath and nature strip",
        },
        { item: "Asbestos assessment", means: "Before the quote is finalised, not on the day" },
        { item: "Neighbour notification", means: "Handled by us, in writing" },
        { item: "Site fencing", means: "Secured for the duration" },
      ],
    },
    {
      label: "All four disconnections",
      items: [
        { item: "Power disconnection", means: "Arranged and confirmed before we start" },
        { item: "Gas disconnection", means: "Arranged and confirmed before we start" },
        { item: "Water disconnection", means: "Arranged and confirmed before we start" },
        { item: "Telecommunications", means: "The one most quotes forget" },
      ],
    },
    {
      label: "On site and handover",
      items: [
        { item: "Licensed asbestos removal", means: "Removed and disposed of properly" },
        { item: "Structural demolition", means: "The house itself" },
        { item: "Slab and footings", means: "Out of the ground, where required" },
        { item: "All waste removed", means: "Sorted and recycled where we can" },
        { item: "Block levelled", means: "Clean and level, ready for your builder" },
      ],
    },
  ],
  close:
    "If something on your block genuinely sits outside that — a pool, a big tree needing an arborist, a retaining wall on the boundary — we price it separately and show it to you as a separate line, before you sign anything. What we don't do is leave it off the quote and mention it later.",
};

/* =============== 07 · THREE QUOTES, THOUSANDS APART =============== */

export const compare = {
  eyebrow: "Comparing quotes",
  title: "Three quotes, thousands apart. Here's what's actually different.",
  body: [
    "If you've collected quotes already, you'll have noticed the spread. Two contractors, same house, and twelve thousand dollars between them.",
    "It's almost never the labour or the machine. It's what each quote quietly leaves out — and you only find out once the job has started and you've got no leverage left.",
  ],
  points: [
    "The permit. Some quotes assume you're organising it. Some assume you already have",
    "Disconnections. Four services, four separate applications, and telecommunications is the one that gets missed",
    "Asbestos. A quote written without an assessment on a pre-1990 house is a quote that will be revised",
    "The slab. “Demolition” sometimes means the house comes down and the concrete stays in the ground. Your builder will find out for you, later",
    "Levelling and fill. A cleared block and a level block are not the same thing",
    "Waste. Tip fees on a house are thousands, and “excluding disposal” is a real line in real quotes",
  ],
  close:
    "Ours is itemised on purpose. Put it next to the other two and you can see exactly where the difference is. If someone's cheaper because they've left the slab in the ground, you deserve to know that before you sign — not after.",
};

/* ============================= 08 · ASBESTOS ============================= */

/**
 * Wording depends on the licence question in the deck's orientation note. If Demo
 * Bros holds the WorkSafe A/B class licence, add "by our own crew". If it's
 * coordinated, this copy is already correct as written.
 */
export const asbestos = {
  eyebrow: "Built before 1990?",
  title: "On an older house, this is the number that moves.",
  body: [
    "If the house went up before 1990, asbestos was standard building material — wall sheeting, eaves, the old vinyl underlay, sometimes the roof. On a demolition it isn't a small detail. It changes the method, the timeline and the price.",
    "Which is exactly why a quote that doesn't mention it isn't finished.",
    "We assess it before your quote is finalised, remove it safely and dispose of it properly — and it sits inside the number you already agreed to, rather than turning up as a variation once the fence is already around your block.",
  ],
  points: [
    "Assessed before the quote, not discovered on the day",
    "Removed and disposed of under licence, with the paperwork to prove it",
    "Priced in from the start, never added later",
  ],
  image: "/images/asbestos/asbestos-removal.jpg",
};

/* ========================= WHO WE WORK WITH ========================= */

/**
 * Four audiences, one word each, drawn as line art.
 *
 * Sits between the price and the timeline: the visitor has just read what it
 * costs, and this answers the next question — whether Demo Bros works with people
 * like them — before they have to ask it.
 *
 * Custom artwork rather than a stock icon set, because these have to carry
 * PEOPLE, not just buildings — a house with someone standing in it reads as
 * "homeowner" in a way that an outline of a house never will. Shared with the
 * main Demo Bros landing page.
 *
 * Filenames are lowercase. Windows serves a path whatever its case; the host this
 * deploys to will not, and a capital letter in a path is a class of bug that only
 * ever shows up in production.
 */
export const audiences = {
  title: "Who we work with",
  items: [
    { image: "/images/audiences/homeowners.png", label: "Homeowners" },
    { image: "/images/audiences/builders.png", label: "Builders" },
    { image: "/images/audiences/developers.png", label: "Developers" },
    { image: "/images/audiences/government.png", label: "Government" },
  ],
};

/* ============================= 09 · TIMELINE ============================= */

/**
 * The most-read section for a knock-down-rebuild homeowner, because their builder
 * has already asked them for a date.
 *
 * !!! CONFIRM WITH JOHN: the durations below are indicative Melbourne figures
 * (published guides say 3–8 weeks first inspection to cleared site, most of it
 * approvals), not Demo Bros' measured averages. Steps 2, 3 and 4 are the ones to
 * check. They also appear in the FAQ answer on timing — change both together.
 *
 * All five steps carry a photo. `image` stays optional in the shape the page
 * reads, so a step can lose its photo without breaking the layout — it renders
 * as text on its own.
 *
 * `short` is the phone line and `detail` the desktop one. They are different
 * sentences on purpose: the compact phone card gives the copy about half a card's
 * width beside the thumbnail, where a three-line paragraph turns a clean row into
 * a block of text. `short` says the same thing in one line and carries the
 * duration with it, since the phone card has no room for the duration chip.
 *
 * Steps 01 and 02 are generated stand-ins shot to match the real library (same
 * overcast Melbourne light, same hi-vis, same suburban brick veneer): a quote on
 * a clipboard in front of the house, and the meters being checked against the
 * permit form. Swap both for real job photos when there are any — nothing in the
 * Demo Bros libraries covered either moment. Steps 03, 04 and 05 are real.
 */
export const timeline = {
  eyebrow: "How long it takes",
  title: "From first call to a block your builder can start on.",
  lede: "The demolition itself is the short part. The approvals are what set your start date, so the sooner they're moving, the sooner your build does.",
  steps: [
    {
      n: "01",
      title: "Quote — within 24 hours",
      detail: "Itemised and fixed, off your photos or a site visit.",
      short: "Itemised and fixed, within 24 hours",
      image: "/images/timeline/01-quote-in-writing.jpg",
      imageAlt: "An itemised Demo Bros demolition quote on a clipboard",
    },
    {
      n: "02",
      title: "Permits and disconnections — 4–6 weeks",
      detail:
        "The longest part, and it's on us. Four service providers and council, all running at once rather than one after the other.",
      short: "Council and all four services — 4–6 weeks",
      image: "/images/timeline/02-permits-disconnections.jpg",
      imageAlt:
        "A Demo Bros supervisor checking a permit form against the electricity, gas and water meters on the side of a Melbourne house, the main fuse pulled and tagged",
    },
    {
      n: "03",
      title: "Asbestos removal, if needed — 1–2 days",
      detail: "Done before the machine arrives, not around it.",
      short: "Before the machine arrives — 1–2 days",
      image: "/images/asbestos/asbestos-removal.jpg",
      imageAlt:
        "A licensed removalist in coveralls and a respirator taking asbestos cement sheeting off a weatherboard house",
    },
    {
      n: "04",
      title: "Demolition — 2–4 days",
      detail: "A standard single-storey home is usually down and gone inside a week.",
      short: "Down and gone in 2–4 days",
      image: "/images/timeline/04-demolition.jpg",
      imageAlt:
        "An excavator taking down a weatherboard house behind orange site fencing on a Melbourne street",
    },
    {
      n: "05",
      title: "Block levelled and handed over",
      detail: "Clean, level, photographed. Your builder starts.",
      short: "Clean, level, photographed",
      image: "/images/knock-down/knock-down-rebuild.jpg",
      imageAlt:
        "A cleared, level block fenced off and ready for the builder, with the excavator parked to one side",
    },
  ],
  close:
    "Tell us the date your builder wants the block and we'll work back from it — or tell you straight away if it can't be done, while you've still got time to move things around.",
};

/* =========================== 10 · HOW IT WORKS =========================== */

export const processSteps = [
  {
    n: "01",
    title: "Tell us about the house",
    detail:
      "Send the form with a few photos, or call. Bigger or trickier blocks get a free site visit.",
  },
  {
    n: "02",
    title: "Your number, in writing",
    detail:
      "Itemised, within 24 hours, with everything from the inclusions list line by line. Nothing to sign.",
  },
  {
    n: "03",
    title: "We handle approvals and disconnections",
    detail:
      "Demolition permit, asset protection permit, power, gas, water and telecommunications. You don't chase anyone.",
  },
  {
    n: "04",
    title: "Asbestos out first",
    detail: "Assessed, removed and documented before demolition starts.",
  },
  {
    n: "05",
    title: "The house comes down",
    detail: "Neighbours notified, site fenced, dust controlled, materials separated for recycling.",
  },
  {
    n: "06",
    title: "Block cleared, levelled, photographed",
    detail:
      "Slab and footings out, waste gone, ground level. Handover documented so there's nothing to argue about.",
  },
];

export const processHeading = {
  eyebrow: "How it works",
  title: "Six steps. We handle the paperwork.",
};

/* ==================== 11 · BUILDERS AND DEVELOPERS ==================== */

export const builders = {
  eyebrow: "Builders and developers",
  title: "Working to a program, not a weekend.",
  lead: "Knock-down rebuilds at volume, multi-unit sites and staged clearances across Melbourne.",
  points: [
    "Tender-ready itemised quotes you can put straight into a feasibility",
    "Program dates committed to and held — your slab pour doesn't move",
    "SWMS, inductions and documented safety system on every site",
    "VBA registered, $20M public liability, certificates on file",
    "Multiple blocks staged so your trades roll from one to the next",
  ],
  image: "/images/knock-down/knock-down-rebuild.jpg",
};

/* ============================ 12 · GUARANTEE ============================ */

export const guarantees = [
  {
    id: "fixed-price",
    title: "If we read the job wrong, that's ours to wear",
    detail: "We quoted it and we assessed it. Getting that right was our job, not yours.",
  },
  {
    id: "approvals",
    title: "Approvals are our problem, not yours",
    detail:
      "Permit, asset protection and all four disconnections. You don't sit on hold to a utility.",
  },
  {
    id: "handover",
    title: "Handover photographed",
    detail:
      "Level block, photographed at handover, so there's never a question about the state we left it in.",
  },
  {
    id: "one-crew",
    title: "One crew, start to finish",
    detail:
      "Nobody gets subcontracted out on the morning. The team that quoted you is the team that turns up.",
  },
];

export const guaranteeHeading = {
  eyebrow: "Fixed price guarantee",
  title: "The number doesn't move.",
  description:
    "No variation once the machine is on site. No “we found something” three days in. No invoice at the end that doesn't match the quote.",
};

/* ============================= 13 · REVIEWS ============================= */

/**
 * Reviews DO NOT loop. Six to eight unique, no duplicates.
 *
 * USE VERIFIED GOOGLE REVIEWS ONLY. TODO before publish: the deck asks for 4–6
 * further demolition/knock-down-specific reviews — prioritise any that mention
 * the permit process being handled, a price that held, or a date the builder was
 * given and got. Only these two are verified from the Google Business Profile.
 */
export const testimonials = [
  {
    name: "Tony Manara",
    role: "Commercial demolition",
    quote:
      "They exceeded all our expectations. Knowledgeable, experienced and had all the necessary equipment to complete the job quickly and efficiently. They took the time to explain the entire process.",
    rating: 5,
  },
  {
    name: "George Toubia",
    role: "Shed demolition",
    quote:
      "The team were professional, efficient and took all necessary safety precautions to ensure the job was done safely. They also left the site clean and tidy, which was much appreciated.",
    rating: 5,
  },
];

export const reviewsHeading = {
  title: "4.9 stars from 54 Melbourne jobs.",
};

/* =========================== 14 · SERVICE AREA =========================== */

export const serviceArea = {
  eyebrow: "Where we work",
  title: "Melbourne wide — and the rest of Victoria too.",
  lede: "Every suburb, inner and outer, north and south of the river. Beyond the metro we cover the whole state — the Peninsula, Geelong and the Surf Coast, Ballarat, Bendigo, Gippsland and the north-east.",
  body: "Tell us where the block is and we'll tell you when we can be there — usually in the same reply as the price.",
};

/* =============================== 15 · FAQ =============================== */

export const faqs = [
  {
    q: "How much does it cost to demolish a house in Melbourne?",
    a: `Ours start at ${FROM_PRICE} for a small home on a clear block with no asbestos. Across Melbourne, full residential demolition generally runs between about $18,000 and $45,000 depending on size, asbestos, access and what else is on the block. What matters more than the headline number is what's inside it — ours includes the permit, all four disconnections, asbestos, the slab and a levelled block. Check the other quotes for the same list.`,
  },
  {
    q: "How long does the whole thing take?",
    a: "The demolition itself is usually under a week for a standard single-storey home. The approvals are the long part — permits and disconnections typically run 4–6 weeks, and we start them the day you accept. Most knock-downs run three to eight weeks end to end. You get the dates with the quote so you can give your builder a straight answer.",
  },
  {
    q: "Do you handle the demolition permit?",
    a: "Yes. The demolition permit and the council asset protection permit are both coordinated by us and included. You don't lodge anything.",
  },
  {
    q: "What about disconnecting power, gas and water?",
    a: "All four — power, gas, water and telecommunications — are arranged and confirmed before we start. Telecommunications is the one most quotes forget, and an un-disconnected service will stop a demolition on the morning.",
  },
  {
    q: "Do you remove asbestos?",
    a: "Yes, and it's assessed before your quote is finalised rather than discovered on the day. It's removed and disposed of under licence with the documentation to prove it, and it sits inside the fixed price.",
  },
  {
    q: "Does the concrete slab come out too?",
    a: "Yes, where it's required — slab and footings out of the ground, not left for your builder to deal with. Worth checking on your other quotes, because “demolition” doesn't always include it.",
  },
  {
    q: "What about the pool, the trees and the driveway?",
    a: "All of it can go. Anything outside the house itself gets priced as its own line so you can see exactly what it costs and decide. Big trees sometimes need council approval or an arborist, and we'll tell you if yours is one of them.",
  },
  {
    q: "Do I need to tell my neighbours?",
    a: "No, we handle the notifications in writing. We also fence the site and keep dust under control, because you still have to live next door to these people after the build.",
  },
  {
    q: "What does the block look like when you're finished?",
    a: "Empty, level and swept, with the waste gone and the ground ready for your builder to set out on. We photograph it at handover.",
  },
  {
    q: "Can my builder start straight after?",
    a: "That's the point. Tell us the date they want it and we work back from that, or tell you early if it can't be met. The handover photos go to you and your builder the same day.",
  },
  {
    q: "Are you licensed and insured?",
    a: "$20M public liability, VBA registered, family owned since 2013. Certificates on request before anything starts.",
  },
];

export const faqHeading = {
  eyebrow: "Questions we get every week",
  title: "The questions we get asked most, starting with the big one.",
};

/* ============================ 16 · FINAL CTA ============================ */

export const finalCta = {
  title: "Get your fixed price.",
  lede: "Send us a few photos of the house and we'll send back an itemised, fixed price within 24 hours — permit, disconnections, asbestos, slab and levelling all listed line by line. Free, no obligation, and it doesn't move after that.",
  body: `House demolition in Melbourne from ${FROM_PRICE}. Block cleared, level and ready for your builder.`,
  fine: "4.9 ★ Google · Family owned since 2013 · $20M public liability · VBA registered",
};

/* ============================== 17 · FOOTER ============================== */

export const footer = {
  coverage:
    "House demolition and residential demolition across Melbourne — every suburb, inner and outer — plus the Peninsula, Geelong, Ballarat, Bendigo and regional Victoria.",
  /** Strip-out / partial traffic leaves this page through the footer. */
  commercial:
    "Only taking part of it down, or stripping out the inside? That's our main line of work — get in touch for a free quote.",
  legal: "Melbourne demolition & strip outs · Licensed and VBA registered · $20M public liability",
};

/* ============================ QUOTE MODAL ============================ */

/** The modal's selling points. `lead` carries the weight, `rest` sits back. */
export const modalBenefits = [
  {
    lead: "Permit and all four disconnections handled",
    rest: "power, gas, water and telecommunications",
  },
  { lead: "Asbestos assessed and removed", rest: "before we start, inside the price" },
  { lead: "Slab and footings out", rest: "block left clean and level for the slab" },
  { lead: "One fixed price in writing in 24 hours", rest: "and it doesn't move" },
];
