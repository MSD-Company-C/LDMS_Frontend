"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExportCSV } from "@/components/export-csv";

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
  MoreHorizontal,
  UserPlus,
  Search,
  Filter,
} from "lucide-react";

// Admin navigation items
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

  {
    title: "Users",
    href: "/admin/users",
    icon: <Users className="h-4 w-4 mr-2" />,
  },
];


type Order = {
  id: number;
  customer: { customerName: string; customerAddress: string };
  placedTime: string;
  status: string;
  driver?: { driverName: string };
  amount: number;
};
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;


async function handleAssign(orderId: number) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("JWT token not found");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders/${orderId}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "Order Processing" }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to assign driver");
    }

    const updatedOrder = await response.json();
    console.log("Order updated:", updatedOrder);
    alert("Driver assigned successfully!");
    window.location.reload(); // or call refreshOrders()
  } catch (error) {
    console.error("Error assigning driver:", error);
    alert("Failed to assign driver. Please try again.");
  }
}



export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found. User is not authenticated.");
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const text = await response.text(); // to inspect backend error
          throw new Error(`Error ${response.status}: ${text}`);
        }

        // Try to parse JSON only if there's a body
        const text = await response.text();
        const data = text ? JSON.parse(text) : [];
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);
  


  
  
  const filtered = orders
    .filter((o) => {
      const matchText = [
        o.id.toString(),
        o.customer.customerName,
        o.customer.customerAddress,
      ];
      return matchText.join(" ").toLowerCase().includes(search.toLowerCase());
    })
    .filter(
      (o) => statusFilter === "all" || o.status.toLowerCase() === statusFilter
    );

  const getBadge = (s: string) => {
    const styl: Record<string, string> = {
      "order placed": "bg-gray-50 text-gray-700 border-gray-200",
      "order processing": "bg-yellow-50 text-yellow-700 border-yellow-200",
      "out for delivery": "bg-blue-50 text-blue-700 border-blue-200",
      "order delivered": "bg-green-50 text-green-700 border-green-200",
    };
    return (
      <Badge variant="outline" className={styl[s.toLowerCase()] || ""}>
        {s}
      </Badge>
    );
  };
  const flatOrders = orders.map((o) => ({
    id: o.id,
    customerName: o.customer.customerName,
    status: o.status,
    driverName: o.driver?.driverName || "Unassigned",
    customerAddress: o.customer.customerAddress,

  }));

  
  return (
    <DashboardLayout navItems={adminNavItems} userType="admin">
      <div className="container px-9 py-6 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-4">Orders</h1>

        <div className="flex gap-4 mb-4">
          <Input
            placeholder="Search…"
            className="flex-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <div className="flex items-center">
                <Filter className="mr-2 w-4 h-4" />
                Filter by status
              </div>
            </SelectTrigger>
            <SelectContent>
              {[
                "all",
                "order placed",
                "order processing",
                "out for delivery",
                "order delivered",
              ].map((st) => (
                <SelectItem key={st} value={st}>
                  {st.charAt(0).toUpperCase() + st.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <ExportCSV
            data={flatOrders}
            filename="orders.csv"
            buttonText="Export CSV"
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((o) => (
              <TableRow key={o.id}>
                <TableCell>
                  <Link
                    href={`/admin/orders/${o.id}`}
                    className="hover:underline"
                  >
                    {o.id}
                  </Link>
                </TableCell>
                <TableCell>{o.customer.customerName}</TableCell>
                <TableCell>{getBadge(o.status)}</TableCell>
                <TableCell>{o.driver?.driverName || "Unassigned"}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Link href={`/admin/orders/${o.id}`}>View details</Link>
                      </DropdownMenuItem>
                      {o.status === "Order Placed" && (
                        <DropdownMenuItem onClick={() => handleAssign(o.id)}>
                          Assign driver
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </DashboardLayout>
  );
}
function refreshOrders() {
  throw new Error("Function not implemented.");
}

