import { Calendar } from "lucide-react";

export function DiscoveryCallCard() {
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || "https://calendly.com/yourfirm";

  return (
    <a
      href={bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 group"
    >
      <Calendar size={18} className="text-gold-400" />
      <div>
        <p className="text-sm text-warm-50 group-hover:text-gold-300 transition-colors">
          Book a Discovery Call
        </p>
        <p className="text-xs text-warm-500">
          15 min &middot; Free consultation
        </p>
      </div>
    </a>
  );
}
