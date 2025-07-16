"use client"

import type React from "react"

import { useSpring, animated } from "react-spring"
import { useState } from "react"

interface SpringAnimationProps {
  children: React.ReactNode
  className?: string
}

export function SpringAnimation({ children, className }: SpringAnimationProps) {
  const [isHovered, setIsHovered] = useState(false)

  const springProps = useSpring({
    transform: isHovered ? "scale(1.05)" : "scale(1)",
    config: { tension: 300, friction: 10 },
  })

  return (
    <animated.div
      style={springProps}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </animated.div>
  )
}
