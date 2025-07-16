"use client"

import { Player } from "@lottiefiles/react-lottie-player"

interface LottieAnimationProps {
  src: string
  className?: string
  autoplay?: boolean
  loop?: boolean
  speed?: number
}

export function LottieAnimation({
  src,
  className = "w-32 h-32",
  autoplay = true,
  loop = true,
  speed = 1,
}: LottieAnimationProps) {
  return <Player autoplay={autoplay} loop={loop} src={src} speed={speed} className={className} />
}
