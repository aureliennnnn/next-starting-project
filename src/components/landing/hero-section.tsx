"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { LottieAnimation } from "@/components/animations/lottie-animation"

export function HeroSection() {
  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted/20">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center space-y-4"
          >
            <div className="space-y-2">
              <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none">
                Build Faster, Deploy Smarter
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Your comprehensive Next.js 14 production-ready boilerplate. Accelerate your development with pre-built
                features, integrations, and best practices.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/dashboard">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:flex items-center justify-center"
          >
            {/* Placeholder for a more complex illustration or a Lottie animation */}
            <LottieAnimation
              src="https://assets5.lottiefiles.com/packages/lf20_V9t630.json"
              className="w-full max-w-md h-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
