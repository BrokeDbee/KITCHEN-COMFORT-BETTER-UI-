"use client";

import type React from "react";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [shippingDetails, setShippingDetails] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    country: "Ghana",
  });
  const [paymentMethod, setPaymentMethod] = useState("card"); // 'card' or 'mobile_money'
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const shippingCost = cartTotal > 0 ? 20.0 : 0;
  const totalAmount = cartTotal + shippingCost;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setShippingDetails((prev) => ({ ...prev, [id]: value }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeToTerms) {
      toast({
        title: "Terms Agreement Required",
        description:
          "Please agree to the terms and conditions to place your order.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    // Simulate API call for order placement
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Order placed:", {
      cartItems,
      shippingDetails,
      paymentMethod,
      totalAmount,
    });

    clearCart(); // Clear cart after successful order
    setOrderPlaced(true);
    setIsProcessing(false);

    toast({
      title: "Order Placed Successfully!",
      description: "Your order has been confirmed and is being processed.",
      duration: 5000,
    });
  };

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Cart", href: "/cart" },
    { label: "Checkout", href: "/checkout" },
  ];

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 md:py-12 flex items-center justify-center">
          <Card className="max-w-md w-full text-center p-8 shadow-lg">
            <CardContent className="space-y-6">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto animate-scale-in" />
              <h2 className="text-3xl font-bold text-gray-900 font-heading">
                Thank You for Your Order!
              </h2>
              <p className="text-lg text-gray-700">
                Your order has been successfully placed.
              </p>
              <p className="text-gray-600">
                You will receive an email confirmation shortly with your order
                details and tracking information.
              </p>
              <Link href="/orders">
                <Button className="bg-primary hover:bg-primary-600 text-primary-foreground mt-4">
                  View My Orders
                </Button>
              </Link>
              <Link href="/products">
                <Button
                  variant="outline"
                  className="mt-2 text-primary hover:bg-primary-50 bg-transparent"
                >
                  Continue Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 md:py-12 flex items-center justify-center">
          <Card className="max-w-md w-full text-center py-12 shadow-lg">
            <CardContent className="space-y-4">
              <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto" />
              <h2 className="text-2xl font-bold text-gray-800 font-heading">
                Your cart is empty!
              </h2>
              <p className="text-gray-600">
                Please add items to your cart before proceeding to checkout.
              </p>
              <Link href="/products">
                <Button className="bg-primary hover:bg-primary-600 text-primary-foreground mt-4">
                  Start Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />

      <main className="container mx-auto px-4 py-8 md:py-12">
        <Breadcrumbs items={breadcrumbs} className="mb-8" />

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">
            Checkout
          </h1>
          <p className="text-lg text-gray-600">
            Review your order and complete your purchase.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Shipping Details Form */}
          <Card className="lg:col-span-2 shadow-md">
            <CardHeader>
              <CardTitle className="font-heading">
                Shipping Information
              </CardTitle>
              <CardDescription>Enter your delivery details.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={shippingDetails.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={shippingDetails.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={shippingDetails.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Textarea
                    id="address"
                    value={shippingDetails.address}
                    onChange={handleInputChange}
                    required
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={shippingDetails.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">Zip/Postal Code</Label>
                  <Input
                    id="zip"
                    value={shippingDetails.zip}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={shippingDetails.country}
                    onChange={handleInputChange}
                    disabled
                  />
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Order Summary & Payment */}
          <Card className="h-fit shadow-md">
            <CardHeader>
              <CardTitle className="font-heading">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm text-gray-700"
                  >
                    <span>
                      {item.name} (x{item.quantity})
                    </span>
                    <span>₵{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>₵{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span>
                  {shippingCost > 0 ? `₵${shippingCost.toFixed(2)}` : "Free"}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-xl text-gray-900">
                <span>Total</span>
                <span>₵{totalAmount.toFixed(2)}</span>
              </div>

              <Separator />

              {/* Payment Method */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Payment Method</h3>
                <div className="flex flex-col space-y-2">
                  <Label
                    htmlFor="payment-card"
                    className="flex items-center cursor-pointer"
                  >
                    <Input
                      type="radio"
                      id="payment-card"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="mr-2"
                    />
                    Credit/Debit Card (Simulated)
                  </Label>
                  <Label
                    htmlFor="payment-mobile-money"
                    className="flex items-center cursor-pointer"
                  >
                    <Input
                      type="radio"
                      id="payment-mobile-money"
                      name="paymentMethod"
                      value="mobile_money"
                      checked={paymentMethod === "mobile_money"}
                      onChange={() => setPaymentMethod("mobile_money")}
                      className="mr-2"
                    />
                    Mobile Money (Simulated)
                  </Label>
                </div>
              </div>

              <Separator />

              {/* Terms and Conditions */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms-agree"
                  checked={agreeToTerms}
                  onCheckedChange={(checked) =>
                    setAgreeToTerms(checked as boolean)
                  }
                />
                <Label htmlFor="terms-agree" className="text-sm">
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-primary hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handlePlaceOrder}
                className="w-full bg-primary hover:bg-primary-600 text-primary-foreground text-lg py-6"
                disabled={isProcessing || cartItems.length === 0}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Place Order - ₵${totalAmount.toFixed(2)}`
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
