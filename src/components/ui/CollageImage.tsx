import Image from "next/image"
import { cn } from "@/lib/utils"

interface CollageImageProps {
  src: string
  alt: string
  width: number
  height: number
  rotation?: number
  className?: string
  priority?: boolean
  grayscale?: boolean
}

export function CollageImage({
  src,
  alt,
  width,
  height,
  rotation = 0,
  className,
  priority,
  grayscale = false,
}: CollageImageProps) {
  const rotateClass =
    rotation === 1
      ? "rotate-1"
      : rotation === -1
        ? "-rotate-1"
        : rotation === 2
          ? "rotate-2"
          : rotation === -2
            ? "-rotate-2"
            : ""

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        "border border-gray-line",
        rotateClass,
        className
      )}
      style={{ width, height }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className={cn(
          "object-cover",
          grayscale && "grayscale"
        )}
        sizes={`${width}px`}
      />
      {/* Subtle grain overlay on the image */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-20"
        aria-hidden
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "100px 100px",
        }}
      />
    </div>
  )
}
