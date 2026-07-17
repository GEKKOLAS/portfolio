"use client"

import React, { memo } from "react"

interface AuroraTextProps {
  children: React.ReactNode
  className?: string
  colors?: string[]
  speed?: number
}

export const AuroraText = memo(
  ({
    children,
    className = "",
    colors = [
      "#22D3EE",
      "#8B5CF6",
      "#EC4899",
      "#F97316",
      "#FACC15",
    ],
    speed = 0.3,
  }: AuroraTextProps) => {
    const gradientStyle = {
      backgroundImage: `linear-gradient(135deg, ${colors.join(", ")}, ${colors[0]})`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      animationDuration: `${10 / speed}s`,
    }

    return (
      <span className={`relative isolate inline-block ${className}`}>
        <span className="sr-only">{children}</span>
        <span
          className="animate-aurora-text absolute inset-0 -z-10 bg-[length:300%_auto] bg-clip-text text-transparent opacity-55 blur-[7px]"
          style={gradientStyle}
          aria-hidden="true"
        >
          {children}
        </span>
        <span
          className="animate-aurora-text bg-[length:300%_auto] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(236,72,153,0.2)]"
          style={gradientStyle}
          aria-hidden="true"
        >
          {children}
        </span>
      </span>
    )
  }
)

AuroraText.displayName = "AuroraText"
