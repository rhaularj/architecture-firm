import { ContactForm } from "@/components/contact/ContactForm";
import { DiscoveryCallCard } from "@/components/contact/DiscoveryCallCard";
import { Mail, Phone, MapPin, Clock, Camera, Globe } from "lucide-react";
import { GoldDivider } from "@/components/ui/GoldDivider";

export const metadata = {
  title: "Contact",
  description: "Get in touch to discuss your architecture or millwork project. Book a discovery call today.",
};

export default function ContactPage() {
  return (
    <section className="pt-32 pb-section">
      <div className="max-site section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left column - Info card */}
          <div className="lg:col-span-2 bg-charcoal rounded-sm p-8 lg:p-10 self-start">
            <h1 className="font-display italic text-display-lg text-warm-50">
              Let&apos;s build something{"\n"}extraordinary
            </h1>
            <GoldDivider className="mt-6" />

            <ul className="mt-8 space-y-5">
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-gold-400 mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:Jag@pcmpro.ca"
                  className="text-warm-300 hover:text-warm-50 transition-colors text-sm"
                >
                  Jag@pcmpro.ca
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-gold-400 mt-0.5 flex-shrink-0" />
                <div className="flex flex-col gap-1">
                  <a
                    href="tel:+19058746060"
                    className="text-warm-300 hover:text-warm-50 transition-colors text-sm"
                  >
                    Work: (905) 874-6060
                  </a>
                  <a
                    href="tel:+14168222239"
                    className="text-warm-300 hover:text-warm-50 transition-colors text-sm"
                  >
                    Cell: (416) 822-2239
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-gold-400 mt-0.5 flex-shrink-0" />
                <span className="text-warm-300 text-sm">
                  2 Wilkinson Rd<br />
                  Brampton, ON L6T 5B1
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={18} className="text-gold-400 mt-0.5 flex-shrink-0" />
                <span className="text-warm-300 text-sm">
                  Mon–Fri: 9:00 AM – 5:00 PM<br />
                  Sat: By appointment
                </span>
              </li>
            </ul>

            <div className="flex gap-4 mt-8">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-warm-400 hover:text-warm-50 transition-colors"
                aria-label="Instagram"
              >
                <Camera size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-warm-400 hover:text-warm-50 transition-colors"
                aria-label="LinkedIn"
              >
                <Globe size={20} />
              </a>
            </div>

            <div className="mt-8 pt-6 border-t border-warm-800">
              <DiscoveryCallCard />
            </div>
          </div>

          {/* Right column - Form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
