"use client"

import { motion } from "framer-motion"
import { User, Mail, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuthStore } from "@/store/auth-store"

export function UserProfile() {
  const { user, logout } = useAuthStore()

  if (!user) return null

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto">
      <Card>
        <CardHeader className="text-center">
          <Avatar className="w-20 h-20 mx-auto mb-4">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <CardTitle>Welcome back, {user.name}!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{user.name}</span>
          </div>

          <div className="flex items-center space-x-3">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{user.email}</span>
          </div>

          <div className="flex items-center space-x-3">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Joined {new Date(user.createdAt).toLocaleDateString()}</span>
          </div>

          <Button onClick={logout} variant="outline" className="w-full bg-transparent">
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
