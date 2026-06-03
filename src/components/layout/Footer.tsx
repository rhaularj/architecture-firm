import Link from "next/link";
import { Camera, Globe, Mail } from "lucide-react";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "FAQ", href: "/faq" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-charcoal text-warm-300">
      <div className="max-site section-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Col 1: Logo + Tagline */}
          <div>
            <Link href="/" className="font-display italic text-2xl text-warm-50">
              Phoenix Custom Millwork
            </Link>
            <p className="mt-4 font-display italic text-lg text-warm-400">
              Precision craftsmanship meets quality construction.
            </p>
            <p className="mt-6 text-xs font-mono text-warm-600">
              Built with precision
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h3 className="text-sm tracking-[0.15em] uppercase text-warm-50 mb-4 font-sans">
              Navigation
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-warm-300 hover:text-warm-100 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div>
            <h3 className="text-sm tracking-[0.15em] uppercase text-warm-50 mb-4 font-sans">
              Get in Touch
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:Jag@pcmpro.ca"
                  className="hover:text-warm-100 transition-colors"
                >
                  Jag@pcmpro.ca
                </a>
              </li>
              <li>
                <a
                  href="tel:+19058746060"
                  className="hover:text-warm-100 transition-colors"
                >
                  Work: (905) 874-6060
                </a>
              </li>
              <li>
                <a
                  href="tel:+14168222239"
                  className="hover:text-warm-100 transition-colors"
                >
                  Cell: (416) 822-2239
                </a>
              </li>
              <li className="text-warm-400">
                2 Wilkinson Rd, Brampton, ON L6T 5B1
              </li>
            </ul>
            <div className="flex gap-4 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-warm-400 hover:text-gold-300 transition-colors"
                aria-label="Instagram"
              >
                <Camera size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-warm-400 hover:text-gold-300 transition-colors"
                aria-label="LinkedIn"
              >
                <Globe size={20} />
              </a>
              <a
                href="mailto:Jag@pcmpro.ca"
                className="text-warm-400 hover:text-gold-300 transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider + Copyright */}
        <div className="mt-12 pt-8 border-t border-gold-400/30">
          <p className="text-xs text-warm-600">
            &copy; {new Date().getFullYear()} Phoenix Custom Millwork. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
