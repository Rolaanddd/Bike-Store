import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import Homepage from "./pages/Homepage";
import CartPage from "./pages/CartPage";
import ReviewPage from "./pages/ReviewPage";
import Checkout from "./pages/Checkout";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={true}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
        toastClassName={({ type }) =>
          `bg-white text-black border-l-4 rounded-xl shadow-lg p-4 mb-4 flex items-start transition-all duration-300
    ${
      type === "success"
        ? "border-green-500"
        : type === "error"
        ? "border-red-500"
        : type === "info"
        ? "border-blue-500"
        : type === "warning"
        ? "border-yellow-500"
        : "border-gray-300"
    }`
        }
        bodyClassName="text-sm font-medium"
        progressClassName="bg-gray-500 h-1 rounded-full"
      />
    </>
  );
};

export default App;
