interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  light?: boolean;
}

export function SectionHeader({
  title,
  subtitle,
  className,
  light = false,
}: SectionHeaderProps) {
  return (
    <div className={className}>
      <h2
        className={`font-display italic text-display-lg ${
          light ? "text-warm-50" : "text-charcoal"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-lg ${
            light ? "text-warm-300" : "text-warm-500"
          }`}
        >
          {subtitle}
        </p>
      )}
      <span className="gold-line mt-6 w-16 inline-block" />
    </div>
  );
}
