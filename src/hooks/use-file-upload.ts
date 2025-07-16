"use client"

import { useState, useCallback } from "react"
import { useBackend } from "./use-backend"
import toast from "react-hot-toast"

interface UploadedFile {
  file: File
  progress: number
  status: "uploading" | "completed" | "error"
  url?: string
}

export function useFileUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const { adapter } = useBackend()

  const uploadFile = useCallback(
    async (file: File) => {
      const uploadFile: UploadedFile = {
        file,
        progress: 0,
        status: "uploading",
      }

      setFiles((prev) => [...prev, uploadFile])

      try {
        const formData = new FormData()
        formData.append("file", file)

        // Simulate progress updates
        const progressInterval = setInterval(() => {
          setFiles((prev) => prev.map((f) => (f.file === file ? { ...f, progress: Math.min(f.progress + 10, 90) } : f)))
        }, 200)

        const response = await adapter.uploadFile(formData)

        clearInterval(progressInterval)

        setFiles((prev) =>
          prev.map((f) =>
            f.file === file
              ? {
                  ...f,
                  progress: 100,
                  status: "completed",
                  url: response.url,
                }
              : f,
          ),
        )

        toast.success(`${file.name} uploaded successfully!`)
        return response
      } catch (error) {
        setFiles((prev) => prev.map((f) => (f.file === file ? { ...f, status: "error" } : f)))
        toast.error(`Failed to upload ${file.name}`)
        throw error
      }
    },
    [adapter],
  )

  const removeFile = useCallback((file: File) => {
    setFiles((prev) => prev.filter((f) => f.file !== file))
  }, [])

  const clearFiles = useCallback(() => {
    setFiles([])
  }, [])

  return {
    files,
    uploadFile,
    removeFile,
    clearFiles,
  }
}
