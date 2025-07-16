"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Palette, Zap, Database, Mail, ShieldCheck, BarChart, TestTube } from "lucide-react"

const features = [
  {
    icon: Code,
    title: "Modern Stack",
    description: "Next.js 14 App Router, TypeScript, and Tailwind CSS for a robust foundation.",
  },
  {
    icon: Palette,
    title: "Rich UI Libraries",
    description: "Shadcn/ui, Chakra UI, and Radix UI for beautiful and accessible interfaces.",
  },
  {
    icon: Zap,
    title: "Smooth Animations",
    description: "Framer Motion, React Spring, and Lottie for engaging user experiences.",
  },
  {
    icon: Database,
    title: "Multi-Backend Support",
    description: "Adapters for Laravel, Express, FastAPI, NestJS, Supabase, Firebase, and Strapi.",
  },
  {
    icon: Mail,
    title: "Email Services",
    description: "Integrated with EmailJS and Resend for seamless transactional emails.",
  },
  {
    icon: ShieldCheck,
    title: "Authentication & CRUD",
    description: "Complete authentication flows and robust CRUD operations with validation.",
  },
  {
    icon: BarChart,
    title: "Analytics & Real-time",
    description: "Dashboard with key metrics and real-time updates via WebSockets.",
  },
  {
    icon: TestTube,
    title: "Comprehensive Testing",
    description: "Pre-configured Jest, React Testing Library, and Cypress for reliable tests.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Packed with Essential Features</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Everything you need to kickstart your next production-ready application.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 md:grid-cols-2">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="flex flex-col items-center p-6 text-center h-full">
                <CardHeader>
                  <feature.icon className="h-10 w-10 text-primary mb-4" />
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
