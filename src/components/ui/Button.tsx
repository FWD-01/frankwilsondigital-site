import React from "react"
import { cn } from "@/lib/utils"
import type { ButtonHTMLAttributes } from "react"

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost"
type ButtonSize = "sm" | "md" | "lg"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  asChild?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-orange text-black hover:bg-orange-light border border-orange hover:border-orange-light",
  secondary:
    "bg-black text-cream hover:bg-black-soft border border-black hover:border-black-soft",
  outline:
    "bg-cream text-black border-2 border-black hover:bg-cream-dark",
  ghost:
    "bg-transparent text-black border border-transparent hover:text-orange underline-offset-4 hover:underline",
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-small",
  md: "px-6 py-3 text-body",
  lg: "px-8 py-4 text-body-lg",
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  asChild,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2",
    "font-sans font-medium tracking-wide",
    "rounded-sm transition-colors duration-200",
    "focus-visible:outline-2 focus-visible:outline-orange focus-visible:outline-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    variantClasses[variant],
    sizeClasses[size],
    className
  )

  if (asChild && React.isValidElement(children)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const child = children as React.ReactElement<any>
    return React.cloneElement(child, {
      className: cn(classes, child.props.className),
    })
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
