"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { easeEditorial } from "@/lib/utils/motion";

const leftLinks = [
  { href: "/menu", label: "Menu" },
  { href: "/philosophy", label: "Philosophy" },
  { href: "/gallery", label: "Gallery" },
] as const;

const rightLinks = [
  { href: "/gift-vouchers", label: "Gifts" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

const mobileLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/philosophy", label: "Philosophy" },
  { href: "/gallery", label: "Gallery" },
  { href: "/gift-vouchers", label: "Gift Vouchers" },
  { href: "/press", label: "Press" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/careers", label: "Careers" },
] as const;

export function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const isHomePage = pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const goingDown = currentY > lastScrollY.current;

      setScrolled(currentY > 30);

      if (currentY > 120 && goingDown && !mobileOpen) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const showSolidBg = !isHomePage || scrolled;

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-700",
          showSolidBg
            ? "bg-ink/90 backdrop-blur-2xl shadow-[0_1px_30px_rgba(0,0,0,0.5)]"
            : "bg-gradient-to-b from-ink/80 via-ink/40 to-transparent",
        )}
        animate={{ y: visible || mobileOpen ? 0 : -100 }}
        transition={{ duration: 0.4, ease: easeEditorial }}
      >
        {/* Thin brass accent line at top */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-brass/20 to-transparent" />

        <nav className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Desktop layout — centered logo with links on each side */}
          <div className="hidden h-16 items-center justify-between md:flex">
            {/* Left links */}
            <div className="flex flex-1 items-center justify-end gap-1 pr-8">
              {leftLinks.map(({ href, label }) => (
                <NavLink key={href} href={href} label={label} active={pathname === href} />
              ))}
            </div>

            {/* Center logo */}
            <Link href="/" className="group relative shrink-0 px-4">
              <span className="font-display text-xl tracking-tight text-bone transition-colors duration-300 group-hover:text-brass">
                Maison Noir
              </span>
              <motion.span
                className="absolute -bottom-1 left-1/2 h-px -translate-x-1/2 bg-brass/50"
                initial={{ width: 0 }}
                whileHover={{ width: "60%" }}
                transition={{ duration: 0.4, ease: easeEditorial }}
              />
            </Link>

            {/* Right links + Reserve */}
            <div className="flex flex-1 items-center gap-1 pl-8">
              {rightLinks.map(({ href, label }) => (
                <NavLink key={href} href={href} label={label} active={pathname === href} />
              ))}

              {/* Divider */}
              <span className="mx-3 h-3 w-px bg-bone/10" />

              {/* Reserve CTA */}
              <Link
                href="/reserve"
                className="group relative ml-1 overflow-hidden border border-ember/80 px-5 py-2.5 text-[13px] font-medium tracking-widest text-bone transition-all duration-500 hover:border-ember hover:shadow-[0_0_30px_rgba(184,68,44,0.2)]"
              >
                <span className="relative z-10 small-caps">Reserve</span>
                <motion.span
                  className="absolute inset-0 bg-ember"
                  initial={{ x: "-101%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.4, ease: easeEditorial }}
                />
              </Link>
            </div>
          </div>

          {/* Mobile layout */}
          <div className="flex h-14 items-center justify-between md:hidden">
            <Link href="/" className="font-display text-lg tracking-tight text-bone">
              Maison Noir
            </Link>

            <div className="flex items-center gap-3">
              <Link
                href="/reserve"
                className="border border-ember/70 bg-ember/90 px-3 py-1 text-xs font-medium tracking-wider text-bone small-caps"
                onClick={() => setMobileOpen(false)}
              >
                Reserve
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="relative z-[60] flex h-10 w-10 flex-col items-center justify-center"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                <motion.span
                  className="block h-[1px] w-5 bg-bone"
                  animate={
                    mobileOpen
                      ? { rotate: 45, y: 0, width: 18 }
                      : { rotate: 0, y: -4, width: 20 }
                  }
                  transition={{ duration: 0.3, ease: easeEditorial }}
                />
                <motion.span
                  className="block h-[1px] w-3 bg-bone"
                  animate={
                    mobileOpen
                      ? { rotate: -45, y: 0, width: 18, opacity: 1 }
                      : { rotate: 0, y: 4, width: 12, opacity: 0.6 }
                  }
                  transition={{ duration: 0.3, ease: easeEditorial }}
                />
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* ─── Mobile Fullscreen Menu ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[55]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: easeEditorial }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-ink/98" />
            <div className="bg-noise absolute inset-0" />

            {/* Decorative frame */}
            <div className="absolute inset-6 border border-bone/[0.03]" />
            <div className="absolute left-6 top-6 h-8 w-8 border-l border-t border-brass/20" />
            <div className="absolute right-6 bottom-6 h-8 w-8 border-r border-b border-brass/20" />

            <div className="relative z-10 flex h-full flex-col px-10 pb-10 pt-20">
              {/* Nav links */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="space-y-0">
                  {mobileLinks.map(({ href, label }, i) => {
                    const isActive = pathname === href;
                    return (
                      <motion.div
                        key={href}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{
                          delay: 0.08 + i * 0.04,
                          duration: 0.5,
                          ease: easeEditorial,
                        }}
                      >
                        <Link
                          href={href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "group flex items-center gap-4 py-3 transition-colors duration-300",
                            isActive ? "text-bone" : "text-bone/30 active:text-bone",
                          )}
                        >
                          {/* Number */}
                          <span className="w-6 text-right font-mono text-[10px] text-brass/40">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {/* Line that grows on active */}
                          <span
                            className={cn(
                              "h-px transition-all duration-500",
                              isActive ? "w-6 bg-ember" : "w-0 bg-brass group-hover:w-4",
                            )}
                          />
                          {/* Label */}
                          <span className="font-display text-2xl tracking-tight md:text-3xl">
                            {label}
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="space-y-5"
              >
                {/* Reserve button */}
                <Link
                  href="/reserve"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full border border-ember bg-ember py-4 text-center text-sm font-medium tracking-[0.15em] text-bone small-caps"
                >
                  Reserve a Seat
                </Link>

                {/* Info row */}
                <div className="flex items-end justify-between text-[11px] text-bone/20">
                  <div className="space-y-0.5">
                    <p>12 Floral Street, Covent Garden</p>
                    <p>London WC2E 9DH</p>
                  </div>
                  <div className="text-right space-y-0.5">
                    <p>Tue – Sun</p>
                    <p>18:00 – 22:30</p>
                  </div>
                </div>

                {/* Social */}
                <div className="flex items-center justify-center gap-5 pt-1">
                  {["Instagram", "X", "Email"].map((label) => (
                    <a
                      key={label}
                      href="#"
                      className="text-[10px] tracking-[0.2em] text-bone/15 transition-colors duration-300 hover:text-bone/40 small-caps"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── Desktop Nav Link ─── */
function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative px-3 py-2 text-[13px] tracking-[0.12em] transition-colors duration-300 small-caps",
        active ? "text-bone" : "text-bone/40 hover:text-bone/80",
      )}
    >
      {label}
      {/* Hover underline */}
      <span
        className={cn(
          "absolute bottom-0.5 left-3 right-3 h-px origin-left transition-transform duration-500",
          active
            ? "scale-x-100 bg-ember"
            : "scale-x-0 bg-brass/50 group-hover:scale-x-100",
        )}
      />
      {/* Active dot */}
      {active && (
        <motion.span
          layoutId="nav-dot"
          className="absolute -bottom-1 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-ember"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
    </Link>
  );
}
