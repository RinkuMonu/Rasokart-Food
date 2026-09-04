import {
  FileText,
  ShoppingCart,
  CreditCard,
  Truck,
  RefreshCcw,
  Scale,
  AlertTriangle,
} from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white">

        <div className="absolute inset-0 bg-black/20" />

        <div className="relative mx-auto max-w-7xl px-4 py-24">

          <div className="max-w-4xl">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur">
              <FileText size={18} />
              Terms & Conditions
            </div>

            <h1 className="mb-6 text-5xl font-bold">
              Terms & Conditions
            </h1>

            <p className="text-lg leading-8 text-slate-200">
              These Terms & Conditions govern the use of
              Rasokart Foods Private Limited's wholesale platform,
              products and services. By accessing our website,
              placing orders, or engaging with our services,
              you agree to comply with these terms.
            </p>

          </div>

        </div>

      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-4 py-16">

        {/* Introduction */}
        <div className="mb-10 rounded-3xl bg-white p-8 shadow-sm">

          <h2 className="mb-4 text-3xl font-bold">
            Agreement Overview
          </h2>

          <p className="leading-8 text-gray-600">
            Rasokart Foods Private Limited supplies wholesale
            grocery products to restaurants, hotels, caterers,
            retailers, distributors and other commercial buyers.
            These terms define the responsibilities, rights,
            limitations and obligations of both parties to ensure
            a transparent and professional business relationship.
          </p>

        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2">

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <ShoppingCart
              className="mb-4 text-orange-500"
              size={36}
            />

            <h3 className="mb-4 text-2xl font-bold">
              Orders & Product Availability
            </h3>

            <p className="leading-7 text-gray-600">
              All orders are subject to product availability,
              stock verification and order confirmation.
              We reserve the right to limit quantities,
              discontinue products or cancel orders in cases
              of inventory shortages, pricing errors or
              unforeseen operational issues.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <CreditCard
              className="mb-4 text-orange-500"
              size={36}
            />

            <h3 className="mb-4 text-2xl font-bold">
              Payments & Billing
            </h3>

            <p className="leading-7 text-gray-600">
              Customers are responsible for providing accurate
              billing details. Orders are processed only after
              successful payment confirmation unless approved
              credit terms have been granted by Rasokart Foods.
            </p>
          </div>

        </div>

        {/* Shipping */}
        <div className="mt-10 rounded-3xl bg-white p-8 shadow-sm">

          <div className="mb-6 flex items-center gap-4">
            <Truck
              className="text-orange-500"
              size={40}
            />

            <h2 className="text-3xl font-bold">
              Shipping & Delivery
            </h2>
          </div>

          <p className="leading-8 text-gray-600">
            Delivery timelines are estimates and may vary
            depending on location, weather conditions,
            transportation issues and product availability.
            While we strive to ensure timely delivery,
            Rasokart Foods shall not be liable for delays
            caused by factors beyond our control.
          </p>

          <ul className="mt-6 space-y-3 text-gray-600">
            <li>• Delivery timelines may vary by region.</li>
            <li>• Customers must provide accurate delivery information.</li>
            <li>• Failed delivery attempts may incur additional charges.</li>
            <li>• Ownership transfers upon successful delivery.</li>
          </ul>

        </div>

        {/* Returns */}
        <div className="mt-10 rounded-3xl bg-white p-8 shadow-sm">

          <div className="mb-6 flex items-center gap-4">
            <RefreshCcw
              className="text-orange-500"
              size={40}
            />

            <h2 className="text-3xl font-bold">
              Returns & Refunds
            </h2>
          </div>

          <p className="leading-8 text-gray-600">
            Customers should inspect products immediately upon
            delivery. Claims regarding damaged, defective or
            incorrect items must be reported within 48 hours.
            Approved claims may be eligible for replacement,
            store credit or refund depending on the situation.
          </p>

          <ul className="mt-6 space-y-3 text-gray-600">
            <li>• Returns require proof of purchase.</li>
            <li>• Perishable products may have special return conditions.</li>
            <li>• Refund timelines depend on payment method.</li>
            <li>• Returned items must meet eligibility requirements.</li>
          </ul>

        </div>

        {/* GST & Legal */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">

          <div className="rounded-3xl bg-white p-8 shadow-sm">

            <Scale
              className="mb-4 text-orange-500"
              size={36}
            />

            <h3 className="mb-4 text-2xl font-bold">
              GST & Compliance
            </h3>

            <p className="leading-7 text-gray-600">
              Customers are responsible for providing accurate
              GST and business information. Tax invoices will
              be issued in accordance with applicable laws and
              regulations.
            </p>

          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">

            <AlertTriangle
              className="mb-4 text-orange-500"
              size={36}
            />

            <h3 className="mb-4 text-2xl font-bold">
              Limitation of Liability
            </h3>

            <p className="leading-7 text-gray-600">
              Rasokart Foods shall not be liable for indirect,
              incidental or consequential losses arising from
              the use of our platform, products or services.
            </p>

          </div>

        </div>

        {/* Final Notice */}
        <div className="mt-10 rounded-3xl border border-orange-200 bg-orange-50 p-8">

          <h3 className="mb-4 text-2xl font-bold text-orange-700">
            Updates To Terms
          </h3>

          <p className="leading-8 text-orange-800">
            We reserve the right to update these Terms &
            Conditions at any time. Continued use of our
            platform after changes have been published
            constitutes acceptance of the revised terms.
          </p>

        </div>

      </section>

    </div>
  );
}