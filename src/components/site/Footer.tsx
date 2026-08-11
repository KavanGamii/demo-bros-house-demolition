import { SITE, footer } from "@/lib/site-data";

/**
 * Landing-page footer: the legally required lines and a phone number.
 *
 * No sitemap columns — link lists here are exits, and on a paid-traffic page the
 * only thing below the last CTA should be reassurance. The one exception is the
 * commercial line: deck note 7 pulled office defit and retail strip out off this
 * page entirely, so this is where that traffic is pointed instead.
 *
 * The bottom padding reserves the height of the sticky mobile action bar, which
 * is fixed and would otherwise sit on top of the copyright line on a phone.
 */
export function Footer() {
  return (
    <footer className="border-t border-border bg-card pb-[4.5rem] md:pb-0">
      <div className="container-wide py-10">
        <p className="mx-auto max-w-3xl text-center text-sm text-muted-foreground">
          {footer.coverage}
        </p>
        <p className="mx-auto mt-3 max-w-3xl text-center text-sm text-muted-foreground">
          {footer.commercial}
        </p>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} {SITE.name} · {footer.legal}
          </p>
          <div className="flex items-center gap-4">
            <a
              href={SITE.phoneHref}
              className="font-semibold text-foreground transition-colors hover:text-primary"
            >
              {SITE.phone}
            </a>
            <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-foreground">
              {SITE.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
