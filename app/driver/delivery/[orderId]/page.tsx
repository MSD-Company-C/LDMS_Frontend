"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Package,
  User,
  MapPin,
  Phone,
  AlertTriangle,
  Clock,
  ArrowLeft,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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
    title: "Report Issue",
    href: "/driver/issues",
    icon: <Package className="h-4 w-4 mr-2" />,
  },
];

interface Customer {
  name: string;
  phone: string;
  address: string;
  notes?: string;
}

interface DeliveryData {
  id: string;
  status: string;
  estimatedDelivery: string;
  customer: Customer;
}
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export default function DeliveryDetailPage() {
  const { orderId } = useParams();

  const [deliveryData, setDeliveryData] = useState<DeliveryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId || Array.isArray(orderId)) {
      setError("Invalid order ID");
      setLoading(false);
      return;
    }

    async function fetchDeliveryData() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch order data (status: ${res.status})`);
        }

        const data = await res.json();

        const mappedData: DeliveryData = {
          id: data.id,
          status: data.status,
          estimatedDelivery: data.estimatedDelivery || "N/A",
          customer: {
            name: data.customer?.name || "Unknown",
            phone: data.customer?.phone || "Unknown",
            address: data.customer?.address || "Unknown",
            notes: data.customer?.notes || "",
          },
        };

        setDeliveryData(mappedData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchDeliveryData();
  }, [orderId]);

  if (loading) {
    return (
      <DashboardLayout navItems={driverNavItems} userType="driver">
        <div className="py-6 px-4 max-w-4xl mx-auto text-center">
          Loading...
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout navItems={driverNavItems} userType="driver">
        <div className="py-6 px-4 max-w-4xl mx-auto text-center text-red-600">
          Error: {error}
        </div>
      </DashboardLayout>
    );
  }

  if (!deliveryData) {
    return (
      <DashboardLayout navItems={driverNavItems} userType="driver">
        <div className="py-6 px-4 max-w-4xl mx-auto text-center">
          No delivery data found.
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout navItems={driverNavItems} userType="driver">
      <div className="py-6 px-4 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <Link href="/driver/assignments">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Delivery: {deliveryData.id}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-muted-foreground">
                {deliveryData.estimatedDelivery}
              </p>
              <Badge
                variant="outline"
                className="bg-blue-50 text-blue-700 border-blue-200"
              >
                {deliveryData.status}
              </Badge>
            </div>
          </div>
        </div>

        {/* Content: stacked cards */}
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="font-medium">{deliveryData.customer.name}</p>
              </div>
              <Separator />
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Delivery Address</p>
                  <p className="text-sm text-muted-foreground">
                    {deliveryData.customer.address}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">
                    {deliveryData.customer.phone}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href={`/driver/issues/report/${deliveryData.id}`}>
                <Button variant="outline" className="w-full justify-start">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Report an Issue
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start">
                <Clock className="mr-2 h-4 w-4" />
                Request Time Extension
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
