"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { User, ShoppingBag, Lock } from "lucide-react"
import Link from "next/link"
import { Breadcrumbs } from "@/components/breadcrumbs"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "+233 24 123 4567",
    address: "123 Main St, Accra, Ghana",
  })

  const handleSave = () => {
    // In a real app, you'd send this data to your backend
    console.log("Saving profile data:", profileData)
    setIsEditing(false)
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "My Profile", href: "/profile" },
  ]

  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />

      <main className="container mx-auto px-4 py-8 md:py-12">
        <Breadcrumbs items={breadcrumbs} className="mb-8" />

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">My Profile</h1>
          <p className="text-lg text-gray-600">Manage your personal information and account settings.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar Navigation */}
          <Card className="lg:col-span-1 h-fit shadow-md">
            <CardHeader>
              <CardTitle className="font-heading">Account Navigation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/profile">
                <Button variant="ghost" className="w-full justify-start text-primary hover:bg-primary-50">
                  <User className="w-4 h-4 mr-2" />
                  Personal Info
                </Button>
              </Link>
              <Link href="/orders">
                <Button variant="ghost" className="w-full justify-start hover:bg-primary-50">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  My Orders
                </Button>
              </Link>
              <Link href="/password-change">
                <Button variant="ghost" className="w-full justify-start hover:bg-primary-50">
                  <Lock className="w-4 h-4 mr-2" />
                  Change Password
                </Button>
              </Link>
              <Separator className="my-4" />
              <Button variant="destructive" className="w-full justify-start">
                Sign Out
              </Button>
            </CardContent>
          </Card>

          {/* Profile Details */}
          <Card className="lg:col-span-2 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-heading">Personal Information</CardTitle>
                <CardDescription>Update your contact details and shipping address.</CardDescription>
              </div>
              <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" alt="User Avatar" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 font-heading">{profileData.name}</h2>
                  <p className="text-gray-600">{profileData.email}</p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Shipping Address</Label>
                  <Input
                    id="address"
                    value={profileData.address}
                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {isEditing && (
                <Button onClick={handleSave} className="bg-primary hover:bg-primary-600 text-primary-foreground">
                  Save Changes
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
