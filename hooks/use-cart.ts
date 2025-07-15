"use client"

import { useState, useEffect, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

export function useCart() {
  const { toast } = useToast()
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Load cart from localStorage on initial mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("kitchenComfortCart")
      if (storedCart) {
        setCartItems(JSON.parse(storedCart))
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error)
      // Fallback to empty cart if parsing fails
      setCartItems([])
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("kitchenComfortCart", JSON.stringify(cartItems))
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error)
    }
  }, [cartItems])

  const addToCart = useCallback(
    (product: Omit<CartItem, "quantity">) => {
      setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === product.id)
        if (existingItem) {
          const updatedItems = prevItems.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
          )
          toast({
            title: "Cart Updated!",
            description: `${product.name} quantity increased.`,
            duration: 2000,
          })
          return updatedItems
        } else {
          const newItems = [...prevItems, { ...product, quantity: 1 }]
          toast({
            title: "Added to Cart!",
            description: `${product.name} has been added to your cart.`,
            duration: 2000,
          })
          return newItems
        }
      })
    },
    [toast],
  )

  const removeFromCart = useCallback(
    (productId: number) => {
      setCartItems((prevItems) => {
        const removedItem = prevItems.find((item) => item.id === productId)
        if (removedItem) {
          toast({
            title: "Removed from Cart",
            description: `${removedItem.name} has been removed.`,
            duration: 2000,
          })
        }
        return prevItems.filter((item) => item.id !== productId)
      })
    },
    [toast],
  )

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    setCartItems((prevItems) => {
      if (quantity <= 0) {
        return prevItems.filter((item) => item.id !== productId)
      }
      return prevItems.map((item) => (item.id === productId ? { ...item, quantity } : item))
    })
  }, [])

  const clearCart = useCallback(() => {
    setCartItems([])
    toast({
      title: "Cart Cleared",
      description: "Your shopping cart is now empty.",
      duration: 2000,
    })
  }, [toast])

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0)

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartItemCount,
  }
}
