"use client"

import { useWishlist } from "@/hooks/use-wishlist"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { useCart } from "@/hooks/use-cart" // Import useCart to move items to cart

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, clearWishlist, wishlistItemCount } = useWishlist()
  const { addToCart } = useCart()

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Wishlist", href: "/wishlist" },
  ]

  const handleMoveToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    })
    removeFromWishlist(item.id) // Remove from wishlist after moving to cart
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />

      <main className="container mx-auto px-4 py-8 md:py-12">
        <Breadcrumbs items={breadcrumbs} className="mb-8" />

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">Your Wishlist</h1>
          <p className="text-lg text-gray-600">
            You have {wishlistItemCount} item{wishlistItemCount !== 1 ? "s" : ""} in your wishlist.
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <Card className="max-w-2xl mx-auto text-center py-12">
            <CardContent className="space-y-4">
              <Heart className="w-16 h-16 text-gray-400 mx-auto" />
              <h2 className="text-2xl font-bold text-gray-800 font-heading">Your wishlist is empty!</h2>
              <p className="text-gray-600">Start adding products you love to your wishlist.</p>
              <Link href="/products">
                <Button className="bg-primary hover:bg-primary-600 text-primary-foreground mt-4">
                  Browse Products
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Wishlist Items List */}
            <div className="lg:col-span-2 space-y-6">
              {wishlistItems.map((item) => (
                <Card
                  key={item.id}
                  className="flex items-center p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden mr-4">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} layout="fill" objectFit="cover" />
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                    <div className="md:col-span-1">
                      <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 font-heading">{item.name}</h3>
                      <p className="text-gray-600 text-sm">Price: ₵{item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center justify-between md:justify-end md:col-span-1 space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-primary hover:bg-primary-50 bg-transparent"
                        onClick={() => handleMoveToCart(item)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Move to Cart
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromWishlist(item.id)}
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
                  onClick={clearWishlist}
                  className="text-red-500 hover:bg-red-50 hover:text-red-600 bg-transparent"
                >
                  Clear Wishlist
                </Button>
              </div>
            </div>

            {/* Call to Action */}
            <Card className="h-fit shadow-md text-center p-6">
              <CardTitle className="font-heading mb-4">Ready to Shop?</CardTitle>
              <CardContent className="space-y-4">
                <p className="text-gray-600">Move your favorite items to the cart or continue browsing our products.</p>
                <Link href="/products">
                  <Button className="w-full bg-primary hover:bg-primary-600 text-primary-foreground">
                    Continue Shopping
                  </Button>
                </Link>
                <Link href="/cart">
                  <Button variant="outline" className="w-full mt-2 text-primary hover:bg-primary-50 bg-transparent">
                    View Cart
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
