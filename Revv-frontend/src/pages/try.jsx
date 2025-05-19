import { useState, useEffect } from "react"; // React hooks
import { PackagePlus, Users, Boxes } from "lucide-react"; // Lucide icons
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminPage = () => {
const \[product, setProduct] = useState({
productName: "",
rate: "",
category: "",
description: "",
imgURL: "",
});

const \[users, setUsers] = useState(\[]);
const \[products, setProducts] = useState(\[]);
const \[activeSection, setActiveSection] = useState("addProduct");
const \[selectedUser, setSelectedUser] = useState(null); // for modal
const navigate = useNavigate();

const BASE\_URL = "[http://localhost:3000](http://localhost:3000)";

useEffect(() => {
fetch(`${BASE_URL}/demo`)
.then((res) => res.json())
.then((data) => setUsers(data))
.catch((err) => console.error("Failed to fetch users", err));

```
fetch(`${BASE_URL}/products`)
  .then((res) => res.json())
  .then((data) => setProducts(data))
  .catch((err) => console.error("Failed to fetch products", err));
```

}, \[]);

const handleChange = (e) => {
setProduct({ ...product, \[e.target.name]: e.target.value });
};

const handleAddProduct = async (e) => {
e.preventDefault();
try {
const res = await fetch(`${BASE_URL}/products`, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(product),
});

```
  const data = await res.json();
  if (res.ok) {
    toast.success("Product added!");
    setProducts([...products, data]);
    setProduct({
      productName: "",
      rate: "",
      category: "",
      description: "",
      imgURL: "",
    });
  } else {
    toast.error("Error: " + data.message);
  }
} catch (error) {
  toast.error("Error adding product");
  console.error(error);
}
```

};

const handleDeleteUser = async (id) => {
if (!window\.confirm("Are you sure you want to delete this user?")) return;

```
try {
  const res = await fetch(`${BASE_URL}/demo/${id}`, { method: "DELETE" });
  if (res.ok) {
    setUsers(users.filter((user) => user._id !== id));
  }
} catch (error) {
  toast.error("Failed to delete user");
  console.error("Failed to delete user", error);
}
```

};

const handleDeleteProduct = async (id) => {
if (!window\.confirm("Are you sure you want to delete this product?"))
return;

```
try {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE",
  });
  if (res.ok) {
    setProducts(products.filter((product) => product._id !== id));
  }
} catch (error) {
  toast.error("Failed to delete product");
  console.error("Failed to delete product", error);
}
```

};

return ( <div className="min-h-screen p-6"> <h1 className="text-4xl font-bold mb-10 text-center ">
⚙️ Admin Dashboard </h1>

```
  {/* Navigation */}
  <div className="flex flex-wrap justify-center gap-4 mb-10">
    {[
      {
        label: "Add Product",
        value: "addProduct",
        icon: <PackagePlus size={18} />,
      },
      {
        label: "View Users",
        value: "viewUsers",
        icon: <Users size={18} />,
      },
      {
        label: "View Reviews",
        value: "viewReviews",
        icon: <Users size={18} />,
      },
      {
        label: "View Products",
        value: "viewProducts",
        icon: <Boxes size={18} />,
      },
    ].map((tab) => (
      <button
        key={tab.value}
        onClick={() => setActiveSection(tab.value)}
        className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium transition-all duration-200 ${
          activeSection === tab.value
            ? "bg-blue-600 text-white shadow-lg"
            : "bg-white text-blue-600 border border-blue-300 hover:bg-blue-100"
        }`}
      >
        {tab.icon}
        {tab.label}
      </button>
    ))}

    {/* Go to Home Page button */}
    <button
      onClick={() => navigate("/homepage")}
      className="flex items-center custom-shadow gap-2 px-5 py-2 rounded-full font-medium transition-all duration-200 bg-green-600 text-white hover:bg-green-700 "
    >
      🏠 Home
    </button>
  </div>

  {/* Add Product Form */}
  {activeSection === "addProduct" && (
    <div className="bg-white p-8 rounded-xl custom-shadow max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-blue-700 flex items-center gap-2">
        <PackagePlus /> Add New Product
      </h2>
      <form onSubmit={handleAddProduct} className="space-y-4">
        {[
          { name: "productName", placeholder: "Product Name" },
          { name: "rate", placeholder: "Rate", type: "number" },
          { name: "category", placeholder: "Category" },
          { name: "description", placeholder: "Description" },
          { name: "imgURL", placeholder: "Image URL" },
        ].map((field) => (
          <input
            key={field.name}
            name={field.name}
            type={field.type || "text"}
            placeholder={field.placeholder}
            value={product[field.name]}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        ))}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-semibold"
        >
          + Add Product
        </button>
      </form>
    </div>
  )}

  {/* Users Section */}
  {activeSection === "viewUsers" && (
    <div className="bg-white p-8 rounded-xl custom-shadow max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-blue-700 flex items-center gap-2">
        <Users /> All Users
      </h2>
      {users.length ? (
        <div className="grid md:grid-cols-2 gap-4">
          {users.map((u) => (
            <div
              onClick={() => setSelectedUser(u)}
              key={u._id}
              className="bg-blue-50 border users border-blue-200 rounded-md p-4 text-sm shadow-sm flex justify-between items-center"
            >
              <button className="font-semibold text-blue-600 ">
                📧 {u.email}
              </button>
              <button
                onClick={() => handleDeleteUser(u._id)}
                className="text-red-500 text-xl font-bold hover:text-red-700"
              >
                X
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No users found.</p>
      )}
    </div>
  )}

  {/* Products Section */}
  {activeSection === "viewProducts" && (
    <div className="bg-white p-8 rounded-xl custom-shadow max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-blue-700 flex items-center gap-2">
        <Boxes /> All Products
      </h2>
      {products.length ? (
        <div className="grid md:grid-cols-2 gap-4">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white users border rounded-md p-4 shadow-sm hover:shadow-md transition flex justify-between items-start"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {p.productName}
                </h3>
                <p className="text-sm text-gray-600">₹{p.rate}</p>
                <p className="text-xs text-gray-500 mt-1">{p.category}</p>
              </div>
              <button
                onClick={() => handleDeleteProduct(p._id)}
                className="text-red-500 text-xl font-bold hover:text-red-700"
              >
                X
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No products available.</p>
      )}
    </div>
  )}

  {/* Modal for selected user */}
  {selectedUser && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40 backdrop-blur-sm px-4">
      <div className="bg-gradient-to-br from-white via-gray-50 to-blue-50 rounded-2xl p-6 w-full max-w-md shadow-2xl border border-blue-100 relative animate-fade-in">
        {/* Close Button */}
        <button
          onClick={() => setSelectedUser(null)}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-all duration-200"
          aria-label="Close"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 text-blue-700 p-3 rounded-full text-xl shadow-sm">
            👤
          </div>
          <h2 className="text-2xl font-bold text-blue-700 tracking-wide">
            User Details
          </h2>
        </div>

        {/* User Info */}
        <div className="space-y-4 text-gray-700 text-sm">
          <div>
            <p className="font-semibold text-gray-900">Name</p>
            <p className="text-gray-600">{selectedUser.name || "N/A"}</p>
          </div>

          <hr className="border-gray-200" />

          <div>
            <p className="font-semibold text-gray-900">Email</p>
            <p className="text-gray-600">{selectedUser.email || "N/A"}</p>
          </div>

          <hr className="border-gray-200" />

          <div>
            <p className="font-semibold text-gray-900">Address</p>
            <p className="text-gray-600">{selectedUser.address || "N/A"}</p>
          </div>

          <hr className="border-gray-200" />

          <div>
            <p className="font-semibold text-gray-900">Password</p>
            <p className="text-gray-600">
              {selectedUser.password || "••••••"}
            </p>
          </div>
        </div>

        {/* Footer Button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setSelectedUser(null)}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all duration-200 shadow-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )}
</div>
```

);
};

export default AdminPage;

implement into this
