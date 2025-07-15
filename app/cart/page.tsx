"use client"

import { useCart } from "@/hooks/use-cart"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { Trash2, ShoppingCart, ArrowRight } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Breadcrumbs } from "@/components/breadcrumbs"

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart, cartItemCount } = useCart()

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Shopping Cart", href: "/cart" },
  ]

  const shippingCost = cartTotal > 0 ? 20.0 : 0 // Example shipping cost

  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />

      <main className="container mx-auto px-4 py-8 md:py-12">
        <Breadcrumbs items={breadcrumbs} className="mb-8" />

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">Your Shopping Cart</h1>
          <p className="text-lg text-gray-600">
            You have {cartItemCount} item{cartItemCount !== 1 ? "s" : ""} in your cart.
          </p>
        </div>

        {cartItems.length === 0 ? (
          <Card className="max-w-2xl mx-auto text-center py-12">
            <CardContent className="space-y-4">
              <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto" />
              <h2 className="text-2xl font-bold text-gray-800 font-heading">Your cart is empty!</h2>
              <p className="text-gray-600">Looks like you haven't added anything to your cart yet.</p>
              <Link href="/products">
                <Button className="bg-primary hover:bg-primary-600 text-primary-foreground mt-4">Start Shopping</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <Card
                  key={item.id}
                  className="flex items-center p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden mr-4">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} layout="fill" objectFit="cover" />
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                    <div className="md:col-span-1">
                      <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 font-heading">{item.name}</h3>
                      <p className="text-gray-600 text-sm">Price: ₵{item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center justify-start md:justify-center space-x-2 md:col-span-1">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 0)}
                        className="w-16 text-center"
                        min="1"
                      />
                      <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        +
                      </Button>
                    </div>
                    <div className="flex items-center justify-between md:justify-end md:col-span-1">
                      <span className="font-bold text-lg text-primary">₵{(item.price * item.quantity).toFixed(2)}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="text-red-500 hover:bg-red-50 hover:text-red-600 bg-transparent"
                >
                  Clear Cart
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <Card className="h-fit shadow-md">
              <CardHeader>
                <CardTitle className="font-heading">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal ({cartItemCount} items)</span>
                  <span>₵{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span>{shippingCost > 0 ? `₵${shippingCost.toFixed(2)}` : "Free"}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-xl text-gray-900">
                  <span>Total</span>
                  <span>₵{(cartTotal + shippingCost).toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/checkout" className="w-full">
                  <Button className="w-full bg-primary hover:bg-primary-600 text-primary-foreground text-lg py-6">
                    Proceed to Checkout
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
