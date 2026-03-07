/* eslint-disable @typescript-eslint/no-explicit-any */
// LoginPage.jsx
import { useState } from "react";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import loginImg from "../../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoginUserMutation } from "@/Redux/api/authApi";

// adjust path your api

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // RTK Query mutation
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password }).unwrap();
      // success toast
      toast.success(`Welcome back, ${res.name}!`);
      // redirect to dashboard or homepage
      navigate("/");
    } catch (err: any) {
      toast.error(err?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-white px-4">
      <div className="max-w-6xl w-full bg-white shadow-lg rounded-xl flex flex-col lg:flex-row overflow-hidden">
        {/* Left: Form */}
        <div className="lg:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6">Sign In</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div className="relative">
              <AiOutlineMail
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <input
                type="email"
                placeholder="Login / Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <AiOutlineLock
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {/* Forgot Password */}
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            {/* Terms */}
            <div className="text-sm text-gray-500">
              <input type="checkbox" checked readOnly className="mr-2" />I agree
              to Ultimate Trade Terms of use
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-400 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>

            <div>
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-500 hover:underline">
                Register here
              </Link>
            </div>
          </form>
        </div>

        {/* Right: Illustration */}
        <div className="lg:w-1/2 bg-blue-50 flex items-center justify-center p-6 hidden sm:flex">
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={loginImg}
              alt="login illustration"
              className="max-w-full max-h-[400px] object-contain rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
