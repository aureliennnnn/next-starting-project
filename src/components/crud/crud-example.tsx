"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion } from "framer-motion"
import { Plus, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { apiClient } from "@/lib/api-client"
import toast from "react-hot-toast"

const itemSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
})

type Item = z.infer<typeof itemSchema>

export function CrudExample() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Item | null>(null)
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<Item>({
    resolver: zodResolver(itemSchema),
  })

  // Fetch items
  const { data: items = [], isLoading } = useQuery({
    queryKey: ["items"],
    queryFn: () => apiClient.get("/items"),
  })

  // Create/Update mutation
  const createUpdateMutation = useMutation({
    mutationFn: (data: Item) => {
      if (editingItem) {
        return apiClient.put(`/items/${editingItem.id}`, data)
      }
      return apiClient.post("/items", data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] })
      toast.success(editingItem ? "Item updated!" : "Item created!")
      handleCloseDialog()
    },
    onError: () => {
      toast.error("Something went wrong")
    },
  })

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiClient.delete(`/items/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] })
      toast.success("Item deleted!")
    },
    onError: () => {
      toast.error("Failed to delete item")
    },
  })

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingItem(null)
    reset()
  }

  const handleEdit = (item: Item) => {
    setEditingItem(item)
    setValue("title", item.title)
    setValue("description", item.description)
    setIsDialogOpen(true)
  }

  const onSubmit = (data: Item) => {
    createUpdateMutation.mutate(data)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">CRUD Example</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit Item" : "Create New Item"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" {...register("title")} placeholder="Enter title" />
                {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" {...register("description")} placeholder="Enter description" />
                {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={handleCloseDialog}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createUpdateMutation.isPending}>
                  {createUpdateMutation.isPending ? (
                    <>
                      <LoadingSpinner className="mr-2 h-4 w-4" />
                      {editingItem ? "Updating..." : "Creating..."}
                    </>
                  ) : editingItem ? (
                    "Update"
                  ) : (
                    "Create"
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item: Item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <span className="truncate">{item.title}</span>
                  <div className="flex space-x-1">
                    <Button size="icon" variant="ghost" onClick={() => handleEdit(item)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => deleteMutation.mutate(item.id!)}
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No items found. Create your first item!</p>
        </div>
      )}
    </div>
  )
}
