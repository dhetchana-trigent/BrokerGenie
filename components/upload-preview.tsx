"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, ImageIcon, X, FileSpreadsheet } from "lucide-react"
import { cn } from "@/lib/utils"

interface UploadedFile {
  id: string
  name: string
  type: string
  size: number
  uploadedAt: Date
  thumbnail?: string
  pages?: number
  rows?: number
}

interface UploadPreviewProps {
  onNext?: () => void
}

const fileTypes = [
  { type: "ACORD 125/126/140", extensions: ["pdf"], icon: FileText, color: "bg-blue-100 text-blue-700" },
  { type: "Prior Declarations", extensions: ["pdf"], icon: FileText, color: "bg-green-100 text-green-700" },
  { type: "Loss Runs", extensions: ["pdf"], icon: FileText, color: "bg-red-100 text-red-700" },
  { type: "SOV", extensions: ["csv", "xlsx"], icon: FileSpreadsheet, color: "bg-purple-100 text-purple-700" },
  { type: "COI", extensions: ["pdf"], icon: FileText, color: "bg-orange-100 text-orange-700" },
  { type: "Photos", extensions: ["jpeg", "jpg", "png"], icon: ImageIcon, color: "bg-pink-100 text-pink-700" },
]

const sampleFiles: UploadedFile[] = [
  {
    id: "sample-1",
    name: "ACORD_125_Application.pdf",
    type: "application/pdf",
    size: 2456789,
    uploadedAt: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    pages: 8,
  },
  {
    id: "sample-2",
    name: "Prior_Policy_Declarations.pdf",
    type: "application/pdf",
    size: 1234567,
    uploadedAt: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
    pages: 3,
  },
  {
    id: "sample-3",
    name: "Loss_Runs_2023.pdf",
    type: "application/pdf",
    size: 987654,
    uploadedAt: new Date(Date.now() - 1000 * 60 * 8), // 8 minutes ago
    pages: 5,
  },
  {
    id: "sample-4",
    name: "Schedule_of_Values.xlsx",
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    size: 456789,
    uploadedAt: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    rows: 247,
  },
]

export function UploadPreview({ onNext }: UploadPreviewProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>(sampleFiles)
  const [dragActive, setDragActive] = useState(false)
  const [isExtracting, setIsExtracting] = useState(false)
  const [metadata, setMetadata] = useState({
    brokerNotes:
      "Client is looking for comprehensive coverage with competitive pricing. Previous carrier non-renewed due to claims frequency.",
    renewalDate: "2024-12-15",
    competitorQuote: "Liberty Mutual - $45,000",
  })

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }, [])

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach((file) => {
      const newFile: UploadedFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type,
        size: file.size,
        uploadedAt: new Date(),
        pages: file.type === "application/pdf" ? Math.floor(Math.random() * 10) + 1 : undefined,
        rows:
          file.name.includes(".csv") || file.name.includes(".xlsx")
            ? Math.floor(Math.random() * 1000) + 100
            : undefined,
      }
      setUploadedFiles((prev) => [...prev, newFile])
    })
  }

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  const getFileTypeInfo = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase()
    return fileTypes.find((ft) => ft.extensions.includes(extension || "")) || fileTypes[0]
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleExtractWithAI = async () => {
    setIsExtracting(true)

    // Simulate AI extraction process
    try {
      console.log(
        "[v0] Starting AI extraction for files:",
        uploadedFiles.map((f) => f.name),
      )

      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("[v0] AI extraction completed successfully")

      if (onNext) {
        onNext()
      }
    } catch (error) {
      console.error("[v0] AI extraction failed:", error)
      alert("AI extraction failed. Please try again.")
    } finally {
      setIsExtracting(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="space-y-6">
        {/* Upload Area and File List */}
        <div className="space-y-6">
          {/* Drag and Drop Area */}
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div
                className={cn(
                  "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
                  dragActive ? "border-accent bg-accent/5" : "border-border",
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg mb-2">Drop ACORDs, prior policies, loss runs, SOV, COI, and photos here.</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Preview files before extraction. You can remove or replace any file.
                </p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.csv,.xlsx,.jpeg,.jpg,.png"
                  onChange={(e) => e.target.files && handleFiles(e.target.files)}
                  className="hidden"
                  id="file-upload"
                />
                <Button asChild variant="outline">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    Choose Files
                  </label>
                </Button>
              </div>

              {/* File Type Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6">
                {fileTypes.map((fileType) => (
                  <div key={fileType.type} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                    <fileType.icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{fileType.type}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* File List */}
          {uploadedFiles.length > 0 && (
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Uploaded Files ({uploadedFiles.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {uploadedFiles.map((file) => {
                    const fileTypeInfo = getFileTypeInfo(file.name)
                    return (
                      <div
                        key={file.id}
                        className="flex items-center gap-4 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                      >
                        <div className={cn("p-2 rounded-lg", fileTypeInfo.color)}>
                          <fileTypeInfo.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{file.name}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <Badge variant="outline" className="text-xs">
                              {fileTypeInfo.type}
                            </Badge>
                            <span>{formatFileSize(file.size)}</span>
                            {file.pages && <span>{file.pages} pages</span>}
                            {file.rows && <span>{file.rows} rows</span>}
                            <span>{file.uploadedAt.toLocaleTimeString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeFile(file.id)
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Optional Metadata */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Optional Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="brokerNotes">Broker Notes</Label>
                <Textarea
                  id="brokerNotes"
                  value={metadata.brokerNotes}
                  onChange={(e) => setMetadata((prev) => ({ ...prev, brokerNotes: e.target.value }))}
                  placeholder="Add any relevant notes about this submission"
                  className="mt-1"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="renewalDate">Renewal Date</Label>
                  <Input
                    id="renewalDate"
                    type="date"
                    value={metadata.renewalDate}
                    onChange={(e) => setMetadata((prev) => ({ ...prev, renewalDate: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="competitorQuote">Competitor Quote Reference</Label>
                  <Input
                    id="competitorQuote"
                    value={metadata.competitorQuote}
                    onChange={(e) => setMetadata((prev) => ({ ...prev, competitorQuote: e.target.value }))}
                    placeholder="Reference number or carrier name"
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button variant="outline" className="bg-transparent">
          Back: Client Intake
        </Button>
        <Button disabled={uploadedFiles.length === 0 || isExtracting} onClick={handleExtractWithAI}>
          {isExtracting ? "Extracting..." : "Extract with AI"}
        </Button>
      </div>
    </div>
  )
}
