"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function CallToActionSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/20">
      <div className="container px-4 md:px-6">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Card className="p-8 text-center">
            <CardHeader>
              <CardTitle className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Ready to build your next big thing?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
                Stop wasting time on boilerplate setup and start building features that matter.
              </p>
              <Button asChild size="lg">
                <Link href="/dashboard">Get Started Now</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
