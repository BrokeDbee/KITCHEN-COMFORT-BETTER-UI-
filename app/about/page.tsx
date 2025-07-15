import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { Users, Lightbulb, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />

      <main className="container mx-auto px-4 py-12 md:py-20">
        <section className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-heading">About Kitchen Comfort</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our journey to bring joy and comfort to every kitchen.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="animate-slide-in-left">
            <Image
              src="/placeholder.svg?height=500&width=700"
              alt="Our Story"
              width={700}
              height={500}
              className="rounded-xl shadow-lg object-cover w-full h-auto"
            />
          </div>
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <h2 className="text-3xl font-bold text-gray-900 font-heading">Our Story</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Kitchen Comfort was founded with a simple yet profound vision: to transform everyday cooking into an
              extraordinary experience. We believe that the heart of every home is its kitchen, and with the right
              tools, anyone can create culinary masterpieces and cherish moments with loved ones.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Starting as a small local shop, we've grown into a trusted online destination for premium kitchen
              essentials, serving passionate home cooks and professional chefs across Ghana. Our commitment to quality,
              innovation, and customer satisfaction remains at the core of everything we do.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-heading">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide us in delivering the best to your kitchen.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl shadow-lg bg-white hover:shadow-xl transition-all duration-300 animate-scale-in">
              <Users className="w-12 h-12 text-primary mx-auto mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-heading">Customer Focus</h3>
              <p className="text-gray-600">
                Your satisfaction is our priority. We listen, adapt, and strive to exceed your expectations.
              </p>
            </div>
            <div
              className="text-center p-8 rounded-xl shadow-lg bg-white hover:shadow-xl transition-all duration-300 animate-scale-in"
              style={{ animationDelay: "150ms" }}
            >
              <Lightbulb className="w-12 h-12 text-primary mx-auto mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-heading">Quality & Innovation</h3>
              <p className="text-gray-600">
                We meticulously select products that combine superior craftsmanship with cutting-edge design.
              </p>
            </div>
            <div
              className="text-center p-8 rounded-xl shadow-lg bg-white hover:shadow-xl transition-all duration-300 animate-scale-in"
              style={{ animationDelay: "300ms" }}
            >
              <Heart className="w-12 h-12 text-primary mx-auto mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-heading">Passion for Cooking</h3>
              <p className="text-gray-600">
                We share your love for food and cooking, inspiring every product choice and service we offer.
              </p>
            </div>
          </div>
        </section>

        <section className="text-center animate-fade-in">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 font-heading">Join Our Culinary Journey</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Become a part of the Kitchen Comfort family and elevate your cooking experience.
          </p>
          <Link href="/products">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary-600 text-primary-foreground px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Shop Now
            </Button>
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  )
}
