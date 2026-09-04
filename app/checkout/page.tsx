"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";

const DUMMY_COUPONS: Record<string, { type: "flat" | "percent"; value: number }> = {
  FLAT50: { type: "flat", value: 50 },
  WELCOME20: { type: "percent", value: 20 },
};

export default function CheckoutPage() {
  const router = useRouter();

  const { items, cartTotal } = useCart();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{code: string, discount: number} | null>(null);
  const [couponError, setCouponError] = useState("");

  const finalTotal = cartTotal - (appliedCoupon?.discount || 0);

  const handleApplyCoupon = () => {
    setCouponError("");
    const coupon = DUMMY_COUPONS[couponCode.toUpperCase()];
    
    if (!coupon) {
      setCouponError("Invalid coupon code");
      setAppliedCoupon(null);
      return;
    }
    
    let discountAmount = 0;
    if (coupon.type === "flat") {
      discountAmount = coupon.value;
    } else if (coupon.type === "percent") {
      discountAmount = (cartTotal * coupon.value) / 100;
    }
    
    if (discountAmount > cartTotal) {
      discountAmount = cartTotal;
    }
    
    setAppliedCoupon({
      code: couponCode.toUpperCase(),
      discount: discountAmount
    });
  };

  const handleRemoveCoupon = () => {
    setCouponCode("");
    setAppliedCoupon(null);
    setCouponError("");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      router.push("/login");
      return;
    }

    const userData = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    setFormData({
      name: userData.name || "",
      email: userData.email || "",
      phone: userData.phone || "",
      address: userData.address || "",
      city: userData.city || "",
      state: userData.state || "",
      pincode: userData.pincode || "",
    });

    setLoading(false);
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePincodeChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const pin = e.target.value.replace(/\D/g, "");

    setFormData((prev) => ({
      ...prev,
      pincode: pin,
    }));

    if (pin.length === 6) {
      try {
        const response = await fetch(
          `https://api.postalpincode.in/pincode/${pin}`
        );

        const data = await response.json();

        if (
          data[0]?.Status === "Success" &&
          data[0]?.PostOffice?.length
        ) {
          const office = data[0].PostOffice[0];

          setFormData((prev) => ({
            ...prev,
            city: office.District,
            state: office.State,
          }));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handlePayment = () => {
    if (
      !formData.name ||
      !formData.phone ||
      !formData.address
    ) {
      alert("Please fill all required fields");
      return;
    }

    const orderData = {
      customer: formData,
      items,
      total: finalTotal,
      discount: appliedCoupon?.discount || 0,
      couponCode: appliedCoupon?.code || null,
    };

    console.log("ORDER DATA", orderData);

    alert("Proceeding to payment...");
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4">

        <h1 className="text-4xl font-bold mb-8">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="lg:col-span-2">

            <div className="bg-white rounded-xl shadow p-6">

              <h2 className="text-xl font-bold mb-6">
                Delivery Address
              </h2>

              <div className="grid md:grid-cols-2 gap-4">

                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border rounded-lg p-3"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border rounded-lg p-3"
                />

                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border rounded-lg p-3"
                />

                <input
                  type="text"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={handlePincodeChange}
                  className="border rounded-lg p-3"
                />

                <input
                  type="text"
                  placeholder="City"
                  value={formData.city}
                  readOnly
                  className="border rounded-lg p-3 bg-gray-100"
                />

                <input
                  type="text"
                  placeholder="State"
                  value={formData.state}
                  readOnly
                  className="border rounded-lg p-3 bg-gray-100"
                />

              </div>

              <textarea
                rows={4}
                name="address"
                placeholder="Full Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-4"
              />
            </div>

          </div>

          {/* RIGHT */}
          <div>

            <div className="bg-white rounded-xl shadow p-6 sticky top-24">

              <h2 className="text-xl font-bold mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">

                {items.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex justify-between border-b pb-3"
                  >
                    <div>
                      <h3 className="font-medium">
                        {item.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <div>
                      ₹
                      {(
                        item.bulkPrice * item.quantity
                      ).toLocaleString("en-IN")}
                    </div>
                  </div>
                ))}

              </div>

              <div className="mt-6 mb-4">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Enter Coupon Code" 
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    disabled={!!appliedCoupon}
                    className="border rounded-lg p-2 flex-1"
                  />
                  <button 
                    onClick={handleApplyCoupon}
                    disabled={!!appliedCoupon || !couponCode}
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                  >
                    Apply
                  </button>
                </div>
                {couponError && <p className="text-red-500 text-sm mt-1">{couponError}</p>}
                <div className="mt-2 text-xs text-gray-500">
                  Available coupons: <span className="font-semibold">FLAT50</span> (₹50 off), <span className="font-semibold">WELCOME20</span> (20% off)
                </div>
              </div>

              <div className="border-t mt-6 pt-6 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toLocaleString("en-IN")}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <span>
                      Coupon Discount ({appliedCoupon.code}) 
                      <button onClick={handleRemoveCoupon} className="text-red-500 text-sm ml-2 font-medium">Remove</button>
                    </span>
                    <span>- ₹{appliedCoupon.discount.toLocaleString("en-IN")}</span>
                  </div>
                )}

                <div className="flex justify-between text-lg font-bold pt-3 border-t">
                  <span>Total</span>
                  <span>₹{finalTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
              >
                Process To Pay
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}