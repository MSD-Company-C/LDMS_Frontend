"use client"

import { useState, useRef } from "react"
import { Camera, ImageIcon, RefreshCw, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface CameraCaptureProps {
  onCapture?: (image: string) => void
  className?: string
}

export function CameraCapture({ onCapture, className = "" }: CameraCaptureProps) {
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [cameraActive, setCameraActive] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraActive(true)
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
      setCameraActive(false)
    }
  }

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d")
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth
        canvasRef.current.height = videoRef.current.videoHeight
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)

        const imageData = canvasRef.current.toDataURL("image/png")
        setCapturedImage(imageData)
        stopCamera()

        if (onCapture) {
          onCapture(imageData)
        }
      }
    }
  }

  const resetCapture = () => {
    setCapturedImage(null)
    startCamera()
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          {capturedImage ? (
            <div className="relative">
              <ImageIcon src={capturedImage || "/placeholder.svg"} alt="Captured" className="w-full h-auto" />
              <div className="absolute bottom-4 right-4 flex gap-2">
                <Button size="sm" variant="secondary" onClick={resetCapture}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Retake
                </Button>
                <Button size="sm" onClick={() => onCapture && onCapture(capturedImage)}>
                  <Check className="mr-2 h-4 w-4" />
                  Confirm
                </Button>
              </div>
            </div>
          ) : (
            <div className="relative aspect-video bg-muted flex items-center justify-center">
              {cameraActive ? (
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center justify-center p-8">
                  <Camera className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-center text-muted-foreground">Camera inactive</p>
                  <Button className="mt-4" onClick={startCamera}>
                    <Camera className="mr-2 h-4 w-4" />
                    Start Camera
                  </Button>
                </div>
              )}
              {cameraActive && (
                <Button className="absolute bottom-4 right-4" onClick={captureImage}>
                  <Camera className="mr-2 h-4 w-4" />
                  Capture
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}
