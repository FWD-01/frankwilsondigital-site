import { cn } from "@/lib/utils"

interface BadgeProps {
  label: string
  number?: string
  className?: string
}

export function Badge({ label, number, className }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2",
        "font-mono text-mono-label tracking-widest uppercase",
        "text-gray-muted",
        className
      )}
    >
      {number && (
        <span className="text-orange">{number}</span>
      )}
      <span className="border border-gray-line px-2 py-0.5">{label}</span>
    </div>
  )
}
