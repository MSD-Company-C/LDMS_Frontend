import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search } from "lucide-react"
import { Logo } from "@/components/logo"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Logo />
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center">
        <div className="container max-w-md mx-auto px-4 py-16 text-center">
          <h1 className="text-9xl font-bold text-primary/20 mb-6">404</h1>
          <h2 className="text-3xl font-bold tracking-tight mb-2">Page not found</h2>
          <p className="text-muted-foreground mb-8">The page you are looking for doesn't exist or has been moved.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button>
                <Home className="mr-2 h-4 w-4" />
                Return to home
              </Button>
            </Link>
            <Button variant="outline">
              <Search className="mr-2 h-4 w-4" />
              Search for help
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
