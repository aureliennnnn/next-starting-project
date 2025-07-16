"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { motion } from "framer-motion"
import { Upload, File, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import toast from "react-hot-toast"

interface UploadedFile {
  file: File
  progress: number
  status: "uploading" | "completed" | "error"
  url?: string
}

export function FileUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([])

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) => ({
        file,
        progress: 0,
        status: "uploading" as const,
      }))

      setFiles((prev) => [...prev, ...newFiles])

      // Simulate file upload
      newFiles.forEach((uploadFile, index) => {
        uploadFileWithProgress(uploadFile, index + files.length)
      })
    },
    [files.length],
  )

  const uploadFileWithProgress = async (uploadFile: UploadedFile, index: number) => {
    try {
      const formData = new FormData()
      formData.append("file", uploadFile.file)

      // Simulate progress
      const interval = setInterval(() => {
        setFiles((prev) => prev.map((f, i) => (i === index ? { ...f, progress: Math.min(f.progress + 10, 90) } : f)))
      }, 200)

      // Actual upload would go here
      await new Promise((resolve) => setTimeout(resolve, 2000))

      clearInterval(interval)

      setFiles((prev) =>
        prev.map((f, i) =>
          i === index
            ? {
                ...f,
                progress: 100,
                status: "completed",
                url: URL.createObjectURL(uploadFile.file),
              }
            : f,
        ),
      )

      toast.success(`${uploadFile.file.name} uploaded successfully!`)
    } catch (error) {
      setFiles((prev) => prev.map((f, i) => (i === index ? { ...f, status: "error" } : f)))
      toast.error(`Failed to upload ${uploadFile.file.name}`)
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
      "application/pdf": [".pdf"],
      "text/*": [".txt", ".csv"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>File Upload</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            {isDragActive ? (
              <p className="text-lg">Drop the files here...</p>
            ) : (
              <div>
                <p className="text-lg mb-2">Drag & drop files here, or click to select</p>
                <p className="text-sm text-muted-foreground">Supports images, PDFs, and text files (max 10MB)</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {files.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Files</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {files.map((uploadFile, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-4 p-4 border rounded-lg"
                >
                  <File className="h-8 w-8 text-muted-foreground flex-shrink-0" />

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{uploadFile.file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(uploadFile.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>

                    {uploadFile.status === "uploading" && <Progress value={uploadFile.progress} className="mt-2" />}
                  </div>

                  <div className="flex items-center space-x-2">
                    {uploadFile.status === "completed" && <Check className="h-5 w-5 text-green-500" />}

                    {uploadFile.status === "error" && <X className="h-5 w-5 text-destructive" />}

                    <Button size="icon" variant="ghost" onClick={() => removeFile(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
