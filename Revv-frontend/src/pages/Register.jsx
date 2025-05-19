import { useState } from "react";
import RegisterButton from "../components/RegisterButton";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginPage() {
  //the states
  const [name, setName] = useState("");
  const [phno, setPhno] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();
  
  //handle the register button
  async function handleClick(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/demo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          phno,
          address,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      await response.json();
      toast.success("User created successfully!");

      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to create user. Please try again.");
    }
  }

  //the return code
  return (
    <div className="login h-screen w-screen grid grid-cols-3  ">
      <div className="col-span-2 grid items-center justify-center ">
        <form action="" className="bg-gray-50 rounded-2xl  p-9 pb-8">
          <h1 className="text-3xl mb-6 font-extrabold text-center text">
            Sign Up
          </h1>

          <h2 className="font-bold">Name:</h2>
          <input
            className="border-2 p-2 w-80 border-b-gray-900 mb-6"
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
            value={name}
          />

          <h2 className="font-bold">Phone Number:</h2>
          <input
            className="border-2 p-2 w-80 border-b-gray-900 mb-6"
            required
            type="text"
            onChange={(e) => setPhno(e.target.value)}
            placeholder="Enter Phone number"
            value={phno}
          />

          <h2 className="font-bold">Email:</h2>
          <input
            className="border-2 p-2 w-80 border-b-gray-900 mb-6"
            required
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            value={email}
          />

          <h2 className="font-bold">Address:</h2>
          <input
            className="border-2 p-2 w-80 border-b-gray-900 mb-6"
            required
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter Delivery Address"
            value={address}
          />

          <h2 className="font-bold">Create Password: </h2>
          <input
            className="border-2 p-2 w-80 border-b-gray-900 mb-6"
            required
            type="Password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            value={password}
          />

          <div
            onClick={(e) => handleClick(e)}
            className="flex mb-5 justify-center"
          >
            <RegisterButton />
          </div>
          <div className="h-0.5 ml-5 w-72 bg-gray-900"></div>
          <div className="flex mt-3 justify-center">
            <h5 className="mr-2">Already have an account?</h5>
            <Link
              className="hover:underline font-bold hover:text-blue-800"
              to={"/"}
            >
              LogIn
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
