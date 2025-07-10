"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Truck,
  Package,
  Warehouse,
  User,
  ArrowRight,
  BarChart3,
  Shield,
  Clock,
  CheckCircle,
  MapPin,
  Zap,
  HeadphonesIcon,
  RefreshCw,
  Smartphone,
  Globe,
  Award,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { ScheduleDemoDialog } from "@/components/schedule-demo-dialog";
import { ContactSalesDialog } from "@/components/contact-sales-dialog";
import { useState } from "react";
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export default function LandingPage() {
  const router = useRouter();

  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [driverEmail, setDriverEmail] = useState("");
  const [driverPassword, setDriverPassword] = useState("");
  const [warehouseEmail, setWarehouseEmail] = useState("");
  const [warehousePassword, setWarehousePassword] = useState("");
  const [orderId, setOrderId] = useState(""); // already exists
  
  const handleLogin = async (role: string, email: string, password: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      console.log(res);

      if (!res.ok) {
        throw new Error("Login failed");
      }
      console.log(email, password, role);
      const data = await res.json();

      // Store token if needed
      const token = data.token;
      localStorage.setItem("token", token);


      const userRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/email?email=${email}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!userRes.ok) {
        throw new Error("Failed to get user info");
      }

      const userData = await userRes.json(); // assume { id, email, role, ... }

      const userRole = userData.role;
      


      // Redirect based on role
      if (userRole === "ADMIN") router.push("/admin/dashboard");
      else if (userRole === "DRIVER") router.push("/driver/assignments");
      else if (userRole === "WAREHOUSE") router.push("/warehouse/home");
      else alert("Unauthorized role");
    } catch (error) {
      alert("Login failed:");
    }
  };
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Logo size="lg" />
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link
              href="/about"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              About
            </Link>
            <Link
              href="/features"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-blue-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  <span className="mr-1">✨</span> Next-Gen Logistics Platform
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Logistics & Delivery{" "}
                    <span className="text-primary">Management System</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Streamline your logistics operations with our comprehensive
                    management platform. Track deliveries, manage inventory, and
                    optimize your supply chain.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="#login-section">
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90"
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/features">
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <CheckCircle className="mr-1 h-4 w-4 text-primary" />
                    Real-time tracking
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-1 h-4 w-4 text-primary" />
                    Secure platform
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-1 h-4 w-4 text-primary" />
                    24/7 support
                  </div>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end relative">
                <div className="absolute -z-10 aspect-square w-full rounded-full bg-primary/5 blur-2xl"></div>
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-lWq8jXxhoo7Fxt2fSwRIhFE7gzokZB.png"
                  alt="Logistics Management Dashboard"
                  className="rounded-xl object-cover shadow-lg border border-gray-200"
                  height={550}
                  width={550}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-16 lg:py-20 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Why Choose LogiTrack?
              </h2>
              <p className="mt-2 text-muted-foreground md:text-lg">
                Our platform offers comprehensive solutions for all your
                logistics needs
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="dashboard-card border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Real-time Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Monitor your shipments in real-time with accurate GPS
                    tracking and instant status updates.
                  </p>
                </CardContent>
              </Card>
              <Card className="dashboard-card border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Secure Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Role-based access control ensures that your data is secure
                    and accessible only to authorized personnel.
                  </p>
                </CardContent>
              </Card>
              <Card className="dashboard-card border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Efficient Operations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Optimize routes, reduce delivery times, and improve overall
                    operational efficiency.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 md:py-16 lg:py-20 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <h3 className="text-4xl font-bold text-primary">98%</h3>
                <p className="text-sm font-medium text-muted-foreground">
                  Delivery Success Rate
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-bold text-primary">24/7</h3>
                <p className="text-sm font-medium text-muted-foreground">
                  Customer Support
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-bold text-primary">500+</h3>
                <p className="text-sm font-medium text-muted-foreground">
                  Business Partners
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-bold text-primary">15M+</h3>
                <p className="text-sm font-medium text-muted-foreground">
                  Deliveries Completed
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* More Features */}
        <section className="w-full py-12 md:py-16 lg:py-20 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Comprehensive Features
              </h2>
              <p className="mt-2 text-muted-foreground md:text-lg">
                Everything you need to manage your logistics operations
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex flex-col items-start p-6 bg-gray-50 rounded-lg">
                <MapPin className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Route Optimization</h3>
                <p className="text-muted-foreground">
                  Automatically calculate the most efficient delivery routes to
                  save time and fuel.
                </p>
              </div>
              <div className="flex flex-col items-start p-6 bg-gray-50 rounded-lg">
                <Zap className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">
                  Instant Notifications
                </h3>
                <p className="text-muted-foreground">
                  Keep customers informed with automated updates at every stage
                  of delivery.
                </p>
              </div>
              <div className="flex flex-col items-start p-6 bg-gray-50 rounded-lg">
                <HeadphonesIcon className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Customer Support</h3>
                <p className="text-muted-foreground">
                  Integrated communication tools to quickly resolve delivery
                  issues.
                </p>
              </div>
              <div className="flex flex-col items-start p-6 bg-gray-50 rounded-lg">
                <RefreshCw className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Inventory Management</h3>
                <p className="text-muted-foreground">
                  Track stock levels, manage warehouses, and automate
                  reordering.
                </p>
              </div>
              <div className="flex flex-col items-start p-6 bg-gray-50 rounded-lg">
                <Smartphone className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Mobile App</h3>
                <p className="text-muted-foreground">
                  Dedicated apps for drivers, warehouse staff, and
                  administrators.
                </p>
              </div>
              <div className="flex flex-col items-start p-6 bg-gray-50 rounded-lg">
                <Globe className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Global Coverage</h3>
                <p className="text-muted-foreground">
                  Support for international shipping with customs documentation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="w-full py-12 md:py-16 lg:py-20 bg-blue-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Trusted by Industry Leaders
              </h2>
              <p className="mt-2 text-muted-foreground md:text-lg">
                See what our customers have to say about LogiTrack
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Sarah Johnson</CardTitle>
                      <CardDescription>
                        Logistics Manager, TechCorp
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    "LogiTrack has transformed our delivery operations. We've
                    reduced delivery times by 30% and improved customer
                    satisfaction scores."
                  </p>
                </CardContent>
                <CardFooter>
                  <div className="flex text-amber-500">
                    <Award className="h-5 w-5" />
                    <Award className="h-5 w-5" />
                    <Award className="h-5 w-5" />
                    <Award className="h-5 w-5" />
                    <Award className="h-5 w-5" />
                  </div>
                </CardFooter>
              </Card>
              <Card className="border-none shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Michael Chen</CardTitle>
                      <CardDescription>CEO, FastShip Inc.</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    "The inventory management features have eliminated stockouts
                    and reduced our warehouse costs significantly. Highly
                    recommended!"
                  </p>
                </CardContent>
                <CardFooter>
                  <div className="flex text-amber-500">
                    <Award className="h-5 w-5" />
                    <Award className="h-5 w-5" />
                    <Award className="h-5 w-5" />
                    <Award className="h-5 w-5" />
                    <Award className="h-5 w-5" />
                  </div>
                </CardFooter>
              </Card>
              <Card className="border-none shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Emily Rodriguez</CardTitle>
                      <CardDescription>
                        Operations Director, Global Logistics
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    "The driver management system has improved our fleet
                    efficiency by 40%. Our drivers love the mobile app and route
                    optimization."
                  </p>
                </CardContent>
                <CardFooter>
                  <div className="flex text-amber-500">
                    <Award className="h-5 w-5" />
                    <Award className="h-5 w-5" />
                    <Award className="h-5 w-5" />
                    <Award className="h-5 w-5" />
                    <Award className="h-5 w-5" />
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Login Section */}
        <section
          id="login-section"
          className="w-full py-12 md:py-24 lg:py-32 bg-white"
        >
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[800px] flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Who are you?
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  Select your role to continue
                </p>
              </div>

              <div className="w-full max-w-md">
                <Tabs defaultValue="admin" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="admin">Admin</TabsTrigger>
                    <TabsTrigger value="driver">Driver</TabsTrigger>
                    <TabsTrigger value="warehouse">Warehouse</TabsTrigger>
                    <TabsTrigger value="customer">Customer</TabsTrigger>
                  </TabsList>

                  <TabsContent value="admin" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <User className="h-5 w-5" />
                          Admin Login
                        </CardTitle>
                        <CardDescription>
                          Enter your credentials to access the admin dashboard
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="admin-email">Email</Label>
                          <Input
                            id="admin-email"
                            type="email"
                            placeholder="admin@example.com"
                            value={adminEmail}
                            onChange={(e) => setAdminEmail(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="admin-password">Password</Label>
                          <Input
                            id="admin-password"
                            type="password"
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                          />
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col space-y-2">
                        <Button
                          className="w-full"
                          onClick={() =>
                            handleLogin("ADMIN", adminEmail, adminPassword)
                          }
                        >
                          Login
                        </Button>

                        <Link
                          href="/auth/forgot-password"
                          className="text-sm text-center text-muted-foreground hover:underline"
                        >
                          Forgot password?
                        </Link>
                      </CardFooter>
                    </Card>
                  </TabsContent>

                  <TabsContent value="driver" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Truck className="h-5 w-5" />
                          Driver Login
                        </CardTitle>
                        <CardDescription>
                          Enter your credentials to access your deliveries
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="driver-email">Email</Label>
                          <Input
                            id="driver-email"
                            type="email"
                            placeholder="driver@example.com"
                            value={driverEmail}
                            onChange={(e) => setDriverEmail(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="driver-password">Password</Label>
                          <Input
                            id="driver-password"
                            type="password"
                            value={driverPassword}
                            onChange={(e) => setDriverPassword(e.target.value)}
                          />
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col space-y-2">
                        <Button
                          className="w-full"
                          onClick={() =>
                            handleLogin("DRIVER", driverEmail, driverPassword)
                          }
                        >
                          Login
                        </Button>

                        <Link
                          href="/auth/forgot-password"
                          className="text-sm text-center text-muted-foreground hover:underline"
                        >
                          Forgot password?
                        </Link>
                      </CardFooter>
                    </Card>
                  </TabsContent>

                  <TabsContent value="warehouse" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Warehouse className="h-5 w-5" />
                          Warehouse Staff Login
                        </CardTitle>
                        <CardDescription>
                          Enter your credentials to access warehouse operations
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="warehouse-email">Email</Label>
                          <Input
                            id="warehouse-email"
                            type="email"
                            placeholder="warehouse@example.com"
                            value={warehouseEmail}
                            onChange={(e) => setWarehouseEmail(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="warehouse-password">Password</Label>
                          <Input
                            id="warehouse-password"
                            type="password"
                            value={warehousePassword}
                            onChange={(e) =>
                              setWarehousePassword(e.target.value)
                            }
                          />
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col space-y-2">
                        <Button
                          className="w-full"
                          onClick={() =>
                            handleLogin(
                              "WAREHOUSE",
                              warehouseEmail,
                              warehousePassword
                            )
                          }
                        >
                          Login
                        </Button>

                        <Link
                          href="/auth/forgot-password"
                          className="text-sm text-center text-muted-foreground hover:underline"
                        >
                          Forgot password?
                        </Link>
                      </CardFooter>
                    </Card>
                  </TabsContent>

                  <TabsContent value="customer" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Package className="h-5 w-5" />
                          Track Your Order
                        </CardTitle>
                        <CardDescription>
                          Enter your order ID to track your delivery
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="order-id">Order ID</Label>
                          <Input
                            id="order-id"
                            placeholder="e.g., ORD-12345"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                          />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Link
                          href={`/customer/track/${orderId}`}
                          className="w-full"
                        >
                          <Button className="w-full" disabled={!orderId}>
                            Track Order
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-16 lg:py-20 bg-primary text-white">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-4">
              Ready to Transform Your Logistics?
            </h2>
            <p className="max-w-[600px] mx-auto mb-8 text-primary-foreground/90">
              Join thousands of businesses that have improved their delivery
              operations with LogiTrack.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ScheduleDemoDialog buttonVariant="secondary" />
              <ContactSalesDialog buttonVariant="default" />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Logo size="lg" />
              <p className="text-sm text-muted-foreground">
                Streamlining logistics operations for businesses worldwide.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect
                      width="20"
                      height="20"
                      x="2"
                      y="2"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-primary"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/press"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Press
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/documentation"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/help"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/api"
                    className="text-muted-foreground hover:text-primary"
                  >
                    API
                  </Link>
                </li>
                <li>
                  <Link
                    href="/status"
                    className="text-muted-foreground hover:text-primary"
                  >
                    System Status
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/terms"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/compliance"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Compliance
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} LogiTrack. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm text-muted-foreground mt-4 md:mt-0">
              <Link
                href="/terms"
                className="hover:underline underline-offset-4"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="hover:underline underline-offset-4"
              >
                Privacy
              </Link>
              <Link
                href="/cookies"
                className="hover:underline underline-offset-4"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
