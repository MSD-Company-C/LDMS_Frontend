"use client"

import { useState } from "react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CameraCapture } from "@/components/camera-capture"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {
  Package,
  Clock,
  AlertTriangle,
  Camera,
  DollarSign,
  ArrowLeft,
  CheckCircle2,
  Pen,
  Upload,
  ImageIcon,
} from "lucide-react"

// Driver navigation items
const driverNavItems = [
  { title: "Assignments", href: "/driver/assignments", icon: <Package className="h-4 w-4 mr-2" /> },
  { title: "Status Updates", href: "/driver/status", icon: <Clock className="h-4 w-4 mr-2" /> },
  { title: "Proof of Delivery", href: "/driver/pod", icon: <Camera className="h-4 w-4 mr-2" /> },
  { title: "Report Issue", href: "/driver/issues", icon: <AlertTriangle className="h-4 w-4 mr-2" /> },
  { title: "Earnings", href: "/driver/earnings", icon: <DollarSign className="h-4 w-4 mr-2" /> },
]

interface ProofOfDeliveryPageProps {
  params: {
    orderId: string
  }
}

export default function ProofOfDeliveryPage({ params }: ProofOfDeliveryPageProps) {
  const { orderId } = params
  const { toast } = useToast()
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [signature, setSignature] = useState<string | null>(null)
  const [recipientName, setRecipientName] = useState("")
  const [notes, setNotes] = useState("")

  const handleCapture = (image: string) => {
    setCapturedImage(image)
    toast({
      title: "Image Captured",
      description: "Proof of delivery image has been captured successfully.",
    })
  }

  const handleSubmit = () => {
    if (!capturedImage && !signature) {
      toast({
        title: "Missing Information",
        description: "Please capture an image or collect a signature before submitting.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Proof of Delivery Submitted",
      description: "Your proof of delivery has been successfully submitted.",
    })

    // In a real app, this would submit to an API
    setTimeout(() => {
      window.location.href = "/driver/assignments"
    }, 1500)
  }

  return (
    <DashboardLayout navItems={driverNavItems} userType="driver">
      <div className="container py-6">
        <div className="mb-6 flex items-center gap-2">
          <Link href={`/driver/delivery/${orderId}`}>
            <Button variant="outline" size="icon" className="mr-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Proof of Delivery: {orderId}</h1>
            <p className="text-muted-foreground">Capture photo or signature as proof of delivery</p>
          </div>
        </div>

        <Card className="max-w-3xl mx-auto">
          <CardHeader className="bg-primary/5">
            <CardTitle>Capture Proof of Delivery</CardTitle>
            <CardDescription>
              Please capture a photo of the delivered package or collect recipient's signature
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs defaultValue="photo" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="photo">
                  <Camera className="mr-2 h-4 w-4" />
                  Photo
                </TabsTrigger>
                <TabsTrigger value="signature">
                  <Pen className="mr-2 h-4 w-4" />
                  Signature
                </TabsTrigger>
              </TabsList>
              <TabsContent value="photo" className="mt-4 space-y-4">
                <CameraCapture onCapture={handleCapture} />

                <div className="space-y-2 mt-4">
                  <Label htmlFor="photo-notes">Additional Notes</Label>
                  <Textarea
                    id="photo-notes"
                    placeholder="Add any notes about the delivery..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </TabsContent>
              <TabsContent value="signature" className="mt-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="recipient-name">Recipient Name</Label>
                  <Input
                    id="recipient-name"
                    placeholder="Enter recipient's name"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                  />
                </div>

                <div className="border-2 border-dashed border-primary/50 rounded-lg p-4 h-[200px] flex flex-col items-center justify-center">
                  {signature ? (
                    <div className="relative w-full h-full">
                      <img
                        src={signature || "/placeholder.svg"}
                        alt="Signature"
                        className="w-full h-full object-contain"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute bottom-2 right-2"
                        onClick={() => setSignature(null)}
                      >
                        Clear
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Pen className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-center text-muted-foreground">Tap here to collect recipient's signature</p>
                      <Button className="mt-4" onClick={() => setSignature("/placeholder.svg?height=200&width=400")}>
                        Capture Signature
                      </Button>
                    </>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signature-notes">Additional Notes</Label>
                  <Textarea
                    id="signature-notes"
                    placeholder="Add any notes about the delivery..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 sm:flex-row">
            <Button className="w-full sm:w-auto" onClick={handleSubmit}>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Submit Proof of Delivery
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">
              <Upload className="mr-2 h-4 w-4" />
              Upload from Gallery
            </Button>
          </CardFooter>
        </Card>

        <Card className="max-w-3xl mx-auto mt-6">
          <CardHeader>
            <CardTitle>Why Proof of Delivery Matters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="font-medium">Verification</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Confirms that the package was delivered to the correct recipient.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <ImageIcon className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="font-medium">Documentation</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Provides visual evidence of the condition and location of the delivered package.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <AlertTriangle className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="font-medium">Dispute Resolution</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Helps resolve any disputes about whether a package was delivered.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
