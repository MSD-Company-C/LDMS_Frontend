"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Home, RefreshCw } from "lucide-react"
import { Logo } from "@/components/logo"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Logo />
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center">
        <div className="container max-w-md mx-auto px-4 py-16 text-center">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-red-100 p-4">
              <AlertTriangle className="h-12 w-12 text-red-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Something went wrong!</h1>
          <p className="text-muted-foreground mb-8">
            We apologize for the inconvenience. An unexpected error has occurred.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => reset()}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Try again
            </Button>
            <Link href="/">
              <Button variant="outline">
                <Home className="mr-2 h-4 w-4" />
                Return to home
              </Button>
            </Link>
          </div>
          {error.digest && <p className="mt-8 text-xs text-muted-foreground">Error ID: {error.digest}</p>}
        </div>
      </main>
    </div>
  )
}
