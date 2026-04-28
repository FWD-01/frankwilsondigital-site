import { cn } from "@/lib/utils"

interface HandwrittenAccentProps {
  text: string
  className?: string
  color?: "orange" | "black" | "cream"
}

const colorClasses = {
  orange: "text-orange",
  black: "text-black",
  cream: "text-cream",
}

export function HandwrittenAccent({
  text,
  className,
  color = "orange",
}: HandwrittenAccentProps) {
  return (
    <span
      className={cn(
        "font-handwritten text-2xl leading-none inline-block",
        "-rotate-2",
        colorClasses[color],
        className
      )}
      aria-label={text}
    >
      {text}
    </span>
  )
}
