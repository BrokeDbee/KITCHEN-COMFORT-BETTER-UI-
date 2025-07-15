"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Package, Truck, CheckCircle, Clock, MapPin, Search } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/breadcrumbs" // Import Breadcrumbs

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("")
  const [orderData, setOrderData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setOrderData({
        orderNumber: "KC-2024-001234",
        status: "In Transit",
        estimatedDelivery: "Dec 20, 2024",
        items: [
          { name: "Professional Chef Knife Set", quantity: 1, price: 519.99 },
          { name: "Ceramic Non-Stick Pan Set", quantity: 1, price: 359.99 },
        ],
        total: 879.98,
        shippingAddress: "123 Main St, Anytown, ST 12345",
        trackingSteps: [
          {
            status: "Order Placed",
            date: "Dec 15, 2024 - 2:30 PM",
            completed: true,
            description: "Your order has been confirmed and is being prepared",
          },
          {
            status: "Processing",
            date: "Dec 16, 2024 - 10:15 AM",
            completed: true,
            description: "Items are being picked and packed",
          },
          {
            status: "Shipped",
            date: "Dec 17, 2024 - 3:45 PM",
            completed: true,
            description: "Package has left our facility",
          },
          {
            status: "In Transit",
            date: "Dec 18, 2024 - 8:20 AM",
            completed: true,
            description: "Package is on the way to your location",
          },
          {
            status: "Out for Delivery",
            date: "Expected Dec 20, 2024",
            completed: false,
            description: "Package will be delivered today",
          },
          {
            status: "Delivered",
            date: "Expected Dec 20, 2024",
            completed: false,
            description: "Package has been delivered",
          },
        ],
      })
      setIsLoading(false)
    }, 1500)
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Track Order", href: "/track-order" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} className="mb-8" />

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">Track Your Order</h1>
            <p className="text-lg text-gray-600">Enter your order number to see the latest updates on your delivery</p>
          </div>

          {/* Order Search Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="font-heading">Enter Order Details</CardTitle>
              <CardDescription>You can find your order number in your confirmation email</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTrackOrder} className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="orderNumber" className="sr-only">
                    Order Number
                  </Label>
                  <Input
                    id="orderNumber"
                    placeholder="Enter your order number (e.g., KC-2024-001234)"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-primary hover:bg-primary-600 text-primary-foreground"
                >
                  {isLoading ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Tracking...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      Track Order
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Order Results */}
          {orderData && (
            <div className="space-y-6">
              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Order #{orderData.orderNumber}</CardTitle>
                      <CardDescription>
                        <MapPin className="w-4 h-4 inline mr-1" />
                        Delivering to: {orderData.shippingAddress}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="bg-primary-100 text-primary-800">
                      {orderData.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3">Order Items</h3>
                      <div className="space-y-2">
                        {orderData.items.map((item: any, index: number) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>
                              {item.name} (x{item.quantity})
                            </span>
                            <span>₵{item.price.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      <Separator className="my-3" />
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>₵{orderData.total.toFixed(2)}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">Delivery Information</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <Truck className="w-4 h-4 mr-2 text-primary" />
                          <span>Estimated Delivery: {orderData.estimatedDelivery}</span>
                        </div>
                        <div className="flex items-center">
                          <Package className="w-4 h-4 mr-2 text-primary" />
                          <span>Standard Shipping</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tracking Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Tracking Timeline</CardTitle>
                  <CardDescription>Follow your order's journey from our warehouse to your door</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {orderData.trackingSteps.map((step: any, index: number) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div
                          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                            step.completed ? "bg-primary text-primary-foreground" : "bg-gray-200 text-gray-400"
                          }`}
                        >
                          {step.completed ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className={`font-medium ${step.completed ? "text-gray-900" : "text-gray-500"}`}>
                              {step.status}
                            </h4>
                            <span className="text-sm text-gray-500">{step.date}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
