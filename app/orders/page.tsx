"use client"

import { CardFooter } from "@/components/ui/card"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Package, Truck, CheckCircle, Clock, Eye, User, ShoppingBag, Lock } from "lucide-react"
import Link from "next/link"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Badge } from "@/components/ui/badge"

// Mock order data
const mockOrders = [
  {
    id: "KC-2024-001234",
    date: "Dec 15, 2024",
    total: 879.98,
    status: "Delivered",
    items: [
      { name: "Professional Chef Knife Set", quantity: 1, price: 519.99 },
      { name: "Ceramic Non-Stick Pan Set", quantity: 1, price: 359.99 },
    ],
    trackingLink: "/track-order?order=KC-2024-001234",
  },
  {
    id: "KC-2024-001233",
    date: "Nov 28, 2024",
    total: 1199.99,
    status: "Shipped",
    items: [{ name: "Electric Stand Mixer", quantity: 1, price: 1199.99 }],
    trackingLink: "/track-order?order=KC-2024-001233",
  },
  {
    id: "KC-2024-001232",
    date: "Oct 10, 2024",
    total: 159.99,
    status: "Processing",
    items: [{ name: "Bamboo Cutting Board Set", quantity: 1, price: 159.99 }],
    trackingLink: "/track-order?order=KC-2024-001232",
  },
]

export default function OrdersPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "My Profile", href: "/profile" },
    { label: "My Orders", href: "/orders" },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "Shipped":
        return <Truck className="w-5 h-5 text-blue-500" />
      case "Processing":
        return <Clock className="w-5 h-5 text-yellow-500" />
      default:
        return <Package className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Delivered":
        return "success" // Assuming you have a success variant for Badge
      case "Shipped":
        return "info" // Assuming you have an info variant for Badge
      case "Processing":
        return "warning" // Assuming you have a warning variant for Badge
      default:
        return "secondary"
    }
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />

      <main className="container mx-auto px-4 py-8 md:py-12">
        <Breadcrumbs items={breadcrumbs} className="mb-8" />

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">My Orders</h1>
          <p className="text-lg text-gray-600">View your order history and track your deliveries.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar Navigation */}
          <Card className="lg:col-span-1 h-fit shadow-md">
            <CardHeader>
              <CardTitle className="font-heading">Account Navigation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/profile">
                <Button variant="ghost" className="w-full justify-start hover:bg-primary-50">
                  <User className="w-4 h-4 mr-2" />
                  Personal Info
                </Button>
              </Link>
              <Link href="/orders">
                <Button variant="ghost" className="w-full justify-start text-primary hover:bg-primary-50">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  My Orders
                </Button>
              </Link>
              <Link href="/password-change">
                <Button variant="ghost" className="w-full justify-start hover:bg-primary-50">
                  <Lock className="w-4 h-4 mr-2" />
                  Change Password
                </Button>
              </Link>
              <Separator className="my-4" />
              <Button variant="destructive" className="w-full justify-start">
                Sign Out
              </Button>
            </CardContent>
          </Card>

          {/* Order List */}
          <div className="lg:col-span-2 space-y-6">
            {mockOrders.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent className="space-y-4">
                  <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto" />
                  <h2 className="text-2xl font-bold text-gray-800 font-heading">No orders found.</h2>
                  <p className="text-gray-600">Start shopping to see your order history here!</p>
                  <Link href="/products">
                    <Button className="bg-primary hover:bg-primary-600 text-primary-foreground mt-4">
                      Browse Products
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              mockOrders.map((order) => (
                <Card key={order.id} className="shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="flex flex-row items-center justify-between pb-4">
                    <div>
                      <CardTitle className="text-xl font-heading">Order #{order.id}</CardTitle>
                      <CardDescription>Placed on {order.date}</CardDescription>
                    </div>
                    <Badge
                      className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Shipped"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {getStatusIcon(order.status)}
                      {order.status}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-800">Items:</h3>
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm text-gray-600">
                          <span>
                            {item.name} (x{item.quantity})
                          </span>
                          <span>₵{item.price.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg text-gray-900">
                      <span>Order Total</span>
                      <span>₵{order.total.toFixed(2)}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2 pt-4">
                    <Link href={order.trackingLink}>
                      <Button variant="outline" size="sm" className="text-primary hover:bg-primary-50 bg-transparent">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
