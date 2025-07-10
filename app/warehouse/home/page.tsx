"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Warehouse, Truck, ScanLine, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

type PickupOrder = {
  id: number;
  status: string;
  estimatedDelivery: string;
  driver: {
    driverId: number;
    driverName: string;
    vehicle: string;
    location: string | null;
  } | null;
  orderPlaced: {
    timestamp: string;
    completed: boolean;
    displayTimestamp: string;
  };
  orderProcessing: {
    timestamp: string | null;
    completed: boolean;
    displayTimestamp: string;
  };
  orderOutForDelivery: {
    timestamp: string | null;
    completed: boolean;
    displayTimestamp: string;
  };
  orderDelivered: {
    timestamp: string | null;
    completed: boolean;
    displayTimestamp: string;
  };
};
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function WarehouseHomePage() {
  const [pickupSchedule, setPickupSchedule] = useState<PickupOrder[]>([]);
  const [pendingScanOrders, setPendingScanOrders] = useState<PickupOrder[]>([]);
  const [upcomingPickups, setUpcomingPickups] = useState<PickupOrder[]>([]);

  useEffect(() => {
    const fetchPickups = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Warehouse token:", token);
        if (!token) {
          console.error("No token found for warehouse API call");
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
          const text = await res.text();
          console.error(
            "Fetch failed with status:",
            res.status,
            "Response:",
            text
          );
          throw new Error(`Failed to fetch pickups: ${res.status}`);
        }

        const data: PickupOrder[] = await res.json();

        // Filter orders based on status (example)
        const toBeScanned = data.filter(
          (order) =>
            order.status === "Order Processing" 
            
        );

        const outForDelivery = data.filter(
          (order) => order.status === "Out for Delivery"
        );

        setPendingScanOrders(toBeScanned);
        setUpcomingPickups(outForDelivery);
        setPickupSchedule(outForDelivery);
      } catch (error) {
        console.error("Error fetching pickup schedule:", error);
      }
    };

    fetchPickups();
  }, []);

  return (
    <DashboardLayout navItems={warehouseNavItems} userType="warehouse">
      <div className="container py-6">
        <div className="mb-8 space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">
            Warehouse Operations
          </h1>
          <p className="text-muted-foreground">
            Welcome to the warehouse management dashboard. Manage packages,
            pickups, and inventory.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Pending Scan */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Scan
              </CardTitle>
              <ScanLine className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {pendingScanOrders.length}
              </div>
              <p className="text-xs text-muted-foreground">
                Awaiting processing
              </p>
            </CardContent>
          </Card>

          {/* Upcoming Pickups */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Upcoming Pickups
              </CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingPickups.length}</div>
              <p className="text-xs text-muted-foreground">
                Scheduled for today
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Today's Pickup Schedule */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common warehouse tasks</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Link href="/warehouse/scan">
                <Button className="w-full justify-start" variant="outline">
                  <ScanLine className="mr-2 h-4 w-4" />
                  Scan New Package
                </Button>
              </Link>
              <Link href="/warehouse/pickups">
                <Button className="w-full justify-start" variant="outline">
                  <Truck className="mr-2 h-4 w-4" />
                  View Pickups
                </Button>
              </Link>
              <Link href="/warehouse/issues/report">
                <Button className="w-full justify-start" variant="outline">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Report Issue
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Today's Pickup Schedule</CardTitle>
              <CardDescription>
                Drivers arriving for package pickup
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingPickups.length > 0 ? (
                  upcomingPickups.map((order, index) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                          <Truck className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">
                            Driver {index + 1}:{" "}
                            {order.driver?.driverName || "Unknown"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            1 package for pickup
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <Badge
                          variant="outline"
                          className="bg-yellow-50 text-yellow-700 border-yellow-200"
                        >
                          {index === 0
                            ? "Arriving Now"
                            : new Date(
                                order.orderOutForDelivery.timestamp || ""
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          Route #{1000 + index}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground">
                    No pickups scheduled for today.
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/warehouse/pickups" className="w-full">
                <Button variant="outline" className="w-full">
                  View All Pickups
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
