"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Wifi, WifiOff, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useWebSocket } from "@/hooks/use-websocket"

export function RealTimeDemo() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Array<{ id: string; text: string; timestamp: Date }>>([])
  const { isConnected, lastMessage, sendMessage } = useWebSocket()

  useEffect(() => {
    if (lastMessage && lastMessage.type === "message") {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: lastMessage.data.text,
          timestamp: new Date(),
        },
      ])
    }
  }, [lastMessage])

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage({
        type: "message",
        data: { text: message },
      })
      setMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Real-time Demo
          <Badge variant={isConnected ? "default" : "destructive"} className="flex items-center gap-1">
            {isConnected ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
            {isConnected ? "Connected" : "Disconnected"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-64 border rounded-lg p-4 overflow-y-auto bg-muted/20">
          <AnimatePresence>
            {messages.length === 0 ? (
              <p className="text-muted-foreground text-center">No messages yet...</p>
            ) : (
              messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mb-2 p-2 bg-background rounded border"
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs text-muted-foreground mt-1">{msg.timestamp.toLocaleTimeString()}</p>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        <div className="flex space-x-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            disabled={!isConnected}
          />
          <Button onClick={handleSendMessage} disabled={!isConnected || !message.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {!isConnected && (
          <p className="text-sm text-muted-foreground text-center">
            WebSocket connection is not available. Messages will not be sent in real-time.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
