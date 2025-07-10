"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Truck } from "lucide-react";

// Warehouse navigation items (kept as is)
const warehouseNavItems = [
  {
    title: "Home",
    href: "/warehouse/home",
    icon: <Truck className="h-4 w-4 mr-2" />,
  },
  {
    title: "Scan Packages",
    href: "/warehouse/scan",
    icon: <Truck className="h-4 w-4 mr-2" />,
  },
  {
    title: "Pending Scans",
    href: "/warehouse/pickups",
    icon: <Truck className="h-4 w-4 mr-2" />,
  },
];

// Update Order type to match your backend response structure
type Order = {
  id: string;
  driver: {
    driverName: string;
  } | null;
  scheduledTime: string;
  status:
    | "Order Placed"
    | "Order Processing"
    | "Out for Delivery"
    | "Order Delivered";
};
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function PendingScansPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const token = localStorage.getItem(`token`);
        if (!token) {
          console.error("No token found, user not authenticated");
          return;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/warehouse/all-orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch orders");
        const data: Order[] = await res.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchOrders();
  }, []);

  // Filter to only show orders with status "Order Processing"
  const processingOrders = orders.filter(
    (order) => order.status === "Order Processing"
  );

  const getBadge = (status: string) => {
    const statusStyles: Record<string, string> = {
      "Order Placed": "bg-gray-50 text-gray-700 border-gray-200",
      "Order Processing": "bg-yellow-50 text-yellow-700 border-yellow-200",
      "Out for Delivery": "bg-blue-50 text-blue-700 border-blue-200",
      "Order Delivered": "bg-green-50 text-green-700 border-green-200",
    };
    return (
      <Badge variant="outline" className={statusStyles[status] || ""}>
        {status}
      </Badge>
    );
  };

  return (
    <DashboardLayout navItems={warehouseNavItems} userType="warehouse">
      <div className="container py-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Pending Scans</h1>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Driver</TableHead>
              
              <TableHead>Status</TableHead>
              
            </TableRow>
          </TableHeader>
          <TableBody>
            {processingOrders.length > 0 ? (
              processingOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>
                    {order.driver?.driverName ?? "Unassigned"}
                  </TableCell>
                 
                  <TableCell>{getBadge(order.status)}</TableCell>
         
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No orders currently being processed.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </DashboardLayout>
  );
}
