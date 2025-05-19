import CartItems from "../components/CartItems";
import CheckoutButton from "../components/CheckoutButton";
import Nav from "../components/Nav";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CartPage() {
  const [email, setEmail] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
      fetchCartData(storedEmail);
    }
  }, []);

  // Fetch cart data from backend
  const fetchCartData = async (userEmail) => {
    try {
      const response = await fetch(`http://localhost:3000/cart/${userEmail}`);
      if (!response.ok) {
        throw new Error("Cart not found");
      }
      const cartData = await response.json();
      
      // Directly set products without merging logic
      setProducts(cartData.products);
    } catch (error) {
      console.error("Error fetching cart:", error.message);
    }
  };

  // Update product quantity in the cart
  const handleQuantityChange = async (productName, newQuantity) => {
    if (newQuantity < 1) return; // Prevent quantity from going below 1

    try {
      const response = await fetch(`http://localhost:3000/cart/${email}/${productName}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (!response.ok) throw new Error("Failed to update quantity");

      // Update state
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.productName === productName ? { ...product, quantity: newQuantity } : product
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error.message);
    }
  };

  // Remove product from cart
  const removeFromCart = async (productName) => {
    try {
      const response = await fetch(`http://localhost:3000/cart/${email}/${productName}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to remove item from cart");
      }

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.productName !== productName)
      );
    } catch (error) {
      console.error("Error removing item:", error.message);
    }
  };

  const withoutDiscount = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
  const total = (90 / 100) * withoutDiscount;
  const formattedTotal = total.toLocaleString("en-IN");

  return (
    <div className="bg-cream min-h-screen">
      <Nav cartCount={products.length} />
      <div className="min-h-166 p-5">
        <div className="grid">
          {products.map((product, index) => (
            <div className="justify-items-center" key={index}>
              <CartItems
                productname={product.productName}
                imgURL={product.imgURL}
                price={product.price}
                quantity={product.quantity}
                onRemove={removeFromCart}
                onQuantityChange={handleQuantityChange} 
              />
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="custom-shadow sticky h-30 bottom-0 bg-cream z-50 p-4">
        <div className="flex justify-center h-full items-center">
          <div className="font-bold mr-20 text-4xl">
            Total: <span>₹{formattedTotal}</span>
          </div>
          <Link  className="cursor-pointer" to="/checkout">
            <CheckoutButton />
          </Link>
        </div>
      </div>
    </div>
  );
}
