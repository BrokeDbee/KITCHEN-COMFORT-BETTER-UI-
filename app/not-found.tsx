import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-9xl font-bold text-primary-300 mb-4 font-heading">404</h1>
      <h2 className="text-4xl font-bold text-gray-900 mb-4 font-heading">Page Not Found</h2>
      <p className="text-lg text-gray-600 mb-8 max-w-md">
        Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link href="/">
        <Button className="bg-primary hover:bg-primary-600 text-primary-foreground text-lg py-3 px-6 rounded-xl shadow-lg">
          <Home className="w-5 h-5 mr-2" />
          Go to Homepage
        </Button>
      </Link>
    </div>
  )
}
