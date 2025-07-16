"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BackendSelector } from "@/components/backend-selector"
import { RealTimeDemo } from "@/components/real-time-demo"
import { ContactForm } from "@/components/forms/contact-form"
import { SpringAnimation } from "@/components/animations/spring-animation"
import { LottieAnimation } from "@/components/animations/lottie-animation"
import { useAuth } from "@/hooks/use-auth"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name}!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <SpringAnimation>
              <BackendSelector />
            </SpringAnimation>

            <Card>
              <CardHeader>
                <CardTitle>Animation Examples</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center space-x-4">
                <LottieAnimation
                  src="https://assets5.lottiefiles.com/packages/lf20_V9t630.json"
                  className="w-24 h-24"
                />
                <SpringAnimation className="p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm">Hover me for spring animation!</p>
                </SpringAnimation>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <RealTimeDemo />
            <ContactForm />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
