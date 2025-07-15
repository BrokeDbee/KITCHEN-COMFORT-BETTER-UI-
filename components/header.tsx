"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, Search, ShoppingCart, User, Heart, Bell } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useWishlist } from "@/hooks/use-wishlist" // Import useWishlist

export function Header() {
  const [notifications] = useState(2)
  const { cartItemCount } = useCart()
  const { wishlistItemCount } = useWishlist() // Get wishlist item count

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-xl supports-[backdrop-filter]:bg-white/80 shadow-lg transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden hover:bg-primary-50 transition-colors duration-300 rounded-xl"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 bg-white">
              <div className="flex flex-col space-y-6 mt-8">
                {[
                  "Home",
                  "Products",
                  "Categories",
                  "Deals",
                  "About",
                  "Contact",
                  "Cart",
                  "Wishlist", // Added Wishlist link
                  "Profile", // Added Profile link
                ].map((item, index) => (
                  <Link
                    key={item}
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-lg font-semibold hover:text-primary transition-all duration-300 transform hover:translate-x-2 animate-slide-in-left"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          {/* Enhanced Text-only Logo */}
          <Link href="/" className="group flex items-center">
            <span className="text-2xl font-bold text-primary group-hover:scale-105 transition-all duration-300 relative font-heading">
              Kitchen Comfort
              <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 blur-xl transition-all duration-300"></div>
            </span>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { name: "Home", href: "/" },
              { name: "Products", href: "/products" },
              { name: "Categories", href: "/categories" },
              { name: "Deals", href: "/deals" },
              { name: "About", href: "/about" },
              { name: "Contact", href: "/contact" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium hover:text-primary transition-all duration-300 relative group py-2"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* Enhanced Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex hover:bg-primary-50 hover:text-primary transition-all duration-300 rounded-xl group"
            >
              <Search className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
            </Button>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-primary-50 hover:text-primary transition-all duration-300 rounded-xl group"
            >
              <Bell className="h-5 w-5 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500 text-white shadow-lg animate-pulse">
                  {notifications}
                </Badge>
              )}
            </Button>

            {/* Wishlist */}
            <Link href="/wishlist">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-primary-50 hover:text-primary transition-all duration-300 rounded-xl group"
              >
                <Heart className="h-5 w-5 group-hover:scale-110 group-hover:fill-current transition-all duration-300" />
                {wishlistItemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {wishlistItemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-primary-50 hover:text-primary transition-all duration-300 rounded-xl group"
              >
                <ShoppingCart className="h-5 w-5 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-primary-50 hover:text-primary transition-all duration-300 rounded-xl group"
                >
                  <User className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-white border-0 shadow-2xl rounded-2xl animate-scale-in"
              >
                {[
                  { name: "Sign In", href: "/login" },
                  { name: "Sign Up", href: "/signup" },
                  { name: "My Profile", href: "/profile" },
                  { name: "My Orders", href: "/orders" },
                  { name: "Track Order", href: "/track-order" },
                  { name: "Wishlist", href: "/wishlist" }, // Added to dropdown
                ].map((item) => (
                  <DropdownMenuItem
                    key={item.name}
                    asChild
                    className="hover:bg-primary-50 transition-colors duration-300 rounded-xl mx-2 my-1"
                  >
                    <Link href={item.href} className="flex items-center py-3">
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
