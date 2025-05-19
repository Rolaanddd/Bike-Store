import Nav from "../components/Nav";
import { useEffect, useState } from "react";
import Products from "../components/Products";
import SearchButton from "../components/SearchButton";

export default function Homepage() {
  const [email, setEmail] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const response = await fetch("http://localhost:3000/products");
      const data = await response.json();
      for (let i = data.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [data[i], data[j]] = [data[j], data[i]];
      }
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  const handleSearch = (query) => {
    const filtered = products.filter(
      (product) =>
        product.productName.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="bg-cream min-h-dvh">
      <Nav />
      <div className="p-4">
        <div className="mb-4 flex justify-center">
          <SearchButton onSearch={handleSearch} /> {/* Pass handleSearch */}
        </div>
        <div className="grid grid-cols-4 gap-4">
          {filteredProducts.length === 0 ? (
            <div className="col-span-4 text-center text-xl text-gray-500">
              No items to display
            </div>
          ) : (
            filteredProducts.map((item, index) => (
              <div key={index}>
                <Products
                  productName={item.productName}
                  rate={item.rate}
                  description={item.description}
                  imgURL={item.imgURL}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
