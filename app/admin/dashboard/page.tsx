"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/stats-card";
import { MapView } from "@/components/map-view";
import {
  BarChart3,
  Package,
  Truck,
  Users,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  FileBarChart,
  Warehouse,
  ShieldAlert,
  TrendingUp,
  Calendar,
  Zap,
} from "lucide-react";

const adminNavItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: <Users className="h-4 w-4 mr-2" />,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: <Truck className="h-4 w-4 mr-2" />,
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

interface Order {
  id: number;
  status: string;
  estimatedDelivery: string;
  orderPlaced: { completed: boolean };
  orderProcessing: { completed: boolean };
  orderOutForDelivery: { completed: boolean };
  orderDelivered: { completed: boolean };
  customer: { customerName: string };
}
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);

  const [placedCount, setPlacedCount] = useState(0);
  const [processedCount, setProcessedCount] = useState(0);
  const [outForDeliveryCount, setOutForDeliveryCount] = useState(0);
  const [deliveredCount, setDeliveredCount] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("JWT token not found");
          return;
        }
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) {
          const text = await res.text(); // instead of json()
          console.error(
            "Fetch failed with status:",
            res.status,
            "Response:",
            text
          );
          throw new Error("Failed to fetch orders");
        }
         console.log("Response:", res);
         console.log("Response Headers:", res.headers);
         console.log("Response Status:", res.status);
        const data = await res.json();

        setOrders(data);
        setRecentOrders(data.slice(0, 5));

        setPlacedCount(
          data.filter((o: Order) => o.orderPlaced?.completed).length
        );
        setProcessedCount(
          data.filter((o: Order) => o.orderProcessing?.completed).length
        );
        setOutForDeliveryCount(
          data.filter((o: Order) => o.orderOutForDelivery?.completed).length
        );
        setDeliveredCount(
          data.filter((o: Order) => o.orderDelivered?.completed).length
        );
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <DashboardLayout navItems={adminNavItems} userType="admin">
      <div className="container px-9 py-6 max-w-7xl mx-auto w-full">
        <div className="mb-8 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.reload()}
              >
                <Zap className="mr-2 h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>
          <p className="text-muted-foreground">
            Welcome to your admin dashboard. Here's an overview of your
            logistics operations.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Orders Placed"
            value={(
              placedCount -
              (processedCount -
                outForDeliveryCount +
                deliveredCount -
                deliveredCount) -
              (outForDeliveryCount - deliveredCount) -
              deliveredCount
            ).toString()}
            description="Orders that have been placed"
            icon={Clock}
          />
          <StatsCard
            title="Orders Processed"
            value={(
              processedCount -
              outForDeliveryCount +
              deliveredCount -
              deliveredCount
            ).toString()}
            description="Orders that are assigned drivers"
            icon={Zap}
          />
          <StatsCard
            title="Out For Delivery"
            value={(outForDeliveryCount - deliveredCount).toString()}
            description="Orders currently ready delivery"
            icon={Truck}
          />
          <StatsCard
            title="Delivered Orders"
            value={deliveredCount.toString()}
            description="Orders successfully delivered"
            icon={CheckCircle2}
          />
        </div>

        <div className="mt-6">
          <Tabs defaultValue="recent-orders">
            <TabsContent value="recent-orders" className="space-y-4 mt-4">
              <Card>
                <CardHeader className="bg-primary/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Recent Orders</CardTitle>
                      <CardDescription>
                        Latest orders in the system
                      </CardDescription>
                    </div>
                    <Link href="/admin/orders">
                      <Button variant="outline" size="sm">
                        View All
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.length > 0 ? (
                      [...recentOrders]
                        .sort((a, b) => b.id - a.id)
                        .map((order) => (
                          <div
                            key={order.id}
                            className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                          >
                            <div className="space-y-1">
                              <p className="font-medium">Order #{order.id}</p>
                              <p className="text-sm text-muted-foreground">
                                Customer: {order.customer.customerName}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">
                                {order.status}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                ETA: {order.estimatedDelivery}
                              </p>
                            </div>
                            <Button variant="ghost" size="icon">
                              <ArrowUpRight className="h-4 w-4" />
                            </Button>
                          </div>
                        ))
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No recent orders found.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4 overflow-hidden">
                  <CardHeader className="bg-primary/5">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Live Fleet Tracking</CardTitle>
                        <CardDescription>
                          Real-time location of all active drivers
                        </CardDescription>
                      </div>
                      <Button variant="outline" size="sm">
                        <TrendingUp className="mr-2 h-4 w-4" />
                        Analytics
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <MapView
                      markers={[
                        { lat: 40.7128, lng: -74.006, label: "Driver 1" },
                        { lat: 40.72, lng: -74.01, label: "Driver 2" },
                        { lat: 40.715, lng: -73.995, label: "Driver 3" },
                      ]}
                      className="h-[350px] w-full"
                    />
                  </CardContent>
                </Card>

                <Card className="lg:col-span-3">
                  <CardHeader className="bg-primary/5">
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>
                      Common tasks and operations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <Link href="/admin/orders">
                      <Button
                        className="w-full justify-start"
                        variant="outline"
                      >
                        <Truck className="mr-2 h-4 w-4" />
                        Assign Driver
                      </Button>
                    </Link>

                    <Link href="/admin/issues">
                      <Button
                        className="w-full justify-start"
                        variant="outline"
                      >
                        <ShieldAlert className="mr-2 h-4 w-4" />
                        Resolve Issues
                      </Button>
                    </Link>
                    <Link href="/admin/users">
                      <Button
                        className="w-full justify-start"
                        variant="outline"
                      >
                        <FileBarChart className="mr-2 h-4 w-4" />
                        All Users
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="issues" className="space-y-4 mt-4">
              {/* You can populate this later */}
            </TabsContent>

            <TabsContent value="performance" className="space-y-4 mt-4">
              {/* You can populate this later */}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
}
