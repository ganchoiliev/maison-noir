import Link from "next/link";
import { NewsletterForm } from "./newsletter-form";
import { BackToTop } from "./back-to-top";

const navColumns = [
  {
    title: "Dining",
    links: [
      { href: "/menu", label: "Menu" },
      { href: "/reserve", label: "Reservations" },
      { href: "/gift-vouchers", label: "Gift Vouchers" },
      { href: "/private-dining", label: "Private Dining" },
    ],
  },
  {
    title: "Discover",
    links: [
      { href: "/philosophy", label: "Philosophy" },
      { href: "/gallery", label: "Gallery" },
      { href: "/press", label: "Press" },
      { href: "/careers", label: "Careers" },
    ],
  },
  {
    title: "Information",
    links: [
      { href: "/contact", label: "Contact" },
      { href: "/faq", label: "FAQ" },
      { href: "/legal/privacy", label: "Privacy Policy" },
      { href: "/legal/terms", label: "Terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-noise relative border-t border-bone/5 bg-ink">
      <div className="relative z-10">
        {/* ── Top: Newsletter banner ── */}
        <div className="border-b border-bone/5">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-14 md:flex-row md:justify-between lg:px-8">
            <div className="text-center md:text-left">
              <h3 className="font-display text-2xl text-bone">Stay in Season</h3>
              <p className="mt-1 text-sm text-muted">
                Menu previews, event invitations, and stories from the kitchen. No spam, ever.
              </p>
            </div>
            <div className="w-full max-w-sm">
              <NewsletterForm />
            </div>
          </div>
        </div>

        {/* ── Middle: Main grid ── */}
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-12 md:grid-cols-6">
            {/* Brand + Social (2 cols) */}
            <div className="md:col-span-2">
              <Link href="/" className="font-display text-3xl tracking-tight text-bone">
                Maison Noir
              </Link>

              <div className="mt-5 space-y-3 text-sm text-muted">
                <div className="flex items-start gap-2">
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-brass/60"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0 1 15 0Z"
                    />
                  </svg>
                  <span>
                    12 Floral Street
                    <br />
                    Covent Garden, London WC2E 9DH
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 shrink-0 text-brass/60"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <span>Tue – Sun, 18:00 – 22:30</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 shrink-0 text-brass/60"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                    />
                  </svg>
                  <span>+44 (0)20 7240 0012</span>
                </div>
              </div>

              {/* Social icons */}
              <div className="mt-6 flex gap-3">
                {[
                  {
                    label: "Instagram",
                    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
                  },
                  {
                    label: "X",
                    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
                  },
                  {
                    label: "TripAdvisor",
                    path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm4 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm3-7H7c0-2.76 2.24-5 5-5s5 2.24 5 5z",
                  },
                ].map((icon) => (
                  <a
                    key={icon.label}
                    href="#"
                    aria-label={icon.label}
                    className="flex h-9 w-9 items-center justify-center border border-bone/10 text-muted transition-all duration-300 hover:border-brass/40 hover:text-bone"
                  >
                    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={icon.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Nav columns (3 cols, each 1 col + 1 empty for spacing) */}
            {navColumns.map((col) => (
              <div key={col.title} className="md:col-span-1">
                <p className="small-caps text-xs tracking-widest text-brass">{col.title}</p>
                <div className="mt-4 flex flex-col gap-3">
                  {col.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="group flex items-center gap-2 text-sm text-bone/40 transition-colors duration-300 hover:text-bone"
                    >
                      <span className="h-px w-0 bg-brass transition-all duration-300 group-hover:w-3" />
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* Michelin + Awards (1 col) */}
            <div className="md:col-span-1">
              <p className="small-caps text-xs tracking-widest text-brass">Recognition</p>
              <div className="mt-4 space-y-4">
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-ember" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <div>
                    <p className="text-sm text-bone">Michelin Star</p>
                    <p className="text-xs text-muted">Awarded 2025</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center font-display text-xs text-brass">
                    #28
                  </span>
                  <div>
                    <p className="text-sm text-bone">World&apos;s 50 Best</p>
                    <p className="text-xs text-muted">2026 ranking</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-bone/5">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 md:flex-row lg:px-8">
            <p className="text-xs text-bone/20">
              &copy; {new Date().getFullYear()} Maison Noir. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xs text-bone/20">
              <Link href="/legal/privacy" className="transition-colors hover:text-bone/50">
                Privacy
              </Link>
              <Link href="/legal/terms" className="transition-colors hover:text-bone/50">
                Terms
              </Link>
              <span>London, England</span>
            </div>
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}
