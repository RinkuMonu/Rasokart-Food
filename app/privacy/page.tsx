import {
  Shield,
  Lock,
  Database,
  FileCheck,
  Users,
  Mail,
} from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-orange-500 to-orange-400 text-white">

        <div className="absolute inset-0 bg-black/10" />

        <div className="relative mx-auto max-w-7xl px-4 py-24">

          <div className="max-w-3xl">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur">
              <Shield size={18} />
              Privacy & Data Protection
            </div>

            <h1 className="mb-6 text-5xl font-bold leading-tight">
              Privacy Policy
            </h1>

            <p className="text-lg text-orange-50">
              At Rasokart Foods Private Limited, we are committed
              to protecting your personal and business information.
              This Privacy Policy explains how we collect, use,
              store and safeguard the information shared with us
              through our wholesale platform.
            </p>

          </div>

        </div>

      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-4 py-16">

        {/* Intro Card */}
        <div className="mb-10 rounded-3xl bg-white p-8 shadow-sm">

          <h2 className="mb-4 text-3xl font-bold">
            Our Commitment To Privacy
          </h2>

          <p className="leading-8 text-gray-600">
            Rasokart Foods Private Limited values the trust placed in us
            by restaurants, hotels, catering businesses, retailers,
            distributors and commercial buyers. We understand that
            business information is sensitive and must be handled
            responsibly.
          </p>

        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2">

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <Database className="mb-4 text-orange-500" size={36} />

            <h3 className="mb-3 text-2xl font-bold">
              Information We Collect
            </h3>

            <ul className="space-y-3 text-gray-600">
              <li>• Company & Business Information</li>
              <li>• GST & Tax Registration Details</li>
              <li>• Billing & Shipping Addresses</li>
              <li>• Order & Purchase History</li>
              <li>• Contact Information</li>
              <li>• Website Usage Analytics</li>
            </ul>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <Users className="mb-4 text-orange-500" size={36} />

            <h3 className="mb-3 text-2xl font-bold">
              How We Use Information
            </h3>

            <ul className="space-y-3 text-gray-600">
              <li>• Processing wholesale orders</li>
              <li>• Managing deliveries</li>
              <li>• Customer support</li>
              <li>• Improving our services</li>
              <li>• Fraud prevention</li>
              <li>• Business communications</li>
            </ul>
          </div>

        </div>

        {/* Security Section */}
        <div className="mt-10 rounded-3xl bg-white p-8 shadow-sm">

          <div className="flex items-center gap-4 mb-6">
            <Lock
              className="text-orange-500"
              size={40}
            />

            <h2 className="text-3xl font-bold">
              Data Security
            </h2>
          </div>

          <p className="leading-8 text-gray-600">
            We employ industry-standard security measures to protect
            customer and business information. Access to sensitive
            data is restricted to authorized personnel only.
            Payment information is processed through secure systems
            and we continuously monitor our infrastructure to
            maintain a secure environment.
          </p>

        </div>

        {/* Compliance Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <FileCheck
              className="mb-4 text-orange-500"
              size={34}
            />

            <h3 className="mb-3 text-xl font-bold">
              Legal Compliance
            </h3>

            <p className="text-gray-600">
              We comply with applicable laws and regulations
              governing business operations and customer data.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <Shield
              className="mb-4 text-orange-500"
              size={34}
            />

            <h3 className="mb-3 text-xl font-bold">
              Information Protection
            </h3>

            <p className="text-gray-600">
              We take reasonable steps to prevent unauthorized
              access, misuse or disclosure of information.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <Mail
              className="mb-4 text-orange-500"
              size={34}
            />

            <h3 className="mb-3 text-xl font-bold">
              Contact Us
            </h3>

            <p className="text-gray-600">
              For privacy-related questions, please contact our
              support team at:
              <br />
              <strong>rasocartfood@gmail.com</strong>
            </p>
          </div>

        </div>

        {/* Bottom Notice */}
        <div className="mt-10 rounded-3xl border border-orange-200 bg-orange-50 p-8">

          <h3 className="mb-3 text-2xl font-bold text-orange-700">
            Policy Updates
          </h3>

          <p className="leading-8 text-orange-800">
            We may update this Privacy Policy periodically to reflect
            changes in our services, legal requirements or security
            practices. Any updates will be published on this page.
          </p>

        </div>

      </section>

    </div>
  );
}