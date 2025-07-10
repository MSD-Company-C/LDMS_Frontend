"use client";

import { use } from "react";
import Link from "next/link";
import { useState } from "react";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Package,
  Clock,
  AlertTriangle,
  Camera,
  DollarSign,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

const driverNavItems = [
  {
    title: "Assignments",
    href: "/driver/assignments",
    icon: <Package className="h-4 w-4 mr-2" />,
  },
  {
    title: "Status Updates",
    href: "/driver/status",
    icon: <Clock className="h-4 w-4 mr-2" />,
  },
  {
    title: "Proof of Delivery",
    href: "/driver/pod",
    icon: <Camera className="h-4 w-4 mr-2" />,
  },
  {
    title: "Report Issue",
    href: "/driver/issues",
    icon: <AlertTriangle className="h-4 w-4 mr-2" />,
  },
  {
    title: "Earnings",
    href: "/driver/earnings",
    icon: <DollarSign className="h-4 w-4 mr-2" />,
  },
];

export default function StatusUpdatePage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = use(params);
  const [notes, setNotes] = useState("");

  const handleUpdateStatus = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "Order Delivered",
          }),
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Failed to update status:", errorText);
        alert("Failed to update order status.");
        return;
      }

      alert("Order marked as Delivered.");
    } catch (error) {
      console.error("Network error:", error);
      alert("Error updating order status.");
    }
  };

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
            <h1 className="text-2xl font-bold tracking-tight">
              Update Status: {orderId}
            </h1>
            <p className="text-muted-foreground">
              Confirm delivery status update
            </p>
          </div>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Delivery Status Update</CardTitle>
            <CardDescription>
              You are about to mark this delivery as completed.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <RadioGroup defaultValue="delivered" disabled>
              <div className="flex items-start space-x-3 space-y-0">
                <RadioGroupItem value="delivered" id="delivered" />
                <div className="grid gap-1.5">
                  <Label htmlFor="delivered" className="font-medium">
                    <div className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Order Delivered
                    </div>
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    The package was successfully delivered.
                  </p>
                </div>
              </div>
            </RadioGroup>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Optional notes (not saved)"
                className="min-h-[100px]"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Proof of Delivery</Label>
              <div className="flex flex-col gap-2">
                <p className="text-sm text-muted-foreground">
                  You can optionally provide proof of delivery on the next page.
                </p>
                <Link href={`/driver/pod/${orderId}`}>
                  <Button variant="outline" className="w-full">
                    <Camera className="mr-2 h-4 w-4" />
                    Go to Proof of Delivery
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-2 sm:flex-row">
            <Button className="w-full sm:w-auto" onClick={handleUpdateStatus}>
              Update Status
            </Button>
            <Link
              href={`/driver/delivery/${orderId}`}
              className="w-full sm:w-auto"
            >
              <Button variant="outline" className="w-full">
                Cancel
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
}
