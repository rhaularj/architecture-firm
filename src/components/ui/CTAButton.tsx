import Link from "next/link";
import { cn } from "@/lib/utils";

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "filled" | "outlined" | "outlined-white";
  className?: string;
}

export function CTAButton({
  href,
  children,
  variant = "filled",
  className,
}: CTAButtonProps) {
  const base =
    "inline-flex items-center justify-center px-6 py-3 text-sm font-sans tracking-wide transition-all duration-300 ease-out-expo rounded-sm";

  const variants = {
    filled:
      "bg-gold-400 text-charcoal hover:bg-gold-300",
    outlined:
      "border border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-charcoal",
    "outlined-white":
      "border border-warm-50 text-warm-50 hover:bg-warm-50 hover:text-charcoal",
  };

  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {children}
    </Link>
  );
}
