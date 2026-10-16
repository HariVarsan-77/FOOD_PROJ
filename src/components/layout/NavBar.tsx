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
    `rounded-full px-4 py-2 text-sm font-bold transition ${
      isActive(href) ? "bg-primary text-ivory" : "text-brown hover:bg-peach"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-peach-deep/70 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-2xl"
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-peach">
            <FoodLogoMark className="h-8 w-8" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-base font-extrabold text-primary">
              Food Delivery
            </span>
            <span className="block text-[11px] font-bold tracking-[0.16em] text-brown-soft uppercase">
              Data Analysis
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={linkClass(link.href)}
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-peach-deep bg-ivory text-brown transition hover:bg-peach sm:hidden"
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
          className="border-t border-peach-deep/70 bg-ivory px-4 py-2 sm:hidden"
        >
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block rounded-2xl px-4 py-3 text-sm font-bold transition ${
                    isActive(link.href) ? "bg-primary text-ivory" : "text-brown hover:bg-peach"
                  }`}
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
