"use client"

import { useEffect, useRef, useState } from "react"
import { useNotificationStore } from "@/store/notification-store"

interface WebSocketMessage {
  type: string
  data: any
}

export function useWebSocket(url?: string) {
  const [isConnected, setIsConnected] = useState(false)
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null)
  const ws = useRef<WebSocket | null>(null)
  const { addNotification } = useNotificationStore()

  const wsUrl = url || process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3001"

  useEffect(() => {
    if (!wsUrl) return

    const connect = () => {
      ws.current = new WebSocket(wsUrl)

      ws.current.onopen = () => {
        setIsConnected(true)
        console.log("WebSocket connected")
      }

      ws.current.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data)
          setLastMessage(message)

          // Handle notification messages
          if (message.type === "notification") {
            addNotification({
              title: message.data.title,
              message: message.data.message,
              type: message.data.type || "info",
            })
          }
        } catch (error) {
          console.error("Failed to parse WebSocket message:", error)
        }
      }

      ws.current.onclose = () => {
        setIsConnected(false)
        console.log("WebSocket disconnected")

        // Attempt to reconnect after 3 seconds
        setTimeout(connect, 3000)
      }

      ws.current.onerror = (error) => {
        console.error("WebSocket error:", error)
      }
    }

    connect()

    return () => {
      if (ws.current) {
        ws.current.close()
      }
    }
  }, [wsUrl, addNotification])

  const sendMessage = (message: WebSocketMessage) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message))
    }
  }

  return {
    isConnected,
    lastMessage,
    sendMessage,
  }
}
