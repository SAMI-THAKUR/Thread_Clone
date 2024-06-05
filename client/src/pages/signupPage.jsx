import { NavLink, json } from "react-router-dom";
import { useState } from "react";
import useShowToast from "../hooks/useShowToast";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../feature/User";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const showToast = useShowToast();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://thread-clone-6f8g.onrender.com/auth/signup",
        { name, username, email, password },
        {
          credentials: "include",
          withCredentials: true,
        },
      );
      const data = res.data;
      console.log(typeof data);
      if (data.error) {
        showToast("Error", data.error, "error");
      } else {
        const now = new Date();
        const item = {
          value: data,
          expiry: now.getTime() + 3 * 24 * 60 * 60 * 1000,
        };
        // Handle successful response
        localStorage.setItem("user-threads", JSON.stringify(item));
        dispatch(setUser(JSON.stringify(data)));
        showToast("Success", "Sign up successful", "success");
        navigate("/");
      }
    } catch (error) {
      // Handle network errors
      const errorMessage = error.response.data.error || "Something went wrong";
      showToast("Error", errorMessage, "error");
    }
  };
  return (
    <div className="bg-darkbg min-h-screen flex items-center justify-center ">
      <div className="bg-bg p-8 rounded shadow-md max-w-md w-full mx-auto">
        <h2 className="text-2xl font-semibold mb-4 font-Konkhmer tracking-wider">Welcom to Thread</h2>
        <form action="#" method="POST">
          <div className="grid grid-cols-2 gap-4">
            <div className="font-Konkhmer">
              <label for="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input type="text" id="name" className="mt-1 p-2 w-full border rounded-md" onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="font-Konkhmer">
              <label for="username" className="block text-sm font-medium text-gray-700">
                User Name
              </label>
              <input type="text" id="username" className="mt-1 p-2 w-full border rounded-md" onChange={(e) => setUsername(e.target.value)} />
            </div>
          </div>

          <div className="mt-4 font-Konkhmer">
            <label for="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input type="email" id="email" className="mt-1 p-2 w-full border rounded-md" onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="mt-4 font-Konkhmer">
            <label for="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input type="password" id="password" className="mt-1 p-2 w-full border rounded-md" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="flex items-center justify-start my-4">
            <NavLink to="/login" className="text-sm text-indigo-800 font-robo  tracking-wide">
              Already have an account?
            </NavLink>
          </div>
          <div className="mt-6">
            <button className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-Konkhmer" onClick={handleSubmit}>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
