// RegisterPage.jsx
import { useState } from "react";
import { AiOutlineMail, AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router";
import register from "../../assets/register.png";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add register logic
    console.log({ name, email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-white px-4">
      <div className="max-w-6xl w-full bg-white shadow-lg rounded-xl flex flex-col lg:flex-row overflow-hidden">
        {/* Left: Form */}
        <div className="lg:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6">Sign Up</h2>
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name */}
            <div className="relative">
              <AiOutlineUser
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Fast Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
            <div className="relative">
              <AiOutlineUser
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            {/* Email */}
            <div className="relative">
              <AiOutlineMail
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-green-400"
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
                className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-green-400"
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

            {/* Terms */}
            <div className="text-sm text-gray-500">
              <input type="checkbox" checked readOnly className="mr-2" />I agree
              to Ultimate Trade Terms of use
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-green-400 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Sign Up
            </button>

            <div>
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login here
              </Link>
            </div>
          </form>
        </div>

        {/* Right: Illustration */}
        <div className="lg:w-1/2 bg-green-50 flex items-center justify-center p-10 hidden sm:flex">
          <div className="space-y-4 text-center w-full">
            {/* Illustration */}
            <img
              src={register}
              alt="Sign Up Illustration"
              className="w-full h-64 object-contain rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
