import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Heart, Leaf, Target, Lightbulb } from "lucide-react"
import { Logo } from "@/components/logo"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Logo size="lg" />
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="/about" className="text-sm font-medium text-primary font-bold">
              About
            </Link>
            <Link href="/features" className="text-sm font-medium hover:underline underline-offset-4">
              Features
            </Link>
            <Link href="/pricing" className="text-sm font-medium hover:underline underline-offset-4">
              Pricing
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:underline underline-offset-4">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-blue-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <Link href="/" className="inline-flex items-center mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                About <span className="text-primary">LogiTrack</span>
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                We're on a mission to revolutionize logistics management with cutting-edge technology and exceptional
                service.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="LogiTrack Team"
                  className="rounded-lg shadow-lg"
                  height={400}
                  width={600}
                />
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Our Story</h2>
                <p className="text-muted-foreground">
                  Founded in 2018, LogiTrack began with a simple idea: logistics management should be simple, efficient,
                  and transparent. Our founders, experienced logistics professionals, were frustrated with outdated
                  systems that created more problems than they solved.
                </p>
                <p className="text-muted-foreground">
                  We built LogiTrack from the ground up, focusing on real-world logistics challenges and creating
                  solutions that make a difference for businesses of all sizes. Today, we're proud to serve over 500
                  companies worldwide, helping them streamline their operations and deliver exceptional service to their
                  customers.
                </p>
                <div className="flex gap-4">
                  <Button className="bg-primary hover:bg-primary/90">Meet Our Team</Button>
                  <Button variant="outline">Our Journey</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Our Mission & Values</h2>
              <p className="mt-2 text-muted-foreground md:text-lg">The principles that guide everything we do</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Our Mission</h3>
                  <p className="text-muted-foreground">
                    To empower businesses with intelligent logistics solutions that optimize operations, reduce costs,
                    and enhance customer satisfaction.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Our Vision</h3>
                  <p className="text-muted-foreground">
                    To become the global standard for logistics management, creating a world where deliveries are
                    seamless, efficient, and environmentally responsible.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <Card className="border-none shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Target className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">Excellence</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      We strive for excellence in everything we do, from product development to customer support.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Lightbulb className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">Innovation</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      We continuously innovate to stay ahead of industry trends and solve complex logistics challenges.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Heart className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">Customer Focus</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Our customers are at the heart of everything we do. Their success is our success.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Leaf className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">Sustainability</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      We're committed to environmentally responsible logistics solutions that reduce carbon footprints.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="w-full py-12 md:py-24 bg-blue-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Meet Our Leadership Team</h2>
              <p className="mt-2 text-muted-foreground md:text-lg">
                The experienced professionals guiding LogiTrack's vision
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="border-none shadow-md">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full bg-gray-100">
                    <img
                      src="/placeholder.svg?height=96&width=96"
                      alt="Sarah Johnson"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardTitle>Sarah Johnson</CardTitle>
                  <CardDescription>CEO & Co-Founder</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Former logistics executive with 15+ years of experience transforming supply chain operations.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full bg-gray-100">
                    <img
                      src="/placeholder.svg?height=96&width=96"
                      alt="Michael Chen"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardTitle>Michael Chen</CardTitle>
                  <CardDescription>CTO & Co-Founder</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Tech innovator with a background in AI and machine learning applied to logistics optimization.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full bg-gray-100">
                    <img
                      src="/placeholder.svg?height=96&width=96"
                      alt="David Rodriguez"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardTitle>David Rodriguez</CardTitle>
                  <CardDescription>COO</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Operations expert who has scaled logistics networks across three continents.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full bg-gray-100">
                    <img
                      src="/placeholder.svg?height=96&width=96"
                      alt="Emily Patel"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardTitle>Emily Patel</CardTitle>
                  <CardDescription>VP of Customer Success</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Customer experience strategist dedicated to ensuring client satisfaction and growth.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <Button variant="outline">View Full Team</Button>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <h3 className="text-4xl font-bold text-primary">5+</h3>
                <p className="text-sm font-medium text-muted-foreground">Years in Business</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-bold text-primary">500+</h3>
                <p className="text-sm font-medium text-muted-foreground">Business Clients</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-bold text-primary">15M+</h3>
                <p className="text-sm font-medium text-muted-foreground">Deliveries Managed</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-bold text-primary">25+</h3>
                <p className="text-sm font-medium text-muted-foreground">Countries Served</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full py-12 md:py-24 bg-primary text-white">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-4">Join the LogiTrack Family</h2>
            <p className="max-w-[600px] mx-auto mb-8 text-primary-foreground/90">
              Discover how our platform can transform your logistics operations and help your business grow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Schedule a Demo
              </Button>
              <Link href="/#login-section">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-white border-white hover:bg-white/10"
                >
                  Sign Up Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Logo size="lg" />
            <div className="flex gap-4 text-sm text-muted-foreground mt-4 md:mt-0">
              <Link href="/" className="hover:underline underline-offset-4">
                Home
              </Link>
              <Link href="/about" className="hover:underline underline-offset-4">
                About
              </Link>
              <Link href="/features" className="hover:underline underline-offset-4">
                Features
              </Link>
              <Link href="/pricing" className="hover:underline underline-offset-4">
                Pricing
              </Link>
              <Link href="/contact" className="hover:underline underline-offset-4">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} LogiTrack. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm text-muted-foreground mt-4 md:mt-0">
              <Link href="/terms" className="hover:underline underline-offset-4">
                Terms
              </Link>
              <Link href="/privacy" className="hover:underline underline-offset-4">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
