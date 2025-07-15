import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import Link from "next/link"

export default function PrivacyPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Privacy Policy", href: "/privacy" },
  ]

  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />

      <main className="container mx-auto px-4 py-8 md:py-12">
        <Breadcrumbs items={breadcrumbs} className="mb-8" />

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">Privacy Policy</h1>
          <p className="text-lg text-gray-600">Last Updated: December 15, 2024</p>
        </div>

        <div className="prose prose-lg mx-auto max-w-3xl text-gray-700">
          <p>
            At Kitchen Comfort, we are committed to protecting your privacy. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you visit our website{" "}
            <Link href="/" className="text-primary hover:underline">
              www.kitchencomfort.com
            </Link>
            , including any other media form, media channel, mobile website, or mobile application related or connected
            thereto (collectively, the "Site"). Please read this Privacy Policy carefully. If you do not agree with the
            terms of this Privacy Policy, please do not access the Site.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We may collect information about you in a variety of ways. The information we may collect on the Site
            includes:
          </p>
          <h3>Personal Data</h3>
          <p>
            Personally identifiable information, such as your name, shipping address, email address, and telephone
            number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily
            give to us when you register with the Site or when you choose to participate in various activities related
            to the Site, such as online chat and message boards.
          </p>
          <h3>Derivative Data</h3>
          <p>
            Information our servers automatically collect when you access the Site, such as your IP address, your
            browser type, your operating system, your access times, and the pages you have viewed directly before and
            after accessing the Site.
          </p>
          <h3>Financial Data</h3>
          <p>
            Financial information, such as data related to your payment method (e.g., valid credit card number, card
            brand, expiration date) that we may collect when you purchase, order, return, exchange, or request
            information about our services from the Site.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>
            Having accurate information about you permits us to provide you with a smooth, efficient, and customized
            experience. Specifically, we may use information collected about you via the Site to:
          </p>
          <ul>
            <li>Create and manage your account.</li>
            <li>
              Process your transactions and send you related information, including purchase confirmations and invoices.
            </li>
            <li>Deliver products and services you have ordered.</li>
            <li>Enable user-to-user communications.</li>
            <li>Generate a personal profile about you to make your visit to the Site more personalized.</li>
            <li>Increase the efficiency and operation of the Site.</li>
            <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
            <li>Notify you of updates to the Site.</li>
            <li>Offer new products, services, mobile applications, and/or recommendations to you.</li>
            <li>Perform other business activities as needed.</li>
          </ul>

          <h2>3. Disclosure of Your Information</h2>
          <p>
            We may share information we have collected about you in certain situations. Your information may be
            disclosed as follows:
          </p>
          <h3>By Law or to Protect Rights</h3>
          <p>
            If we believe the release of information about you is necessary to respond to legal process, to investigate
            or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we
            may share your information as permitted or required by any applicable law, rule, or regulation.
          </p>
          <h3>Third-Party Service Providers</h3>
          <p>
            We may share your information with third parties that perform services for us or on our behalf, including
            payment processing, data analysis, email delivery, hosting services, customer service, and marketing
            assistance.
          </p>
          <h3>Marketing Communications</h3>
          <p>
            With your consent, or with an opportunity for you to withdraw consent, we may share your information with
            third parties for marketing purposes, as permitted by law.
          </p>

          <h2>4. Security of Your Information</h2>
          <p>
            We use administrative, technical, and physical security measures to help protect your personal information.
            While we have taken reasonable steps to secure the personal information you provide to us, please be aware
            that despite our efforts, no security measures are perfect or impenetrable, and no method of data
            transmission can be guaranteed against any interception or other type of misuse.
          </p>

          <h2>5. Policy for Children</h2>
          <p>
            We do not knowingly solicit information from or market to children under the age of 13. If you become aware
            of any data we have collected from children under age 13, please contact us using the contact information
            provided below.
          </p>

          <h2>6. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
            Changes to this Privacy Policy are effective when they are posted on this page.
          </p>

          <h2>7. Contact Us</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please{" "}
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
