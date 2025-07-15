import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import Link from "next/link"

export default function TermsPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Terms of Service", href: "/terms" },
  ]

  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />

      <main className="container mx-auto px-4 py-8 md:py-12">
        <Breadcrumbs items={breadcrumbs} className="mb-8" />

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">Terms of Service</h1>
          <p className="text-lg text-gray-600">Last Updated: December 15, 2024</p>
        </div>

        <div className="prose prose-lg mx-auto max-w-3xl text-gray-700">
          <p>
            Welcome to Kitchen Comfort! These Terms of Service ("Terms") govern your use of our website, products, and
            services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these
            Terms and our Privacy Policy. If you do not agree to these Terms, please do not use our Services.
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By creating an account, making a purchase, or otherwise using our Services, you acknowledge that you have
            read, understood, and agree to be bound by these Terms. We reserve the right to update or modify these Terms
            at any time without prior notice. Your continued use of the Services after any such changes constitutes your
            acceptance of the new Terms.
          </p>

          <h2>2. Use of Services</h2>
          <p>
            You agree to use our Services only for lawful purposes and in accordance with these Terms. You are
            responsible for maintaining the confidentiality of your account and password and for restricting access to
            your computer. You agree to accept responsibility for all activities that occur under your account or
            password.
          </p>

          <h2>3. Product Information and Pricing</h2>
          <p>
            We strive to provide accurate product descriptions and pricing information. However, we do not guarantee
            that all product descriptions, images, or pricing are entirely accurate, complete, reliable, current, or
            error-free. In the event of a pricing error, we reserve the right to cancel any orders placed for the
            incorrectly priced product.
          </p>

          <h2>4. Orders and Payment</h2>
          <p>
            All orders placed through our Services are subject to our acceptance. We may, in our sole discretion, limit
            or cancel quantities purchased per person, per household, or per order. We accept various payment methods as
            indicated on our checkout page. By providing payment information, you represent and warrant that you are
            authorized to use the designated payment method.
          </p>

          <h2>5. Shipping and Delivery</h2>
          <p>
            We aim to process and ship orders promptly. Delivery times are estimates and not guaranteed. We are not
            responsible for delays caused by shipping carriers or unforeseen circumstances. Risk of loss and title for
            items purchased from Kitchen Comfort pass to you upon our delivery to the carrier.
          </p>

          <h2>6. Returns and Refunds</h2>
          <p>
            Please refer to our dedicated{" "}
            <Link href="/returns" className="text-primary hover:underline">
              Returns & Exchanges Policy
            </Link>{" "}
            for detailed information on our return process and eligibility for refunds.
          </p>

          <h2>7. Intellectual Property</h2>
          <p>
            All content on this website, including text, graphics, logos, images, and software, is the property of
            Kitchen Comfort or its content suppliers and is protected by international copyright laws. You may not
            reproduce, distribute, modify, or create derivative works from any content without our express written
            permission.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by applicable law, Kitchen Comfort shall not be liable for any indirect,
            incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether
            incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting
            from (a) your access to or use of or inability to access or use the Services; (b) any conduct or content of
            any third party on the Services; or (c) unauthorized access, use, or alteration of your transmissions or
            content.
          </p>

          <h2>9. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of Ghana, without regard to its
            conflict of law principles.
          </p>

          <h2>10. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please{" "}
            <Link href="/contact" className="text-primary hover:underline">
              contact us
            </Link>
            .
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
