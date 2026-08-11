# Demo Bros — House Demolition Landing Page

A single-page, paid-traffic landing page for **Google Ads Campaign 1** (full home
demolition / knock-down rebuild). One route (`/`), one buyer — a homeowner doing
a knock-down rebuild who is holding three quotes they can't compare.

It is a **separate project** from `../demo-bros`, `../demo-bros-landing` and
`../demo-bros-rubbish-removal`. Nothing is shared or symlinked; images were
**copied** in (never moved), so those projects are untouched.

## The argument the page makes

A demolition quote is only a price if it covers everything. Ours does — permit,
disconnections, asbestos, slab and a level block — fixed, in writing, in 24
hours. The section that does the selling is **§06, the inclusions table** — the
list to hold the other two quotes against.

## Section order (Campaign 1 deck v1)

hero → green trust strip → trust stats → **before/after (high)** → price
(`#prices`) → **what's included (`#included`, the selling section)** → three
quotes thousands apart → asbestos → timeline → how it works (6 steps) → builders
& developers (`#trade`) → guarantee → reviews → service area → FAQs → final CTA →
footer.

Anchors: `#top`, `#prices`, `#included`, `#trade`.

## What changed for this campaign

- **All copy** is Campaign 1 deck v1, in `src/lib/site-data.ts`.
- **New sections** vs the other pages: the §06 inclusions table (14 items),
  the §07 quote-comparison, and a §09 approvals timeline.
- **Quote form** fields: name, email, phone, **property address**, **what's on
  the block** (multi-select), **house size**, **asbestos**, **start date**,
  photos (front/back/both sides) and comments.
- **No "free quote" pill**, **no videos** (deck rules).

## Before publish — must be supplied / confirmed

- **Prices.** `PRICING` in `src/lib/site-data.ts` holds **indicative Melbourne
  market rates** (small home from $14,900, standard 3-bed from $18,900) grounded
  in published 2026 guides ($15k–$45k range). Confirm a "from" figure Demo Bros
  would genuinely honour on a small, clean, easy-access job and swap it in — the
  H1, table, FAQ, final CTA and meta all read from `FROM_PRICE`.
- **Timeline durations.** The `X–X weeks` / `X days` tokens in `timeline` (and FAQ)
  are placeholders — get Demo Bros' real typical durations for approvals,
  asbestos removal and the demolition itself.
- **Asbestos licence.** Confirm whether Demo Bros holds the WorkSafe A/B class
  licence (in-house) or coordinates a licensed subcontractor. This changes the
  asbestos wording on all three landing pages.
- **Inclusions table.** Confirm the asset protection permit and site fencing are
  genuinely in the base price. If either is "sometimes", move it to the
  separately-priced note. The whole page's credibility rests on this table.
- **Reviews.** Only two verified Google reviews are on the page; add 4–6
  demolition/knock-down-specific ones (verified Google only).
- **Before/after images.** The money shot — a cleared, level block — is not yet
  in the asset library. Only the St Kilda West pair is verified. Add the Deanside
  knock-down before/after and a clean cleared-block shot.
- **`GHL_WEBHOOK_URL`** must be set or the form throws (the handler logs the full
  lead if it's missing, so nothing is lost).

## Once live — Google Ads housekeeping (from the deck)

- Point the House Demolition ad group's Final URLs here; 301 the old GHL funnel.
- Remove/relink the "Full house demolitions" card on the strip-out page.
- Move the Deanside knock-down imagery here.
- Pass `gclid` and all UTMs to the CRM.

## Running it

```bash
npm install
npm run dev
```
