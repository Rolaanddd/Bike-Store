import { useState } from "react";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //handle the login button
  async function handleClick(e) {
    e.preventDefault();
    if (email === "you@gmail.com" && password === "1234") {
      toast.success("Admin Login Successful!");
      localStorage.setItem("email", email);
      navigate("/admindashboard");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      await response.json();

      if (response.ok) {
        toast.success("Login successful!");
        localStorage.setItem("email", email);
        navigate("/homepage"); //pass the email
      } else {
        toast.error("Please check your login credentials");
      }
    } catch (error) {
      toast.error("Something went wrong, please try again");
      console.log(error);
    }
  }
  return (
    <div className="login h-screen w-screen grid grid-cols-3  ">
      <div className="col-span-2 grid items-center justify-center ">
        <form action="" className="bg-gray-50 rounded-2xl  p-7 pb-8">
          <h1 className="text-3xl mb-6 font-extrabold text-center">Login</h1>
          <h2 className="font-bold mb-2">Email:</h2>
          <input
            className="border-2 p-2 w-80 border-b-gray-900 mb-6"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            required
            value={email}
          />
          <h2 className="font-bold mb-2">Password: </h2>
          <input
            className="border-2 p-2 w-80 border-b-gray-900 mb-6"
            type="Password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            required
            value={password}
          />
          <div className="flex mb-5 justify-center">
            <div onClick={(e) => handleClick(e)}>
              <Button />
            </div>
          </div>
          <div className="h-0.5 ml-5 w-72 bg-gray-900"></div>
          <div className="flex mt-3 justify-center">
            <h5 className="mr-2">Dont have an account?</h5>
            <Link
              className="hover:underline font-bold hover:text-blue-800"
              to={"/register"}
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
