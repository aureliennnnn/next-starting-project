"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuthStore } from "@/store/auth-store"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import toast from "react-hot-toast"

const authSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
})

type AuthFormData = z.infer<typeof authSchema>

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [mode, setMode] = useState<"login" | "register">("login")
  const { login, register } = useAuthStore()

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  })

  const onSubmit = async (data: AuthFormData) => {
    setIsLoading(true)
    try {
      if (mode === "login") {
        await login(data.email, data.password)
        toast.success("Logged in successfully!")
      } else {
        await register(data.email, data.password, data.name || "")
        toast.success("Account created successfully!")
      }
      reset()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Authentication failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">{mode === "login" ? "Sign In" : "Create Account"}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={mode} onValueChange={(value) => setMode(value as "login" | "register")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
              {mode === "register" && (
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" {...registerField("name")} placeholder="Enter your name" disabled={isLoading} />
                  {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...registerField("email")}
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...registerField("password")}
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <LoadingSpinner className="mr-2 h-4 w-4" />
                    {mode === "login" ? "Signing in..." : "Creating account..."}
                  </>
                ) : mode === "login" ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  )
}
