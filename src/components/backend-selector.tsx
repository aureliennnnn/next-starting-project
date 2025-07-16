"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { useBackend } from "@/hooks/use-backend"
import type { BackendType } from "@/lib/backend-adapters"

const backends: { value: BackendType; label: string; description: string }[] = [
  { value: "laravel", label: "Laravel", description: "PHP framework with Eloquent ORM" },
  { value: "express", label: "Express.js", description: "Node.js web framework" },
  { value: "fastapi", label: "FastAPI", description: "Modern Python web framework" },
  { value: "nestjs", label: "NestJS", description: "Progressive Node.js framework" },
  { value: "strapi", label: "Strapi", description: "Headless CMS" },
  { value: "supabase", label: "Supabase", description: "Open source Firebase alternative" },
  { value: "firebase", label: "Firebase", description: "Google's app development platform" },
]

export function BackendSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const { switchBackend } = useBackend()
  const [currentBackend, setCurrentBackend] = useState<BackendType>("express")

  const handleBackendChange = (backend: BackendType) => {
    setCurrentBackend(backend)
    switchBackend(backend)
    setIsOpen(false)
  }

  const currentBackendInfo = backends.find((b) => b.value === currentBackend)

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Backend Configuration
          <Badge variant="outline">{currentBackendInfo?.label}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-between bg-transparent">
              <span>{currentBackendInfo?.label}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0">
            <div className="max-h-60 overflow-y-auto">
              {backends.map((backend) => (
                <button
                  key={backend.value}
                  className="w-full px-4 py-3 text-left hover:bg-muted/50 flex items-start space-x-3 border-b last:border-b-0"
                  onClick={() => handleBackendChange(backend.value)}
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{backend.label}</span>
                      {currentBackend === backend.value && <Check className="h-4 w-4 text-primary" />}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{backend.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Current:</strong> {currentBackendInfo?.description}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
