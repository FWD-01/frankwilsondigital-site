import { cn } from "@/lib/utils"

interface PixelDividerProps {
  className?: string
  accent?: "start" | "center" | "end"
}

export function PixelDivider({ className, accent = "start" }: PixelDividerProps) {
  return (
    <div className={cn("relative flex items-center", className)}>
      {accent === "start" && <PixelSquare />}
      <div className="flex-1 h-px bg-gray-line" />
      {accent === "center" && (
        <>
          <div className="flex-1 h-px bg-gray-line" />
          <PixelSquare />
          <div className="flex-1 h-px bg-gray-line" />
        </>
      )}
      {accent === "end" && <PixelSquare />}
    </div>
  )
}

function PixelSquare() {
  return <span className="inline-block w-1.5 h-1.5 bg-orange flex-shrink-0" aria-hidden />
}
