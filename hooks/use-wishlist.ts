"use client"

import { useState, useEffect, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"

interface WishlistItem {
  id: number
  name: string
  price: number
  image: string
}

export function useWishlist() {
  const { toast } = useToast()
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])

  // Load wishlist from localStorage on initial mount
  useEffect(() => {
    try {
      const storedWishlist = localStorage.getItem("kitchenComfortWishlist")
      if (storedWishlist) {
        setWishlistItems(JSON.parse(storedWishlist))
      }
    } catch (error) {
      console.error("Failed to load wishlist from localStorage:", error)
      setWishlistItems([])
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("kitchenComfortWishlist", JSON.stringify(wishlistItems))
    } catch (error) {
      console.error("Failed to save wishlist to localStorage:", error)
    }
  }, [wishlistItems])

  const addToWishlist = useCallback(
    (product: WishlistItem) => {
      setWishlistItems((prevItems) => {
        const exists = prevItems.some((item) => item.id === product.id)
        if (!exists) {
          toast({
            title: "Added to Wishlist!",
            description: `${product.name} has been added to your wishlist.`,
            duration: 2000,
          })
          return [...prevItems, product]
        } else {
          toast({
            title: "Already in Wishlist",
            description: `${product.name} is already in your wishlist.`,
            duration: 2000,
            variant: "destructive",
          })
          return prevItems
        }
      })
    },
    [toast],
  )

  const removeFromWishlist = useCallback(
    (productId: number) => {
      setWishlistItems((prevItems) => {
        const removedItem = prevItems.find((item) => item.id === productId)
        if (removedItem) {
          toast({
            title: "Removed from Wishlist",
            description: `${removedItem.name} has been removed.`,
            duration: 2000,
          })
        }
        return prevItems.filter((item) => item.id !== productId)
      })
    },
    [toast],
  )

  const clearWishlist = useCallback(() => {
    setWishlistItems([])
    toast({
      title: "Wishlist Cleared",
      description: "Your wishlist is now empty.",
      duration: 2000,
    })
  }, [toast])

  const isInWishlist = useCallback(
    (productId: number) => wishlistItems.some((item) => item.id === productId),
    [wishlistItems],
  )

  return {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    wishlistItemCount: wishlistItems.length,
  }
}
