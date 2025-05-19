import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("google-pay");
  const [email, setEmail] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const navigate = useNavigate(); // Add this inside the Checkout component

  const formatRupees = (amount) => `₹${amount.toLocaleString("en-IN")}`;

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) setEmail(storedEmail);
  }, []);

  useEffect(() => {
    if (email) {
      axios
        .get(`http://localhost:3000/user/${email}`)
        .then((res) => {
          setUser(res.data);
          setAddress(res.data.address || "");
        })

        .catch((err) => console.error("Failed to fetch user:", err));

      axios
        .get(`http://localhost:3000/cart/${email}`)
        .then((res) => {
          const items = res.data.products;
          setCartItems(items);
          const calculatedTotal = items.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          );
          setTotal(calculatedTotal);
        })
        .catch((err) => console.error("Error fetching cart:", err));
    }
  }, [email]);

  return (
    <>
      <div className="bg-cream2 min-h-screen py-10 px-4 md:px-16 flex items-center flex-col lg:flex-row gap-8">
        {/* Left Section */}
        <div className="admindiv animate-move-out custom-shadow w-full lg:w-1/2 p-8 rounded-2xl shadow-md space-y-6">
          <h2 className="text-3xl font-bold text-white    text-center">
            Checkout
          </h2>

          <div>
            <h3 className="text-xl font-semibold text-gray-100 mb-4">
              Delivery Address
            </h3>
            <div className="space-y-3">
              <input
                value={user?.name}
                type="text"
                placeholder="Full Name"
                className="w-full p-3 border border-gray-300 cursor-not-allowed bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                value={user?.phno}
                type="text"
                placeholder="Phone Number"
                className="w-full p-3 border border-gray-300 cursor-not-allowed bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
                className="w-full p-3 border border-gray-300 bg-gray-50 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                value={email}
                readOnly
                type="email"
                className="w-full p-3 border border-gray-300 bg-gray-100 rounded-xl cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-100 mb-4">
              Payment Method
            </h3>
            <div className="space-y-3">
              {[
                {
                  method: "google-pay",
                  label: "Google Pay",
                  icon: "/src/photos/google.png",
                },
                {
                  method: "card",
                  label: "Card Payment",
                  icon: "/src/photos/card.png",
                },
                {
                  method: "cod",
                  label: "Cash on Delivery",
                  icon: "/src/photos/cash.png",
                },
              ].map(({ method, label, icon }) => (
                <label
                  key={method}
                  className={`flex items-center p-4 border rounded-xl cursor-pointer transition ${
                    paymentMethod === method
                      ? "bg-blue-500 text-white shadow"
                      : "bg-white hover:bg-gray-50"
                  }`}
                  onClick={() => setPaymentMethod(method)}
                >
                  <img src={icon} alt={label} className="w-6 h-6 mr-3" />
                  <span className="font-medium">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {paymentMethod === "card" && (
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Card Number"
                className="w-full p-3 border border-gray-300 text-gray-100 rounded-xl"
                inputMode="numeric"
                maxLength={19} // 16 digits + 3 spaces
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, ""); // remove non-digits
                  value = value.slice(0, 16); // limit to 16 digits
                  const formatted = value.replace(/(.{4})/g, "$1 ").trim(); // add space every 4 digits
                  e.target.value = formatted;
                }}
              />
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-1/2 p-3 border text-gray-100 border-gray-300 rounded-xl"
                  inputMode="numeric"
                  maxLength={5}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, ""); // Remove non-digits
                    if (value.length > 4) value = value.slice(0, 4); // Max 4 digits
                    if (value.length >= 3) {
                      value = `${value.slice(0, 2)}/${value.slice(2)}`; // Insert slash after 2 digits
                    }
                    e.target.value = value;
                  }}
                />
                <input
                  type="password"
                  placeholder="CVV"
                  className="w-1/2 p-3 border text-gray-100 border-gray-300 rounded-xl"
                  inputMode="numeric"
                  maxLength={3}
                  onChange={(e) => {
                    e.target.value = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 3); // Only digits, max 3
                  }}
                />
              </div>
            </div>
          )}

          <button
            onClick={() => setShowModal(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl text-lg font-semibold transition"
          >
            Proceed to Pay
          </button>
        </div>

        {/* Right Section */}
        <div className="admindiv animate-move-in custom-shadow w-full h-fit lg:w-5/6 p-8 py-10 rounded-2xl shadow-md">
          <h2 className="text-3xl font-bold text-white text-center mb-6">
            Order Summary
          </h2>

          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          ) : (
            <>
              <div className="divide-y divide-gray-200 mb-6">
                {cartItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between py-2 text-gray-100"
                  >
                    <span>
                      {item.productName} x {item.quantity}
                    </span>
                    <span className="font-semibold">
                      {formatRupees(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mt-14  text-gray-100">
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>{formatRupees(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount (10%)</span>
                  <span className="text-green-300">
                    - {formatRupees(total * 0.1)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>{formatRupees(5799)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-3">
                  <span>Grand Total</span>
                  <span className="text-2xl">
                    {formatRupees(total * 0.9 + 5799)}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white p-6 animate-fade-in rounded-xl shadow-lg relative w-full max-w-md text-center">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-black font-bold"
              >
                &times;
              </button>

              {paymentMethod === "google-pay" ? (
                <>
                  <img
                    src="data:image/png;base64,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"
                    alt="QR Code"
                    className="mx-auto w-48 h-48 mb-4 rounded-md border"
                  />
                  <p className="text-gray-700 mb-4">
                    Scan the QR code to pay via Google Pay
                  </p>
                </>
              ) : (
                <p className="text-lg font-medium text-gray-700 mb-4">
                  Have you made the payment?
                </p>
              )}

              <button
                onClick={async () => {
                  try {
                    // Close the modal first
                    setShowModal(false);

                    // Delete cart from backend
                    await axios.delete(`http://localhost:3000/cart/${email}`);

                    toast.success("Will be Delivered within 2 Business days!");

                    // Navigate to homepage
                    navigate("/homepage");
                  } catch (error) {
                    console.error("Failed to clear cart:", error);
                    toast.error("Failed to process order. Try again!");
                  }
                }}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
