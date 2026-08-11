import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { QuoteModalProvider } from "@/components/site/QuoteModal";
import { CtaButton } from "@/components/site/CtaButton";
import { FROM_PRICE, SITE } from "@/lib/site-data";
import { captureTracking } from "@/lib/tracking";

// Campaign 1, section 18 (page meta). The price quoted here is one of the places
// it appears — change it in PRICING and it changes here too. FROM_PRICE is an
// indicative Melbourne market rate until John confirms the real "from" figure.
const TITLE = `House Demolition Melbourne | From ${FROM_PRICE}, Permit & Asbestos Included | Demo Bros`;
const DESCRIPTION = `Melbourne house demolition from ${FROM_PRICE}. Demolition permit, all four disconnections, asbestos, slab and a level block — all in one fixed price, in writing within 24 hours. 4.9★ from 54 Melbourne jobs.`;

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 pt-24">
      <div className="max-w-xl text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="font-heading mt-6 text-5xl text-foreground sm:text-7xl">Demolished</h1>
        <p className="mt-6 text-lg text-muted-foreground">
          This page has been stripped out. Everything else is exactly where it should be.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <CtaButton href="/" size="md">
            Back to the top
          </CtaButton>
          <CtaButton href={SITE.phoneHref} variant="outline" size="md" icon={false}>
            Call {SITE.phone}
          </CtaButton>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-heading text-2xl text-foreground">This page didn't load</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or give us a call.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <CtaButton
            size="sm"
            icon={false}
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            Try again
          </CtaButton>
          <CtaButton href={SITE.phoneHref} variant="outline" size="sm" icon={false}>
            Call {SITE.phone}
          </CtaButton>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "author", content: "Demo Bros" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Demo Bros" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      // The Demo Bros logomark, run through SVGO (320 KB → 108 KB). Replaces the
      // default favicon the starter shipped with.
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/favicon.svg" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": "/#business",
          name: "Demo Bros",
          description:
            "Melbourne house and residential demolition specialists for knock-down rebuilds. Demolition permit, asset protection permit, all four disconnections, licensed asbestos assessment and removal, structural demolition, slab and footings out, waste removed and the block left clean and level — all inside one fixed price, in writing within 24 hours.",
          telephone: "+61-1800-960-625",
          email: SITE.email,
          address: {
            "@type": "PostalAddress",
            streetAddress: "103/181 Rosamond Rd",
            addressLocality: "Maribyrnong",
            addressRegion: "VIC",
            postalCode: "3032",
            addressCountry: "AU",
          },
          // Deck section 12: Melbourne metro first, but the whole state is covered.
          areaServed: "Greater Melbourne and Victoria, Australia",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: 54,
            bestRating: "5",
          },
          priceRange: "$$",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  // Capture first-touch ad/campaign attribution on the visitor's landing page.
  useEffect(() => {
    captureTracking();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SmoothScroll>
        <QuoteModalProvider>
          <Header />
          {/* Required: the route renders here. Removing <Outlet /> breaks the page. */}
          <main suppressHydrationWarning>
            <Outlet />
          </main>
          <Footer />
        </QuoteModalProvider>
      </SmoothScroll>
    </QueryClientProvider>
  );
}
