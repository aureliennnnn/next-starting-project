import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { QueryProvider } from "@/components/providers/query-provider"
import { ChakraProvider } from "@/components/providers/chakra-provider"
import { Toaster } from "react-hot-toast"
import { ErrorBoundary } from "@/components/error-boundary"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Next.js Production Boilerplate",
  description: "A comprehensive Next.js 14 production-ready boilerplate",
  keywords: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  authors: [{ name: "Your Name" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <ChakraProvider>
              <QueryProvider>
                {children}
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: "hsl(var(--background))",
                      color: "hsl(var(--foreground))",
                      border: "1px solid hsl(var(--border))",
                    },
                  }}
                />
              </QueryProvider>
            </ChakraProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
