import { cn } from "@/lib/utils";

interface GoldDividerProps {
  className?: string;
}

export function GoldDivider({ className }: GoldDividerProps) {
  return <span className={cn("gold-line w-16 inline-block", className)} />;
}
