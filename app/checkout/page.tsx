"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";

const DUMMY_COUPONS: Record<string, { type: "flat" | "percent"; value: number }> = {
  FLAT50: { type: "flat", value: 50 },
  WELCOME20: { type: "percent", value: 20 },
};

interface SavedAddress {
  id: string;
  tag: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}


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

  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([]);
  const [isSavingAddress, setIsSavingAddress] = useState(false);
  const [addressTag, setAddressTag] = useState("");

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

    const saved = localStorage.getItem("savedAddresses");
    if (saved) {
      try {
        setSavedAddresses(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing saved addresses:", e);
      }
    }

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

  const handleSelectAddress = (addr: SavedAddress) => {
    setFormData({
      name: addr.name,
      email: addr.email,
      phone: addr.phone,
      address: addr.address,
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode,
    });
  };

  const handleSaveAddress = () => {
    if (!addressTag.trim()) {
      alert("Please enter a tag (e.g. Home, Work)");
      return;
    }
    
    const newAddress: SavedAddress = {
      id: Date.now().toString(),
      tag: addressTag,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
    };
    
    const updated = [...savedAddresses, newAddress];
    setSavedAddresses(updated);
    localStorage.setItem("savedAddresses", JSON.stringify(updated));
    
    setIsSavingAddress(false);
    setAddressTag("");
    
    // Scroll up to show the new saved address
    window.scrollTo({ top: 0, behavior: "smooth" });
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

              <h2 className="text-xl font-bold mb-4">
                Delivery Address
              </h2>

              {savedAddresses.length > 0 && (
                <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-xl">
                  <p className="text-sm font-semibold text-green-800 mb-3">Your Saved Addresses</p>
                  <div className="flex gap-3 flex-wrap">
                    {savedAddresses.map((addr) => (
                      <button
                        key={addr.id}
                        type="button"
                        onClick={() => handleSelectAddress(addr)}
                        className="bg-white border-2 border-transparent hover:border-green-500 rounded-lg px-4 py-3 text-left transition shadow-sm flex flex-col gap-2 min-w-[200px]"
                      >
                        <span className="inline-block bg-green-100 text-green-700 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider w-fit">
                          {addr.tag}
                        </span>
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">{addr.name}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{addr.city}, {addr.state}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

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

              <div className="mt-6 border-t pt-6">
                {!isSavingAddress ? (
                  <button 
                    type="button"
                    onClick={() => setIsSavingAddress(true)}
                    className="w-full md:w-auto px-6 py-3 border-2 border-dashed border-gray-300 text-gray-500 rounded-xl font-semibold hover:border-green-500 hover:text-green-600 transition hover:bg-green-50 flex items-center justify-center gap-2"
                  >
                    + Save this address for future (Home/Work)
                  </button>
                ) : (
                  <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 shadow-inner">
                    <p className="text-sm font-bold text-gray-700 mb-3">Save as a new address</p>
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <input
                        type="text"
                        placeholder="e.g. Home, Office, Other"
                        value={addressTag}
                        onChange={(e) => setAddressTag(e.target.value)}
                        className="w-full sm:flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        autoFocus
                      />
                      <div className="flex w-full sm:w-auto gap-2">
                        <button 
                          type="button"
                          onClick={handleSaveAddress}
                          className="flex-1 sm:flex-none bg-green-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-green-700 shadow-sm transition"
                        >
                          Save
                        </button>
                        <button 
                          type="button"
                          onClick={() => setIsSavingAddress(false)}
                          className="flex-1 sm:flex-none bg-white border border-gray-300 text-gray-600 px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-50 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
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