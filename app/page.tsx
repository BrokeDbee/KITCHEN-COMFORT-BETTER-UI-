"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Star,
  ShoppingCart,
  Truck,
  Shield,
  Award,
  TrendingUp,
  Users,
  Phone,
  MessageCircle,
  CreditCard,
  RefreshCw,
  Gift,
  Zap,
  ChefHat,
  Heart,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductQuickView } from "@/components/product-quick-view"
import { ScrollToTopButton } from "@/components/scroll-to-top-button"
import { ProductCardSkeleton } from "@/components/product-card-skeleton"
import { useCart } from "@/hooks/use-cart"
import { useWishlist } from "@/hooks/use-wishlist" // Import useWishlist

export default function HomePage() {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [newsletterEmail, setNewsletterEmail] = useState("")
  const [newsletterSuccess, setNewsletterSuccess] = useState(false)
  const [loadingProducts, setLoadingProducts] = useState(true)
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist() // Use wishlist hook

  const featuredProducts = [
    {
      id: 1,
      name: "Professional Chef Knife Set",
      price: 519.99,
      originalPrice: 719.99,
      rating: 4.8,
      reviews: 324,
      image: "/placeholder.svg?height=300&width=300",
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
      badge: "Popular",
      discount: 25,
      inStock: true,
      stockLevel: 78,
    },
  ]

  const categories = [
    { name: "Kitchen Knives", count: "50+ items", trend: "+12%" },
    { name: "Cookware", count: "80+ items", trend: "+8%" },
    { name: "Appliances", count: "120+ items", trend: "+15%" },
    { name: "Utensils", count: "60+ items", trend: "+5%" },
    { name: "Storage", count: "40+ items", trend: "+10%" },
    { name: "Accessories", count: "90+ items", trend: "+7%" },
  ]

  const features = [
    {
      icon: Truck,
      title: "Free Delivery",
      description: "Free delivery on orders over ₵200 across Ghana. Fast and reliable shipping to your doorstep.",
      highlight: "Same day delivery available",
    },
    {
      icon: Shield,
      title: "Quality Guarantee",
      description: "30-day money back guarantee on all products. Your satisfaction is our priority.",
      highlight: "100% satisfaction guaranteed",
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "Carefully curated kitchen essentials from trusted brands. Only the best for your kitchen.",
      highlight: "Handpicked by experts",
    },
  ]

  const additionalFeatures = [
    {
      icon: Phone,
      title: "24/7 Customer Support",
      description: "Get help anytime with our dedicated customer support team",
    },
    {
      icon: CreditCard,
      title: "Secure Payment",
      description: "Multiple payment options with bank-level security",
    },
    {
      icon: RefreshCw,
      title: "Easy Returns",
      description: "Hassle-free returns within 30 days of purchase",
    },
    {
      icon: Gift,
      title: "Loyalty Rewards",
      description: "Earn points with every purchase and get exclusive discounts",
    },
    {
      icon: Zap,
      title: "Express Checkout",
      description: "Quick and easy checkout process in just a few clicks",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Instant help with our live chat support system",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Accra, Ghana",
      rating: 5,
      comment: "Amazing quality products! My new knife set has completely transformed my cooking experience.",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Michael Asante",
      location: "Kumasi, Ghana",
      rating: 5,
      comment: "Fast delivery and excellent customer service. The air fryer works perfectly!",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Grace Mensah",
      location: "Tamale, Ghana",
      rating: 5,
      comment: "Best kitchen store in Ghana. High quality products at reasonable prices.",
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingProducts(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

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

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Newsletter signup for:", newsletterEmail)
    setNewsletterSuccess(true)
    setNewsletterEmail("")
    setTimeout(() => setNewsletterSuccess(false), 3000)
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />

      {/* Main Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Kitchen background"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/80 via-white/70 to-primary-100/80 z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full text-primary-800 text-sm font-medium border border-primary-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-2 h-2 bg-primary rounded-full mr-3 animate-pulse"></div>
              Premium Kitchen Essentials
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight font-heading">
              <span className="text-gray-900">Transform Your</span>
              <br />
              <span className="text-primary relative">Kitchen Experience</span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover premium kitchen utensils and appliances that make cooking a joy. From professional-grade knives
              to smart appliances - we have everything you need to create culinary masterpieces.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="group bg-primary hover:bg-primary-600 text-primary-foreground px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <ShoppingCart className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Shop Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg rounded-xl transition-all duration-300 bg-transparent shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <TrendingUp className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                View Categories
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
              <div className="text-center group cursor-pointer">
                <div className="text-4xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">
                  500+
                </div>
                <div className="text-gray-600 font-medium">Premium Products</div>
                <Progress
                  value={85}
                  className="mt-2 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-4xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">
                  50K+
                </div>
                <div className="text-gray-600 font-medium">Happy Customers</div>
                <Progress
                  value={95}
                  className="mt-2 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-4xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">
                  4.9★
                </div>
                <div className="text-gray-600 font-medium">Customer Rating</div>
                <Progress
                  value={98}
                  className="mt-2 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer group z-10">
          <div className="w-8 h-12 border-2 border-primary rounded-full flex justify-center bg-white/80 backdrop-blur-sm group-hover:bg-primary-50 transition-colors duration-300">
            <div className="w-2 h-4 bg-primary rounded-full mt-2 animate-pulse group-hover:animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Section for the previously floating cards (now static) */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-heading">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              What makes Kitchen Comfort your ideal choice for kitchen essentials
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 */}
            <div className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 border border-gray-100">
              <div className="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                <ChefHat className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900 group-hover:text-primary transition-colors duration-300 font-heading">
                Professional Tools
              </h3>
              <p className="text-gray-600 leading-relaxed">Chef-grade utensils for perfect results</p>
              <div className="mt-4 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-all duration-300">
                <TrendingUp className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Most Popular</span>
              </div>
            </div>
            {/* Card 2 */}
            <div className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:-rotate-1 border border-gray-100">
              <div className="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                <Award className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900 group-hover:text-primary transition-colors duration-300 font-heading">
                Quality Assured
              </h3>
              <p className="text-gray-600 leading-relaxed">Premium materials, lasting durability</p>
              <div className="mt-4 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-all duration-300">
                <Shield className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Guaranteed</span>
              </div>
            </div>
            {/* Card 3 */}
            <div className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:-rotate-1 border border-gray-100">
              <div className="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                <Truck className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900 group-hover:text-primary transition-colors duration-300 font-heading">
                Fast Delivery
              </h3>
              <p className="text-gray-600 leading-relaxed">Quick shipping across Ghana</p>
              <div className="mt-4 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-all duration-300">
                <Zap className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Lightning Fast</span>
              </div>
            </div>
            {/* Card 4 */}
            <div className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 border border-gray-100">
              <div className="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                <Users className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-3 group-hover:text-primary transition-colors duration-300 font-heading">
                Community
              </h3>
              <p className="text-gray-600 text-sm mb-2">Join thousands of happy cooks</p>
              <div className="flex items-center justify-center text-green-600 text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300">
                <Users className="w-4 h-4 mr-2 text-primary group-hover:scale-110 transition-transform duration-300" />
                50K+ Members
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 bg-white relative overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-heading">Shop by Category</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our carefully curated categories of premium kitchen essentials
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="group cursor-pointer animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-white hover:bg-primary-50 rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 transform hover:-translate-y-3 hover:scale-105 relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-primary transition-colors duration-300 font-heading">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">{category.count}</p>
                  <div className="flex items-center justify-center text-green-600 text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {category.trend}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Features Section */}
      <section className="py-20 px-4 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-heading">Why Choose Kitchen Comfort?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to providing the best kitchen essentials with exceptional service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group text-center p-10 rounded-3xl hover:bg-gray-50 transition-all duration-500 transform hover:-translate-y-4 border border-transparent hover:border-gray-200 hover:shadow-xl animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="bg-primary-100 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                  <feature.icon className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-primary transition-colors duration-300 font-heading">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">{feature.description}</p>
                <div className="inline-flex items-center text-primary font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></div>
                  {feature.highlight}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features Section (Icons without specific colors) */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-heading">More Reasons to Love Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover all the ways we make your shopping experience exceptional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => (
              <div
                key={index}
                className="group bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 animate-scale-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 bg-primary-100 text-primary`}
                >
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors duration-300 font-heading">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-heading">What Our Customers Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 hover:bg-primary-50 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center mb-6">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={60}
                    height={60}
                    className="rounded-full mr-4 group-hover:scale-110 transition-transform duration-300"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-primary transition-colors duration-300 font-heading">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 text-sm">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed italic">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-heading">Featured Products</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most popular kitchen essentials, loved by home cooks and professional chefs alike
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {loadingProducts
              ? Array.from({ length: 4 }).map((_, index) => <ProductCardSkeleton key={index} />)
              : featuredProducts.map((product, index) => (
                  <Card
                    key={product.id}
                    className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 border-0 shadow-lg bg-white overflow-hidden animate-scale-in"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <CardHeader className="p-0 relative overflow-hidden">
                      <div className="relative">
                        <Link href={`/products/${product.id}`}>
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            width={300}
                            height={300}
                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        </Link>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                        <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground shadow-lg">
                          {product.badge}
                        </Badge>
                        <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                          -{product.discount}%
                        </div>
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
                    <CardContent className="p-6">
                      <Link href={`/products/${product.id}`}>
                        <CardTitle className="text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300 font-heading">
                          {product.name}
                        </CardTitle>
                      </Link>
                      <div className="flex items-center mb-4">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 transition-colors duration-300 ${
                                i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 ml-2 font-medium">({product.reviews})</span>
                      </div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl font-bold text-primary">₵{product.price.toFixed(2)}</span>
                        <span className="text-lg text-gray-500 line-through">₵{product.originalPrice.toFixed(2)}</span>
                      </div>
                      <div className="space-y-2">
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
                    </CardContent>
                    <CardFooter className="p-6 pt-0 flex justify-between items-center">
                      <Button
                        className="flex-1 bg-primary hover:bg-primary-600 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-xl group relative overflow-hidden"
                        onClick={() => handleAddToCart(product)}
                      >
                        <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        <ShoppingCart className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
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

          <div className="text-center mt-16 animate-fade-in">
            <Link href="/products">
              <Button
                size="lg"
                variant="outline"
                className="group border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-12 py-4 text-lg rounded-2xl transition-all duration-300 bg-transparent shadow-lg hover:shadow-xl transform hover:-translate-y-2"
              >
                <TrendingUp className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 bg-primary-100">
        <div className="container mx-auto text-center animate-fade-in">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full text-primary-800 text-sm font-medium mb-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-2 h-2 bg-primary rounded-full mr-3 animate-pulse"></div>
              Join our community of food lovers
            </div>

            <h2 className="text-4xl font-bold text-primary-900 mb-6 font-heading">Stay Updated with Kitchen Comfort</h2>
            <p className="text-xl text-gray-700 mb-12 leading-relaxed">
              Get notified about new products, exclusive deals, cooking tips, and join our community of passionate cooks
            </p>

            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto mb-8"
            >
              <div className="relative flex-1">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-6 py-4 rounded-2xl border-2 border-primary-300 focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-500 text-lg shadow-lg backdrop-blur-sm bg-white/90 transition-all duration-300 focus:scale-105"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                />
                <div className="absolute inset-0 rounded-2xl bg-primary opacity-0 hover:opacity-5 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              <Button
                type="submit"
                className="group bg-primary hover:bg-primary-600 text-primary-foreground px-8 py-4 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                Subscribe
              </Button>
            </form>
            {newsletterSuccess && (
              <p className="text-green-600 text-lg font-medium mt-4 animate-fade-in">
                Thank you for subscribing! Check your inbox for a confirmation.
              </p>
            )}

            <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center group cursor-pointer">
                <Users className="w-4 h-4 mr-2 text-primary group-hover:scale-110 transition-transform duration-300" />
                50K+ subscribers
              </div>
              <div className="flex items-center group cursor-pointer">
                <Shield className="w-4 h-4 mr-2 text-primary group-hover:scale-110 transition-transform duration-300" />
                No spam, ever
              </div>
              <div className="flex items-center group cursor-pointer">
                <Award className="w-4 h-4 mr-2 text-primary group-hover:scale-110 transition-transform duration-300" />
                Exclusive deals
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ProductQuickView product={selectedProduct} isOpen={isQuickViewOpen} onClose={() => setIsQuickViewOpen(false)} />
      <ScrollToTopButton />
    </div>
  )
}
