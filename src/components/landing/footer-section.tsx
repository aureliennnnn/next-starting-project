"use client"

import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"

export function FooterSection() {
  return (
    <footer className="w-full py-8 bg-background border-t">
      <div className="container px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Next.js Production Boilerplate. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:gap-6">
          <Link className="text-sm hover:underline underline-offset-4 text-muted-foreground" href="#">
            Privacy Policy
          </Link>
          <Link className="text-sm hover:underline underline-offset-4 text-muted-foreground" href="#">
            Terms of Service
          </Link>
          <Link className="text-sm hover:underline underline-offset-4 text-muted-foreground" href="#">
            Contact
          </Link>
        </nav>
        <div className="flex gap-4">
          <Link href="#" className="text-muted-foreground hover:text-primary" aria-label="GitHub">
            <Github className="h-5 w-5" />
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary" aria-label="Twitter">
            <Twitter className="h-5 w-5" />
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary" aria-label="LinkedIn">
            <Linkedin className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
