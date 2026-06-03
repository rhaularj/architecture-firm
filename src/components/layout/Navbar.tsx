"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "FAQ", href: "/faq" },
  { label: "Resources", href: "/resources" },
];

// Pages that have a dark hero/banner behind the navbar
const darkHeroPages = ["/", "/about"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Only use transparent/light text on pages with dark hero backgrounds
  const hasDarkHero = darkHeroPages.includes(pathname);
  const useDarkText = !hasDarkHero || scrolled;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out-quart",
        scrolled
          ? "bg-warm-50/95 backdrop-blur-md shadow-sm"
          : hasDarkHero
            ? "bg-transparent"
            : "bg-warm-50/95 backdrop-blur-md"
      )}
    >
      <div className="max-site section-padding flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <span
            className={cn(
              "font-display italic text-3xl transition-colors duration-300",
              useDarkText ? "text-charcoal" : "text-warm-50"
            )}
          >
            Phoenix Custom Millwork
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "text-sm tracking-[0.15em] uppercase font-sans transition-colors duration-300 relative",
                  useDarkText ? "text-charcoal" : "text-warm-50",
                  "hover:text-gold-400",
                  pathname === item.href &&
                    "after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-gold-400"
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA + Mobile */}
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className={cn(
              "hidden lg:inline-flex items-center px-5 py-2.5 text-sm border rounded-sm transition-all duration-300",
              useDarkText
                ? "border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-charcoal"
                : "border-warm-50 text-warm-50 hover:bg-warm-50 hover:text-charcoal"
            )}
          >
            Book a Call
          </Link>
          <MobileMenu navItems={navItems} scrolled={useDarkText} />
        </div>
      </div>
    </nav>
  );
}
