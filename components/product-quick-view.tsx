"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Heart } from "lucide-react" // Import Heart icon
import Image from "next/image"
import { Progress } from "@/components/ui/progress"
import { useCart } from "@/hooks/use-cart"
import { useWishlist } from "@/hooks/use-wishlist" // Import useWishlist
import Link from "next/link" // Import Link

interface Product {
  id: number
  name: string
  price: number
  originalPrice: number
  rating: number
  reviews: number
  image: string
  badge: string
  discount: number
  inStock: boolean
  stockLevel: number
}

interface ProductQuickViewProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export function ProductQuickView({ product, isOpen, onClose }: ProductQuickViewProps) {
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist() // Use wishlist hook

  if (!product) return null

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
    onClose()
  }

  const handleToggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden rounded-lg">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative h-64 md:h-auto overflow-hidden">
            <Link href={`/products/${product.id}`} onClick={onClose}>
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-105"
              />
            </Link>
            <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground shadow-lg">
              {product.badge}
            </Badge>
            <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              -{product.discount}%
            </div>
          </div>
          <div className="p-6 flex flex-col justify-between">
            <div>
              <DialogHeader className="mb-4">
                <Link href={`/products/${product.id}`} onClick={onClose}>
                  <DialogTitle className="text-2xl font-bold font-heading hover:text-primary transition-colors duration-200">
                    {product.name}
                  </DialogTitle>
                </Link>
                <DialogDescription className="text-gray-600">
                  A brief description of the product goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </DialogDescription>
              </DialogHeader>

              <div className="flex items-center mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-2 font-medium">({product.reviews} reviews)</span>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-bold text-primary">₵{product.price.toFixed(2)}</span>
                <span className="text-lg text-gray-500 line-through">₵{product.originalPrice.toFixed(2)}</span>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Stock Level</span>
                  <span className="font-medium">{product.stockLevel}%</span>
                </div>
                <Progress value={product.stockLevel} className="h-2" />
                <p className="text-sm text-gray-600 flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                className="flex-1 bg-primary hover:bg-primary-600 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-xl group relative overflow-hidden"
                onClick={handleAddToCart}
              >
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <ShoppingCart className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={`rounded-xl shadow-lg ${
                  isInWishlist(product.id)
                    ? "text-red-500 border-red-500 hover:bg-red-50"
                    : "text-gray-500 hover:text-primary hover:border-primary"
                }`}
                onClick={handleToggleWishlist}
              >
                <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? "fill-red-500" : ""}`} />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
