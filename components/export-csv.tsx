"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface ExportCSVProps {
  data: any[]
  filename?: string
  buttonText?: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function ExportCSV({
  data,
  filename = "export.csv",
  buttonText = "Export CSV",
  variant = "outline",
  size = "sm",
  className,
}: ExportCSVProps) {
  const [isExporting, setIsExporting] = useState(false)
  const { toast } = useToast()

  const convertToCSV = (objArray: any[]) => {
    if (objArray.length === 0) return ""

    // Get headers from first object
    const headers = Object.keys(objArray[0])

    // Create CSV header row
    let csv = headers.join(",") + "\n"

    // Add data rows
    objArray.forEach((obj) => {
      const values = headers.map((header) => {
        const value = obj[header]
        // Handle values that contain commas, quotes, or newlines
        if (value === null || value === undefined) {
          return '""'
        }
        const stringValue = String(value)
        if (stringValue.includes(",") || stringValue.includes('"') || stringValue.includes("\n")) {
          return `"${stringValue.replace(/"/g, '""')}"`
        }
        return `"${stringValue}"`
      })
      csv += values.join(",") + "\n"
    })

    return csv
  }

  const downloadCSV = () => {
    setIsExporting(true)

    try {
      // Convert data to CSV
      const csvContent = convertToCSV(data)

      // Create a blob with the CSV data
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })

      // Create a download link
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.setAttribute("href", url)
      link.setAttribute("download", filename)
      link.style.visibility = "hidden"

      // Add link to document, click it, and remove it
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast({
        title: "Export Successful",
        description: `${filename} has been downloaded.`,
        duration: 3000,
      })
    } catch (error) {
      console.error("Export failed:", error)
      toast({
        title: "Export Failed",
        description: "There was an error exporting your data. Please try again.",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={downloadCSV}
      disabled={isExporting || data.length === 0}
      className={className}
    >
      <Download className="h-4 w-4 mr-2" />
      {buttonText}
      {isExporting && "..."}
    </Button>
  )
}
