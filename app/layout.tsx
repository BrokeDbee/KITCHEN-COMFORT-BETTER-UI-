import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

// Add these imports at the top
import { Inter, Outfit } from "next/font/google"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster" // Import Toaster

// Define the font instances
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
})

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn(inter.variable, outfit.variable)}>
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        {children}
        <Toaster /> {/* Add Toaster component here */}
      </body>
    </html>
  )
}
