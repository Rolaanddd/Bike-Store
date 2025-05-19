import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Authorize from "../components/Authorize";
export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 adminlogin flex justify-center items-center h-screen p-4">
      <div className=" p-6 rounded admindiv shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold underline mb-4 text-center">
          Admin Login
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email === "you@gmail.com" && password === "1234") {
              navigate("/admindashboard");
            } else {
              alert("Invalid email or password");
            }
          }}
            className="flex flex-col gap-2"
        >
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button type="submit">
            <Authorize />
          </button>
        </form>
      </div>
    </div>
  );
}
