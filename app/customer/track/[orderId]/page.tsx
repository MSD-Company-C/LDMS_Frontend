"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Hooks
import { useToast } from "@/hooks/use-toast";

// UI Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Custom Components
import { Logo } from "@/components/logo";
import { StatusBadge } from "@/components/status-badge";
import { Timeline } from "@/components/timeline";

interface TimelineItem {
  status: string;
  time: string;
  completed: boolean;
}
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export default function OrderTrackingPage() {
  const params = useParams();
  const orderId = params.orderId as string;
  const { toast } = useToast();

  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders/${orderId}`
        );
        if (!res.ok) throw new Error("Failed to fetch order data");
        const data = await res.json();
        setOrderData(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Could not fetch order data.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg">Loading order data...</p>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-red-500">Order not found</p>
      </div>
    );
  }

  const timeline: TimelineItem[] = [
    {
      status: "Order Placed",
      time: orderData.orderPlaced.displayTimestamp,
      completed: orderData.orderPlaced.completed,
    },
    {
      status: "Order Processing",
      time: orderData.orderProcessing.displayTimestamp,
      completed: orderData.orderProcessing.completed,
    },
    {
      status: "Out for Delivery",
      time: orderData.orderOutForDelivery.displayTimestamp,
      completed: orderData.orderOutForDelivery.completed,
    },
    {
      status: "Delivered",
      time: orderData.orderDelivered.displayTimestamp,
      completed: orderData.orderDelivered.completed,
    },
  ];

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Logo />
          <div className="ml-auto flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6 md:py-10">
        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">
            Tracking Order: {orderId}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-muted-foreground">Current Status:</p>
            <StatusBadge status={orderData.status} />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left column: Timeline + Rating */}
          <div className="md:col-span-2 space-y-6">
            {/* Timeline */}
            <Card>
              <CardHeader className="bg-primary/5">
                <CardTitle>Delivery Status</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <Timeline items={timeline} />
              </CardContent>
            </Card>

            {/* Rating Card */}
            <Card>
              <CardHeader>
                <CardTitle>Rate Your Experience</CardTitle>
                <CardDescription>Let us know how we're doing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className="text-2xl text-yellow-400 hover:scale-110 transition-transform"
                      onClick={() =>
                        toast({
                          title: "Thank You for Your Feedback",
                          description: `You rated your delivery experience ${star} stars.`,
                        })
                      }
                    >
                      ★
                    </button>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full">
                      Submit Detailed Feedback
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delivery Feedback</DialogTitle>
                      <DialogDescription>
                        Your feedback helps us improve our service.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="feedback">Your Feedback</Label>
                        <Textarea
                          id="feedback"
                          placeholder="Tell us about your delivery experience..."
                          rows={4}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="submit"
                        onClick={() =>
                          toast({
                            title: "Feedback Submitted",
                            description:
                              "Thank you for your valuable feedback!",
                          })
                        }
                      >
                        Submit Feedback
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          </div>

          {/* Right column: Delivery Details */}
          <div className="space-y-6">
            {/* Delivery Info */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium text-sm">Recipient</h3>
                  <p className="text-sm">{orderData.customer.customerName}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm">Delivery Address</h3>
                  <p className="text-sm">
                    {orderData.customer.customerAddress}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-sm">Contact</h3>
                  <p className="text-sm">{orderData.customer.customerPhone}</p>
                </div>
              </CardContent>
              <CardFooter>

              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
