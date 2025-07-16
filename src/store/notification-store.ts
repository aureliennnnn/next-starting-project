import { create } from "zustand"

interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  read: boolean
  createdAt: string
}

interface NotificationState {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, "id" | "read" | "createdAt">) => void
  markAsRead: (id: string) => void
  removeNotification: (id: string) => void
  clearAll: () => void
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [
    {
      id: "1",
      title: "Welcome!",
      message: "Welcome to the Next.js Production Boilerplate",
      type: "info",
      read: false,
      createdAt: new Date().toISOString(),
    },
  ],
  unreadCount: 1,

  addNotification: (notification) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      read: false,
      createdAt: new Date().toISOString(),
    }

    set((state) => ({
      notifications: [newNotification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    }))
  },

  markAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
      unreadCount: Math.max(0, state.unreadCount - 1),
    }))
  },

  removeNotification: (id) => {
    const { notifications } = get()
    const notification = notifications.find((n) => n.id === id)

    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
      unreadCount: notification && !notification.read ? Math.max(0, state.unreadCount - 1) : state.unreadCount,
    }))
  },

  clearAll: () => {
    set({ notifications: [], unreadCount: 0 })
  },
}))
