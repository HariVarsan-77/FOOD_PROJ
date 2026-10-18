"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { FoodLogoMark } from "@/components/illustrations/FoodIllustrations";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/food-data", label: "Food Data" },
  { href: "/final-analysis", label: "Final Analysis" },
];

/**
 * The persistent top navigation bar.
 * It shows which page is open and collapses into a compact menu on phones.
 */
export function NavBar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const linkClass = (href: string) =>
    isActive(href)
      ? "rounded-full px-4 py-2 text-sm font-bold transition-all duration-200 text-ivory"
      : "rounded-full px-4 py-2 text-sm font-bold transition-all duration-200 text-gold-soft hover:text-gold-light";

  const activeLinkStyle = (href: string) =>
    isActive(href)
      ? {
          background: "linear-gradient(135deg, #ff7c2a 0%, #e85d04 100%)",
          boxShadow: "0 0 16px -4px rgba(232,93,4,0.65)",
        }
      : {};

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-md"
      style={{
        background: "linear-gradient(90deg, #1a1108 0%, #0d0a06 100%)",
        borderBottom: "1px solid rgba(212,160,23,0.35)",
        boxShadow: "0 4px 24px -8px rgba(13,10,6,0.70), inset 0 -1px 0 rgba(212,160,23,0.20)",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-2xl"
          onClick={() => setIsMenuOpen(false)}
        >
          <span
            className="flex h-11 w-11 items-center justify-center rounded-2xl"
            style={{
              background: "linear-gradient(135deg, #f0c842 0%, #d4a017 100%)",
              boxShadow: "0 0 14px -4px rgba(212,160,23,0.60)",
            }}
          >
            <FoodLogoMark className="h-8 w-8" />
          </span>
          <span className="leading-tight">
            <span
              className="block font-display text-base font-extrabold"
              style={{ color: "#f0c842" }}
            >
              Food Delivery
            </span>
            <span
              className="block text-[11px] font-bold tracking-[0.16em] uppercase"
              style={{ color: "rgba(252,233,160,0.65)" }}
            >
              Data Analysis
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-4 sm:flex">
          <nav className="flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={linkClass(link.href)}
                style={activeLinkStyle(link.href)}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Discreet telemetry indicator: informs user once in an unobtrusive place */}
          <div
            className="hidden items-center gap-2 rounded-full px-3 py-1 text-xs font-bold md:inline-flex"
            style={{
              background: "rgba(13, 10, 6, 0.60)",
              border: "1px solid rgba(212, 160, 23, 0.35)",
              color: "#fce9a0",
            }}
            title="Connected to Firebase Cloud Firestore for real-time synchronized data"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[11px] font-semibold tracking-wider uppercase text-gold-soft">
              Live Firestore
            </span>
          </div>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-2xl transition"
          style={{
            background: "#1a1108",
            border: "1.5px solid rgba(212,160,23,0.50)",
            color: "#fce9a0",
          }}
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
          <span className="sr-only">Toggle navigation menu</span>
        </button>
      </div>

      {isMenuOpen ? (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="px-4 py-2 sm:hidden"
          style={{
            borderTop: "1px solid rgba(212,160,23,0.25)",
            background: "#0d0a06",
          }}
        >
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block rounded-2xl px-4 py-3 text-sm font-bold transition ${
                    isActive(link.href) ? "text-ivory" : "hover:bg-white/5"
                  }`}
                  style={
                    isActive(link.href)
                      ? {
                          background: "linear-gradient(135deg, #ff7c2a 0%, #e85d04 100%)",
                        }
                      : { color: "#fce9a0" }
                  }
                  aria-current={isActive(link.href) ? "page" : undefined}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
