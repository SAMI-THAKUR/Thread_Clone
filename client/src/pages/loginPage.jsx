import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import useShowToast from "../hooks/useShowToast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../feature/User";

export default function LoginPage() {
  const [query, setquery] = useState("");
  const [password, setPassword] = useState("");
  const showToast = useShowToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://thread-clone-pi-gules.vercel.app/auth/login",
        { query, password },
        {
          credentials: "include",
          withCredentials: true,
        },
      );
      const data = res.data;
      if (data.error) {
        showToast("Error", data.error, "error");
      } else {
        // Handle successful response
        console.log(data);
        dispatch(setUser(data));
        showToast("Success", "Log in successful", "success");
        navigate("/");
      }
    } catch (error) {
      // Handle network errors
      const errorMessage = error.response.error || "Unable to login at the moment";
      showToast("Error", errorMessage, "error");
    }
  };
  return (
    <div className="bg-darkbg min-h-screen flex items-center justify-center ">
      <div className="bg-bg p-8 rounded shadow-md max-w-md w-full mx-auto">
        <h2 className="text-2xl font-semibold mb-4 font-Konkhmer">Log In</h2>
        <form action="#" method="POST">
          <div className="mt-4 font-Konkhmer">
            <label for="data" className="block text-sm font-medium text-gray-700">
              Email/Username
            </label>
            <input id="data" className="mt-1 p-2 w-full border rounded-md" onChange={(e) => setquery(e.target.value)} />
          </div>

          <div className="mt-4 font-Konkhmer">
            <label for="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 p-2 w-full border rounded-md"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-start my-4">
            <NavLink to="/signup" className="text-sm text-indigo-800 font-robo  tracking-wide">
              Create an account
            </NavLink>
          </div>
          <div className="mt-6">
            <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-Konkhmer" onClick={handleSubmit}>
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
