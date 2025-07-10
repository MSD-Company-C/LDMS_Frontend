"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Package,
  Clock,
  MapPin,
  User,
  Search,
  Filter,
  CheckCircle2,
} from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusBadge } from "@/components/status-badge";
import { Input } from "@/components/ui/input";

// Driver navigation items
const driverNavItems = [
  {
    title: "Assignments",
    href: "/driver/assignments",
    icon: <Package className="h-4 w-4 mr-2" />,
  },


  {
    title: "Report Issue",
    href: "/driver/issues",
    icon: <Package className="h-4 w-4 mr-2" />,
  }, // update icons accordingly
];

// Helper: render each assignment card
function renderAssignmentCards(assignments: any[]) {
  return assignments.map((assignment) => (
    <Card key={assignment.id} className="mb-4 dashboard-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{assignment.id}</CardTitle>
            <CardDescription>{assignment.estimatedDelivery}</CardDescription>
          </div>
          <StatusBadge status={assignment.status} />
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <User className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium">{assignment.customer.customerName}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">
                {assignment.customer.customerAddress}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex gap-2 w-full">
          <Link href={`/driver/delivery/${assignment.id}`} className="flex-1">
            <Button variant="default" className="w-full">
              View Details
            </Button>
          </Link>
          {assignment.status === "Out for Delivery" && (
            <Link href={`/driver/status/${assignment.id}`} className="flex-1">
              <Button variant="outline" className="w-full">
                Update Status
              </Button>
            </Link>
          )}
        </div>
      </CardFooter>
    </Card>
  ));
}
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function DriverAssignmentsPage() {
  const [assignments, setAssignments] = useState<{
    today: any[];
    completed: any[];
  }>({
    today: [],
    completed: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found");
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
          throw new Error(`Failed to fetch orders: ${res.statusText}`);
        }

        const data = await res.json();

        // Group by status
        const today = data.filter(
          (order: any) => order.status === "Out for Delivery"
        );
        const completed = data.filter(
          (order: any) => order.status === "Order Delivered"
        );

        setAssignments({ today, completed });
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  if (loading)
    return (
      <DashboardLayout navItems={driverNavItems} userType="driver">
        <div className="container py-6 text-center">Loading assignments...</div>
      </DashboardLayout>
    );

  if (error)
    return (
      <DashboardLayout navItems={driverNavItems} userType="driver">
        <div className="container py-6 text-center text-red-600">
          Error: {error}
        </div>
      </DashboardLayout>
    );

  return (
    <DashboardLayout navItems={driverNavItems} userType="driver">
      <div className="container py-6">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Delivery Assignments
            </h1>
            <p className="text-muted-foreground">
              Manage your delivery schedule and assignments
            </p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                className="pl-8 w-[200px]"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="today">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="today">Ready to Pick</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="mt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Today's Deliveries</h2>
                <p className="text-sm text-muted-foreground">
                  {assignments.today.length} assignments
                </p>
              </div>
              {assignments.today.length > 0 ? (
                renderAssignmentCards(assignments.today)
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <Package className="h-10 w-10 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      No deliveries scheduled for today
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Completed Deliveries</h2>
                <p className="text-sm text-muted-foreground">
                  {assignments.completed.length} assignments
                </p>
              </div>
              {assignments.completed.length > 0 ? (
                renderAssignmentCards(assignments.completed)
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <CheckCircle2 className="h-10 w-10 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      No completed deliveries yet
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
