import { Award } from "lucide-react";

export function AwardBadge() {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-warm-100 rounded-sm border border-warm-200">
      <Award size={16} className="text-gold-400" strokeWidth={1.5} />
      <span className="text-xs font-sans text-warm-600 tracking-wide">
        Award-Winning Studio
      </span>
    </div>
  );
}
