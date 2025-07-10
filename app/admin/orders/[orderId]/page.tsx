"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart3,
  Package,
  Truck,
  AlertTriangle,
  ArrowLeft,
  Phone,
  User,
  Mail,
  MapPin,
  Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const adminNavItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: <BarChart3 className="h-4 w-4 mr-2" />,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: <Package className="h-4 w-4 mr-2" />,
  },
  {
    title: "Drivers",
    href: "/admin/drivers",
    icon: <Truck className="h-4 w-4 mr-2" />,
  },
  {
    title: "Issues",
    href: "/admin/issues",
    icon: <AlertTriangle className="h-4 w-4 mr-2" />,
  },
];

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params?.orderId as string;

  const [orderData, setOrderData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("JWT token not found");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders/${orderId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch order");

        const data = await response.json();
        setOrderData(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const getStatusBadge = (status: string) => {
    const lower = status.toLowerCase();
    if (lower.includes("delivered"))
      return (
        <Badge className="bg-green-50 text-green-700 border-green-200">
          Delivered
        </Badge>
      );
    if (lower.includes("transit"))
      return (
        <Badge className="bg-blue-50 text-blue-700 border-blue-200">
          In Transit
        </Badge>
      );
    if (lower.includes("processing"))
      return (
        <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200">
          Processing
        </Badge>
      );
    if (lower.includes("scheduled"))
      return (
        <Badge className="bg-purple-50 text-purple-700 border-purple-200">
          Scheduled
        </Badge>
      );
    if (lower.includes("fail"))
      return (
        <Badge className="bg-red-50 text-red-700 border-red-200">
          Failed Delivery
        </Badge>
      );
    if (lower.includes("cancel"))
      return (
        <Badge className="bg-gray-50 text-gray-700 border-gray-200">
          Cancelled
        </Badge>
      );
    return <Badge>{status}</Badge>;
  };

  const renderTimestampRow = (
    label: string,
    value?: string | null,
    key?: string
  ) => {
    if (!value) {
      return renderYellow(label, "Pending", key);
    }

    const timestampDate = new Date(value);
    const now = new Date();

    if (timestampDate > now) {
      return renderYellow(label, "Pending", key);
    }

    return renderGreen(label, value, key);
  };

  const renderGreen = (label: string, value: string, key?: string) => (
    <div
      key={key}
      className="flex items-start gap-2 p-2 border rounded-md bg-green-50 border-green-200"
    >
      <Clock className="h-4 w-4 mt-0.5 text-green-700" />
      <div>
        <p className="font-medium text-green-700">{label}</p>
        <p className="text-sm text-green-700">{value}</p>
      </div>
    </div>
  );

  const renderYellow = (label: string, value: string, key?: string) => (
    <div
      key={key}
      className="flex items-start gap-2 p-2 border rounded-md bg-yellow-50 border-yellow-200"
    >
      <Clock className="h-4 w-4 mt-0.5 text-yellow-700" />
      <div>
        <p className="font-medium text-yellow-700">{label}</p>
        <p className="text-sm text-yellow-700">{value}</p>
      </div>
    </div>
  );

  if (loading) {
    return (
      <DashboardLayout navItems={adminNavItems} userType="admin">
        <div className="container py-6">Loading order details...</div>
      </DashboardLayout>
    );
  }

  if (error || !orderData) {
    return (
      <DashboardLayout navItems={adminNavItems} userType="admin">
        <div className="container py-6 text-red-600">
          Error loading order: {error || "Order not found"}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout navItems={adminNavItems} userType="admin">
      <div className="container py-6 space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/orders">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Order: {orderId}</h1>
          <span className="ml-auto flex items-center gap-2">
            {orderData.status && getStatusBadge(orderData.status)}
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Driver Info */}
          <Card>
            <CardHeader>
              <CardTitle>Driver Information</CardTitle>
              <CardDescription>Assigned driver for this order</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  <Truck className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">{orderData.driver?.driverName}</p>
                  <p className="text-sm text-muted-foreground">
                    ID: {orderData.driver?.driverId}
                  </p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">Vehicle</p>
                  <p className="text-muted-foreground">
                    {orderData.driver?.vehicle || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-muted-foreground">
                    {orderData.driver?.location || "N/A"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Info */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">
                    {orderData.customer?.customerName || "N/A"}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-sm text-muted-foreground">
                    {orderData.customer?.customerAddress}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">
                    {orderData.customer?.customerPhone}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">
                    {orderData.customer?.customerEmail}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Delivery Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Order Timeline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                label: "Order Placed",
                timestamp: orderData.orderPlaced?.displayTimestamp,
              },
              {
                label: "Order Processing",
                timestamp: orderData.orderProcessing?.displayTimestamp,
              },
              {
                label: "Out for Delivery",
                timestamp: orderData.orderOutForDelivery?.displayTimestamp,
              },
              {
                label: "Delivered",
                timestamp: orderData.orderDelivered?.displayTimestamp,
              },
              {
                label: "Estimated Delivery",
                timestamp: orderData.estimatedDelivery,
              },
            ].map(({ label, timestamp }) =>
              renderTimestampRow(label, timestamp, label)
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
