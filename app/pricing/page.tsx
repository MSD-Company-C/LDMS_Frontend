import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle, X, HelpCircle, Package, Truck, Building2 } from "lucide-react"
import { Logo } from "@/components/logo"
import { ScheduleDemoDialog } from "@/components/schedule-demo-dialog"
import { ContactSalesDialog } from "@/components/contact-sales-dialog"

export default function PricingPage() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
                <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
                    <Logo size="lg" />
                    <nav className="ml-auto flex gap-4 sm:gap-6">
                        <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
                            About
                        </Link>
                        <Link href="/features" className="text-sm font-medium hover:underline underline-offset-4">
                            Features
                        </Link>
                        <Link href="/pricing" className="text-sm font-medium text-primary font-bold">
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
                                Simple, Transparent <span className="text-primary">Pricing</span>
                            </h1>
                            <p className="max-w-[700px] text-muted-foreground md:text-xl">
                                Choose the plan that's right for your business, with no hidden fees or long-term commitments.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Standard Plan */}
                            <Card className="border-none shadow-lg flex flex-col">
                                <CardHeader>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Package className="h-5 w-5 text-primary" />
                                        <CardTitle>Standard</CardTitle>
                                    </div>
                                    <CardDescription>Perfect for small businesses</CardDescription>
                                    <div className="mt-4">
                                        <span className="text-4xl font-bold">$99</span>
                                        <span className="text-muted-foreground">/month</span>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <ul className="space-y-3">
                                        <li className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                                            <span>Up to 500 deliveries per month</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                                            <span>5 user accounts</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                                            <span>Real-time tracking</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                                            <span>Basic reporting</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                                            <span>Email support</span>
                                        </li>
                                        <li className="flex items-start">
                                            <X className="h-5 w-5 text-red-500 mr-2 shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground">Advanced analytics</span>
                                        </li>
                                        <li className="flex items-start">
                                            <X className="h-5 w-5 text-red-500 mr-2 shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground">API access</span>
                                        </li>
                                        <li className="flex items-start">
                                            <X className="h-5 w-5 text-red-500 mr-2 shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground">Dedicated account manager</span>
                                        </li>
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full">
                                        Get Started
                                    </Button>
                                </CardFooter>
                            </Card>

                            {/* Professional Plan */}
                            <Card className="border-none shadow-lg flex flex-col relative">
                                <div className="absolute top-0 left-0 right-0 bg-primary text-white text-center py-1 text-sm font-medium rounded-t-lg">
                                    Most Popular
                                </div>
                                <CardHeader className="pt-8">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Truck className="h-5 w-5 text-primary" />
                                        <CardTitle>Professional</CardTitle>
                                    </div>
                                    <CardDescription>Ideal for growing businesses</CardDescription>
                                    <div className="mt-4">
                                        <span className="text-4xl font-bold">$299</span>
                                        <span className="text-muted-foreground">/month</span>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <ul className="space-y-3">
                                        <li className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                                            <span>Up to 2,500 deliveries per month</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                                            <span>20 user accounts</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                                            <span>Real-time tracking</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                                            <span>Advanced reporting</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                                            <span>Email and phone support</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                                            <span>Advanced analytics</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                                            <span>API access</span>
                                        </li>
                                        <li className="flex items-start">
                                            <X className="h-5 w-5 text-red-500 mr-2 shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground">Dedicated account manager</span>
                                        </li>
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full bg-primary hover:bg-primary/90">
                                        Get Started
                                    </Button>
                                </CardFooter>
                            </Card>

                            {/* Enterprise Plan */}
                            <Card className="border-none shadow-lg flex flex-col">
                                <CardHeader>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Building2 className="h-5 w-5 text-primary" />
                                        <CardTitle>Enterprise</CardTitle>
                                    </div>
                                    <CardDescription>For large-scale operations</CardDescription>
                                    <div className="mt-4">
                                        <span className="text-4xl font-bold">Custom</span>
                                        <span className="text-muted-foreground"></span>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <ul className="space-y-3">
                                        <li className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                                            <span>Unlimited deliveries</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                                            <span>Unlimited user accounts</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                                            <span>Real-time tracking</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                                            <span>Custom reporting</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                                            <span>24/7 priority support</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                                            <span>Advanced analytics</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                                            <span>Full API access</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                                            <span>Dedicated account manager</span>
                                        </li>
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <ContactSalesDialog buttonVariant="outline" />
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="w-full py-12 md:py-24 bg-white">
                    <div className="container px-4 md:px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Frequently Asked Questions</h2>
                            <p className="mt-2 text-muted-foreground md:text-lg">
                                Find answers to common questions about our pricing and plans
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <HelpCircle className="h-5 w-5 text-primary" />
                                        Are there any setup fees?
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        No, there are no setup fees for our Standard and Professional plans. Enterprise plans may include a
                                        one-time implementation fee based on your specific requirements and customization needs.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <HelpCircle className="h-5 w-5 text-primary" />
                                        Can I change plans later?
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Yes, you can upgrade or downgrade your plan at any time. Upgrades take effect immediately, while
                                        downgrades will be applied at the end of your current billing cycle.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <HelpCircle className="h-5 w-5 text-primary" />
                                        What happens if I exceed my delivery limit?
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        If you exceed your monthly delivery limit, additional deliveries will be billed at a per-delivery
                                        rate. For Standard plans, this is $0.30 per additional delivery, and for Professional plans, it's
                                        $0.20 per additional delivery.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <HelpCircle className="h-5 w-5 text-primary" />
                                        Do you offer discounts for annual billing?
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Yes, we offer a 15% discount when you choose annual billing for Standard and Professional plans.
                                        Enterprise plans include custom pricing with flexible billing options.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Comparison Table */}
                <section className="w-full py-12 md:py-24 bg-blue-50">
                    <div className="container px-4 md:px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Plan Comparison</h2>
                            <p className="mt-2 text-muted-foreground md:text-lg">
                                A detailed comparison of features across all plans
                            </p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full bg-white rounded-lg shadow-md">
                                <thead>
                                    <tr className="border-b">
                                        <th className="p-4 text-left">Feature</th>
                                        <th className="p-4 text-center">Standard</th>
                                        <th className="p-4 text-center bg-primary/5">Professional</th>
                                        <th className="p-4 text-center">Enterprise</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b">
                                        <td className="p-4 font-medium">Monthly Deliveries</td>
                                        <td className="p-4 text-center">500</td>
                                        <td className="p-4 text-center bg-primary/5">2,500</td>
                                        <td className="p-4 text-center">Unlimited</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="p-4 font-medium">User Accounts</td>
                                        <td className="p-4 text-center">5</td>
                                        <td className="p-4 text-center bg-primary/5">20</td>
                                        <td className="p-4 text-center">Unlimited</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="p-4 font-medium">Real-time Tracking</td>
                                        <td className="p-4 text-center">
                                            <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                                        </td>
                                        <td className="p-4 text-center bg-primary/5">
                                            <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                                        </td>
                                        <td className="p-4 text-center">
                                            <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                                        </td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="p-4 font-medium">Mobile App Access</td>
                                        <td className="p-4 text-center">
                                            <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                                        </td>
                                        <td className="p-4 text-center bg-primary/5">
                                            <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                                        </td>
                                        <td className="p-4 text-center">
                                            <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                                        </td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="p-4 font-medium">Reporting</td>
                                        <td className="p-4 text-center">Basic</td>
                                        <td className="p-4 text-center bg-primary/5">Advanced</td>
                                        <td className="p-4 text-center">Custom</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="p-4 font-medium">API Access</td>
                                        <td className="p-4 text-center">
                                            <X className="h-5 w-5 text-red-500 mx-auto" />
                                        </td>
                                        <td className="p-4 text-center bg-primary/5">
                                            <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                                        </td>
                                        <td className="p-4 text-center">
                                            <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                                        </td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="p-4 font-medium">Support</td>
                                        <td className="p-4 text-center">Email</td>
                                        <td className="p-4 text-center bg-primary/5">Email & Phone</td>
                                        <td className="p-4 text-center">24/7 Priority</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="p-4 font-medium">Dedicated Account Manager</td>
                                        <td className="p-4 text-center">
                                            <X className="h-5 w-5 text-red-500 mx-auto" />
                                        </td>
                                        <td className="p-4 text-center bg-primary/5">
                                            <X className="h-5 w-5 text-red-500 mx-auto" />
                                        </td>
                                        <td className="p-4 text-center">
                                            <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                                        </td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="p-4 font-medium">Custom Integrations</td>
                                        <td className="p-4 text-center">
                                            <X className="h-5 w-5 text-red-500 mx-auto" />
                                        </td>
                                        <td className="p-4 text-center bg-primary/5">Limited</td>
                                        <td className="p-4 text-center">Full</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 font-medium">SLA</td>
                                        <td className="p-4 text-center">
                                            <X className="h-5 w-5 text-red-500 mx-auto" />
                                        </td>
                                        <td className="p-4 text-center bg-primary/5">Standard</td>
                                        <td className="p-4 text-center">Custom</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="w-full py-12 md:py-24 bg-primary text-white">
                    <div className="container px-4 md:px-6 text-center">
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-4">Ready to Get Started?</h2>
                        <p className="max-w-[600px] mx-auto mb-8 text-primary-foreground/90">
                            Choose the plan that's right for your business and start optimizing your logistics operations today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <ScheduleDemoDialog buttonVariant="secondary" />
                            <Link href="/#login-section">
                                <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
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
                        <p className="text-sm text-gray-500">© 2025 Your Company. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}