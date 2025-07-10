"use client";

import { useState, useEffect } from "react";
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

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Truck,
  Users,
  AlertTriangle,
  MoreHorizontal,
  UserPlus,
  Search,
} from "lucide-react";

// Admin navigation items
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

// Driver interface (only fields backend sends)
interface Driver {
  driverId: number;
  driverName: string;
  vehicle: string;
  location: string | null;
}
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export default function DriversPage() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch drivers from backend with JWT token
  useEffect(() => {
    async function fetchDrivers() {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token"); // get JWT token from localStorage

        if (!token) {
          setError("No authorization token found. Please login.");
          setLoading(false);
          return;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/drivers`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            credentials: "include", // if your backend uses cookies for sessions (optional)
          }
        );

        if (!res.ok) {
          const text = await res.text();
          setError(`Failed to fetch drivers: ${res.status} ${text}`);
          setLoading(false);
          return;
        }

        const data: Driver[] = await res.json();
        setDrivers(data);
      } catch (err) {
        setError("Error fetching drivers: " + (err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchDrivers();
  }, []);

  // Filter drivers by search query
  const filteredDrivers = drivers.filter(
    (driver) =>
      driver.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.driverId.toString().includes(searchQuery)
  );

  return (
    <DashboardLayout navItems={adminNavItems} userType="admin">
      <div className="container px-9 py-6 max-w-7xl mx-auto w-full">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Drivers</h1>
            <p className="text-muted-foreground">
              Manage and track your delivery drivers
            </p>
          </div>
          <div></div>
        </div>

        <div className="mb-6 relative max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search drivers..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {loading && <p>Loading drivers...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {/* Table + Side Details */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Table */}
          <div className="w-full lg:flex-[2] rounded-md border bg-white shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Driver ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDrivers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      No drivers found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDrivers.map((driver) => (
                    <TableRow
                      key={driver.driverId}
                      onClick={() => setSelectedDriver(driver)}
                      className="cursor-pointer"
                    >
                      <TableCell className="font-medium">
                        {driver.driverId}
                      </TableCell>
                      <TableCell>{driver.driverName}</TableCell>
                      <TableCell>{driver.vehicle}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View details</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Driver Details */}
          {selectedDriver && (
            <div className="w-full lg:flex-[1] min-h-[200px]">
              <Card className="shadow-sm border bg-white">
                <CardHeader>
                  <CardTitle>Driver Details</CardTitle>
                  <CardDescription>Selected driver information</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    <strong>ID:</strong> {selectedDriver.driverId}
                  </p>
                  <p>
                    <strong>Name:</strong> {selectedDriver.driverName}
                  </p>
                  <p>
                    <strong>Vehicle:</strong> {selectedDriver.vehicle}
                  </p>
                  <p>
                    <strong>Location:</strong>{" "}
                    {selectedDriver.location ?? "Not available"}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
