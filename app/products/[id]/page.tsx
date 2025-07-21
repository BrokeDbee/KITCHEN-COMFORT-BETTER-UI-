"use client";

import { Label } from "@/components/ui/label";

import Link from "next/link";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Star,
  ShoppingCart,
  Heart,
  CheckCircle,
  Truck,
  RefreshCw,
  Shield,
} from "lucide-react";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

// Mock product data (replace with actual data fetching in a real app)
const mockProducts = [
  {
    id: 1,
    name: "Professional Chef Knife Set",
    price: 519.99,
    originalPrice: 719.99,
    rating: 4.8,
    reviews: 324,
    image: "/placeholder.svg?height=600&width=600",
    category: "knives",
    badge: "Best Seller",
    discount: 28,
    inStock: true,
    stockLevel: 85,
    description:
      "Experience precision and balance with our Professional Chef Knife Set. Crafted from high-carbon stainless steel, these knives offer exceptional sharpness and durability. Perfect for slicing, dicing, and chopping with ease.",
    specifications: [
      "Material: High-Carbon Stainless Steel",
      "Set Includes: Chef Knife, Santoku Knife, Utility Knife, Paring Knife, Bread Knife, Sharpening Rod, Wooden Block",
      "Handle: Ergonomic Pakkawood",
      "Blade Hardness: HRC 58±2",
    ],
    features: [
      { icon: CheckCircle, text: "Ultra-sharp blades" },
      { icon: Truck, text: "Free shipping" },
      { icon: RefreshCw, text: "30-day returns" },
      { icon: Shield, text: "Lifetime warranty" },
    ],
    gallery: [
      "/placeholder.svg?height=600&width=600&text=Knife+Set+1",
      "/placeholder.svg?height=600&width=600&text=Knife+Set+2",
      "/placeholder.svg?height=600&width=600&text=Knife+Set+3",
    ],
  },
  {
    id: 2,
    name: "Smart Air Fryer Pro",
    price: 799.99,
    originalPrice: 999.99,
    rating: 4.9,
    reviews: 156,
    image: "/placeholder.svg?height=600&width=600",
    category: "appliances",
    badge: "New",
    discount: 20,
    inStock: true,
    stockLevel: 92,
    description:
      "Revolutionize your cooking with the Smart Air Fryer Pro. Enjoy crispy, delicious meals with up to 80% less fat. Features smart presets, app control, and a large capacity for family-sized portions.",
    specifications: [
      "Capacity: 5.8 Liters",
      "Power: 1700W",
      "Temperature Range: 80°C - 200°C",
      "Features: Digital Touchscreen, 8 Presets, Wi-Fi Connectivity, Dishwasher-Safe Basket",
    ],
    features: [
      { icon: CheckCircle, text: "Healthy cooking" },
      { icon: Truck, text: "Free shipping" },
      { icon: RefreshCw, text: "30-day returns" },
      { icon: Shield, text: "1-year warranty" },
    ],
    gallery: [
      "/placeholder.svg?height=600&width=600&text=Air+Fryer+1",
      "/placeholder.svg?height=600&width=600&text=Air+Fryer+2",
      "/placeholder.svg?height=600&width=600&text=Air+Fryer+3",
    ],
  },
  // Add more mock products as needed
];

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const productId = Number.parseInt(params.id);
  const product = mockProducts.find((p) => p.id === productId);

  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(
    product?.image || "/placeholder.svg"
  );

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    if (product) {
      setMainImage(product.image);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 font-heading">
          Product Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          The product you are looking for does not exist.
        </p>
        <Link href="/products">
          <Button className="bg-primary hover:bg-primary-600 text-primary-foreground">
            Back to Products
          </Button>
        </Link>
      </div>
    );
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: product.name, href: `/products/${product.id}` },
  ];

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  const handleToggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />

      <main className="container mx-auto px-4 py-8 md:py-12">
        <Breadcrumbs items={breadcrumbs} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image Gallery */}
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-lg h-[450px] rounded-xl overflow-hidden shadow-lg mb-6">
              <Image
                src={mainImage || "/placeholder.svg"}
                alt={product.name}
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {product.gallery.map((imgSrc, index) => (
                <div
                  key={index}
                  className={`relative w-24 h-24 rounded-md overflow-hidden cursor-pointer border-2 ${
                    mainImage === imgSrc
                      ? "border-primary"
                      : "border-transparent"
                  } hover:border-primary transition-colors duration-200`}
                  onClick={() => setMainImage(imgSrc)}
                >
                  <Image
                    src={imgSrc || "/placeholder.svg"}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-900 font-heading">
              {product.name}
            </h1>
            <div className="flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg text-gray-600 ml-3 font-medium">
                ({product.reviews} reviews)
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-5xl font-bold text-primary">
                ₵{product.price.toFixed(2)}
              </span>
              <span className="text-2xl text-gray-500 line-through">
                ₵{product.originalPrice.toFixed(2)}
              </span>
              <Badge className="bg-green-500 text-white text-lg px-3 py-1 rounded-full font-bold">
                -{product.discount}%
              </Badge>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">
              {product.description}
            </p>

            <Separator />

            {/* Stock and Quantity */}
            <div className="space-y-4">
              <div className="flex justify-between text-base text-gray-700">
                <span>Stock Level</span>
                <span className="font-medium">{product.stockLevel}%</span>
              </div>
              <Progress value={product.stockLevel} className="h-2" />
              <p className="text-base text-gray-700 flex items-center">
                <div
                  className={`w-3 h-3 rounded-full mr-2 ${
                    product.inStock
                      ? "bg-green-500 animate-pulse"
                      : "bg-red-500"
                  }`}
                ></div>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Label htmlFor="quantity" className="text-lg font-medium">
                Quantity:
              </Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))
                }
                className="w-24 text-center text-lg"
              />
              <Button
                size="lg"
                className="flex-1 bg-primary hover:bg-primary-600 text-primary-foreground text-lg py-6 rounded-xl shadow-lg"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="lg"
                className={`p-3 rounded-xl shadow-lg ${
                  isInWishlist(product.id)
                    ? "text-red-500 border-red-500 hover:bg-red-50"
                    : "text-gray-500 hover:text-primary hover:border-primary"
                }`}
                onClick={handleToggleWishlist}
              >
                <Heart
                  className={`w-6 h-6 ${
                    isInWishlist(product.id) ? "fill-red-500" : ""
                  }`}
                />
              </Button>
            </div>

            <Separator />

            {/* Product Features */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 font-heading">
                Key Features
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-lg text-gray-700">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <feature.icon className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            {/* Specifications */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 font-heading">
                Specifications
              </h3>
              <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
                {product.specifications.map((spec, index) => (
                  <li key={index}>{spec}</li>
                ))}
              </ul>
            </div>

            {/* Simulated Reviews Section */}
            <Separator />
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 font-heading">
                Customer Reviews ({product.reviews})
              </h3>
              <div className="space-y-4">
                {/* Example Review 1 */}
                <div className="border-b pb-4 last:border-b-0">
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">
                      by Jane Doe on Dec 20, 2024
                    </span>
                  </div>
                  <p className="text-gray-700 italic">
                    "This knife set is absolutely amazing! Super sharp and
                    comfortable to use."
                  </p>
                </div>
                {/* Example Review 2 */}
                <div className="border-b pb-4 last:border-b-0">
                  <div className="flex items-center mb-2">
                    {[...Array(4)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                    <Star className="w-4 h-4 text-gray-300" />
                    <span className="text-sm text-gray-600 ml-2">
                      by John Smith on Dec 18, 2024
                    </span>
                  </div>
                  <p className="text-gray-700 italic">
                    "Good quality, but the block is a bit bulky for my small
                    kitchen."
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                className="text-primary hover:bg-primary-50 bg-transparent"
              >
                Read All Reviews
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
