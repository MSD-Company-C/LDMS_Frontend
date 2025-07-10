"use client";

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
import { Scanner } from "@/components/scanner";
import { Warehouse, Truck, ScanLine, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Navigation items for warehouse dashboard
const warehouseNavItems = [
  {
    title: "Home",
    href: "/warehouse/home",
    icon: <Warehouse className="h-4 w-4 mr-2" />,
  },
  {
    title: "Scan Packages",
    href: "/warehouse/scan",
    icon: <ScanLine className="h-4 w-4 mr-2" />,
  },
  {
    title: "Upcoming Pickups",
    href: "/warehouse/pickups",
    icon: <Truck className="h-4 w-4 mr-2" />,
  },
  {
    title: "Issues",
    href: "/warehouse/issues",
    icon: <AlertTriangle className="h-4 w-4 mr-2" />,
  },
];

// Helper to get token from localStorage
function getToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
}
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function ScanOrdersPage() {
  const { toast } = useToast();

  // For manual entry dialog and input
  const [isManualDialogOpen, setIsManualDialogOpen] = useState(false);
  const [orderIdInput, setOrderIdInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle manual submit with backend status check & update
  const handleManualSubmit = async () => {
    if (!orderIdInput.trim()) {
      toast({
        title: "Order ID Required",
        description: "Please enter a valid Order ID.",
        variant: "destructive",
      });
      return;
    }

    const token = getToken();
    if (!token) {
      toast({
        title: "Unauthorized",
        description: "Login required. Token missing.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Fetch current order details
      const fetchResp = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders/${orderIdInput}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!fetchResp.ok) {
        toast({
          title: "Order Not Found",
          description: `No order found with ID ${orderIdInput}`,
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      const order = await fetchResp.json();

      if (order.status !== "Order Processing") {
        toast({
          title: "Invalid Order Status",
          description: `Order ID ${orderIdInput} is not in 'Order Processing' status.`,
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Update order status to "Out for Delivery"
      const updateResp = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders/${orderIdInput}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: "Out for Delivery" }),
        }
      );

      if (!updateResp.ok) {
        const errorText = await updateResp.text();
        throw new Error(errorText || "Failed to update order status");
      }

      const updatedOrder = await updateResp.json();

      toast({
        title: "Success",
        description: `Order ${orderIdInput} status updated to ${updatedOrder.status}.`,
      });

      setOrderIdInput("");
      setIsManualDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Frontend-only scanner handler (no backend)
  const handleScan = (code: string) => {
    toast({
      title: "Order Scanned",
      description: `Scanned Order ID ${code} (no backend action)`,
    });
  };

  return (
    <DashboardLayout navItems={warehouseNavItems} userType="warehouse">
      <div className="container py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Scan Orders</h1>
          <p className="text-muted-foreground">
            Scan or manually mark orders as Out for Delivery
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-4xl">
          {/* Barcode Scanner (frontend only) */}
          <Card>
            <CardHeader className="bg-primary/5">
              <CardTitle>Barcode Scanner</CardTitle>
              <CardDescription>
                Scan Order ID using a scanner (no backend)
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Scanner onScan={handleScan} />
            </CardContent>
            <CardFooter>
              <Dialog
                open={isManualDialogOpen}
                onOpenChange={setIsManualDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    Manual Order ID Entry
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Manual Order ID Entry</DialogTitle>
                    <DialogDescription>
                      Enter the Order ID to mark as Out for Delivery.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="orderId" className="text-right">
                        Order ID
                      </Label>
                      <Input
                        id="orderId"
                        placeholder="e.g. 1234"
                        className="col-span-3"
                        value={orderIdInput}
                        onChange={(e) => setOrderIdInput(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={handleManualSubmit}
                      disabled={loading}
                      type="submit"
                    >
                      {loading ? "Updating..." : "Submit"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>

          {/* Placeholder or other content can go here */}
          <Card>
            <CardHeader className="bg-primary/5">
              <CardTitle>Info</CardTitle>
              <CardDescription>
                Use the barcode scanner or manually update order ID.
              </CardDescription>
            </CardHeader>
            <CardContent>{/* Additional info here if needed */}</CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
