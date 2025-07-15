"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, ShoppingCart, Search, SlidersHorizontal, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link" // Import Link
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductQuickView } from "@/components/product-quick-view"
import { useToast } from "@/hooks/use-toast"
import { ProductCardSkeleton } from "@/components/product-card-skeleton"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { useCart } from "@/hooks/use-cart"
import { useWishlist } from "@/hooks/use-wishlist" // Import useWishlist

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("featured")
  const [category, setCategory] = useState("all")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000])
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [loadingProducts, setLoadingProducts] = useState(true)
  const { toast } = useToast()
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist() // Use wishlist hook

  const products = [
    {
      id: 1,
      name: "Professional Chef Knife Set",
      price: 519.99,
      originalPrice: 719.99,
      rating: 4.8,
      reviews: 324,
      image: "/placeholder.svg?height=300&width=300",
      category: "knives",
      badge: "Best Seller",
      discount: 28,
      inStock: true,
      stockLevel: 85,
    },
    {
      id: 2,
      name: "Smart Air Fryer Pro",
      price: 799.99,
      originalPrice: 999.99,
      rating: 4.9,
      reviews: 156,
      image: "/placeholder.svg?height=300&width=300",
      category: "appliances",
      badge: "New",
      discount: 20,
      inStock: true,
      stockLevel: 92,
    },
    {
      id: 3,
      name: "Ceramic Non-Stick Pan Set",
      price: 359.99,
      originalPrice: 479.99,
      rating: 4.7,
      reviews: 89,
      image: "/placeholder.svg?height=300&width=300",
      category: "cookware",
      badge: "Sale",
      discount: 25,
      inStock: true,
      stockLevel: 67,
    },
    {
      id: 4,
      name: "Electric Stand Mixer",
      price: 1199.99,
      originalPrice: 1599.99,
      rating: 4.6,
      reviews: 203,
      image: "/placeholder.svg?height=300&width=300",
      category: "appliances",
      badge: "Popular",
      discount: 25,
      inStock: true,
      stockLevel: 78,
    },
    {
      id: 5,
      name: "Bamboo Cutting Board Set",
      price: 159.99,
      originalPrice: 239.99,
      rating: 4.5,
      reviews: 127,
      image: "/placeholder.svg?height=300&width=300",
      category: "accessories",
      badge: "Eco-Friendly",
      discount: 33,
      inStock: true,
      stockLevel: 90,
    },
    {
      id: 6,
      name: "Stainless Steel Utensil Set",
      price: 199.99,
      originalPrice: 279.99,
      rating: 4.4,
      reviews: 98,
      image: "/placeholder.svg?height=300&width=300",
      category: "utensils",
      badge: "Durable",
      discount: 28,
      inStock: true,
      stockLevel: 70,
    },
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingProducts(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const filteredAndSortedProducts = products
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = category === "all" || product.category === category
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      return matchesSearch && matchesCategory && matchesPrice
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "newest":
          return b.id - a.id
        case "featured":
        default:
          return 0
      }
    })

  const handleQuickView = (product: any) => {
    setSelectedProduct(product)
    setIsQuickViewOpen(true)
  }

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
  }

  const handleToggleWishlist = (product: any) => {
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

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} className="mb-8" />

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">Our Products</h1>
          <p className="text-lg text-gray-600">Discover our complete collection of premium kitchen essentials</p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="knives">Knives</SelectItem>
              <SelectItem value="cookware">Cookware</SelectItem>
              <SelectItem value="appliances">Appliances</SelectItem>
              <SelectItem value="utensils">Utensils</SelectItem>
              <SelectItem value="accessories">Accessories</SelectItem>
            </SelectContent>
          </Select>

          {/* Price Range Filter */}
          <div className="flex items-center gap-2 w-full md:w-64">
            <SlidersHorizontal className="h-5 w-5 text-gray-400" />
            <Input
              type="number"
              placeholder="Min Price"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number.parseInt(e.target.value) || 0, priceRange[1]])}
              className="w-1/2"
            />
            <span className="text-gray-500">-</span>
            <Input
              type="number"
              placeholder="Max Price"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value) || 2000])}
              className="w-1/2"
            />
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loadingProducts
            ? Array.from({ length: 8 }).map((_, index) => <ProductCardSkeleton key={index} />)
            : filteredAndSortedProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="p-0 relative">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <Link href={`/products/${product.id}`}>
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={300}
                          height={300}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                      <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
                        {product.badge}
                      </Badge>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button
                          size="sm"
                          className="bg-white/90 text-gray-900 hover:bg-white transform -translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                          onClick={() => handleQuickView(product)}
                        >
                          Quick View
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <Link href={`/products/${product.id}`}>
                      <CardTitle className="text-lg mb-2 line-clamp-2 font-heading">{product.name}</CardTitle>
                    </Link>
                    <div className="flex items-center mb-2">
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
                      <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">₵{product.price.toFixed(2)}</span>
                      <span className="text-lg text-gray-500 line-through">₵{product.originalPrice.toFixed(2)}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between items-center">
                    <Button
                      className="flex-1 bg-primary hover:bg-primary-600 text-primary-foreground"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`ml-2 rounded-xl hover:bg-primary-50 ${
                        isInWishlist(product.id) ? "text-red-500" : "text-gray-500 hover:text-primary"
                      }`}
                      onClick={() => handleToggleWishlist(product)}
                    >
                      <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? "fill-red-500" : ""}`} />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
        </div>

        {filteredAndSortedProducts.length === 0 && !loadingProducts && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No products found matching your criteria.</p>
          </div>
        )}
      </div>

      <Footer />
      <ProductQuickView product={selectedProduct} isOpen={isQuickViewOpen} onClose={() => setIsQuickViewOpen(false)} />
    </div>
  )
}
