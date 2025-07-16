"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useBackend } from "./use-backend"
import toast from "react-hot-toast"

export function useCrud<T = any>(resource: string) {
  const { adapter } = useBackend()
  const queryClient = useQueryClient()

  // Fetch items
  const {
    data: items = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: [resource],
    queryFn: () => adapter.getItems(),
  })

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (data: Partial<T>) => adapter.createItem(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [resource] })
      toast.success("Item created successfully!")
    },
    onError: () => {
      toast.error("Failed to create item")
    },
  })

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<T> }) => adapter.updateItem(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [resource] })
      toast.success("Item updated successfully!")
    },
    onError: () => {
      toast.error("Failed to update item")
    },
  })

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => adapter.deleteItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [resource] })
      toast.success("Item deleted successfully!")
    },
    onError: () => {
      toast.error("Failed to delete item")
    },
  })

  return {
    items,
    isLoading,
    error,
    create: createMutation.mutate,
    update: updateMutation.mutate,
    delete: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  }
}
