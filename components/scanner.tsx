"use client"

import { useState, useEffect } from "react"
import { ScanLine, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface ScannerProps {
  onScan?: (code: string) => void
  placeholder?: string
  className?: string
}

export function Scanner({ onScan, placeholder = "Scan or enter barcode...", className = "" }: ScannerProps) {
  const { toast } = useToast()
  const [code, setCode] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [scanStatus, setScanStatus] = useState<"idle" | "scanning" | "success" | "error">("idle")

  const handleScan = () => {
    if (!code) return

    setIsScanning(true)
    setScanStatus("scanning")

    // Simulate scanning process
    setTimeout(() => {
      const success = Math.random() > 0.2 // 80% success rate for demo

      if (success) {
        setScanStatus("success")
        toast({
          title: "Scan Successful",
          description: `Code ${code} scanned successfully`,
        })
        if (onScan) onScan(code)
      } else {
        setScanStatus("error")
        toast({
          title: "Scan Failed",
          description: "Unable to process this code. Please try again.",
          variant: "destructive",
        })
      }

      // Reset after a delay
      setTimeout(() => {
        setIsScanning(false)
        setScanStatus("idle")
        setCode("")
      }, 1500)
    }, 1000)
  }

  // Handle keyboard input for barcode scanners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && code) {
        handleScan()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [code])

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="space-y-2">
        <Label htmlFor="barcode">Barcode / QR Code</Label>
        <div className="flex gap-2">
          <Input
            id="barcode"
            placeholder={placeholder}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={isScanning}
            autoFocus
          />
          <Button onClick={handleScan} disabled={!code || isScanning}>
            {scanStatus === "scanning" ? (
              <ScanLine className="mr-2 h-4 w-4 animate-pulse" />
            ) : scanStatus === "success" ? (
              <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
            ) : scanStatus === "error" ? (
              <AlertCircle className="mr-2 h-4 w-4 text-red-500" />
            ) : (
              <ScanLine className="mr-2 h-4 w-4" />
            )}
            {scanStatus === "scanning" ? "Scanning..." : "Scan"}
          </Button>
        </div>
      </div>

      <div className="scanner-container">
        <div className="scanner-animation"></div>
        <ScanLine className="h-16 w-16 text-primary/50 mb-4" />
        <p className="text-center text-muted-foreground">
          Position the barcode in front of your device's camera or use a handheld scanner
        </p>
      </div>
    </div>
  )
}
