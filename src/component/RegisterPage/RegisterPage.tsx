/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { AiOutlineMail, AiOutlineLock, AiOutlineUser } from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import register from "../../assets/register.png"
import { useRegisterUserMutation } from "@/Redux/api/authApi"

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState<"user" | "admin">("user") // default role

  const navigate = useNavigate()
  const [registerUser, { isLoading }] = useRegisterUserMutation()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!firstName || !lastName || !email || !password) {
      toast.error("All fields are required")
      return
    }

    try {
      const result = await registerUser({
        name: `${firstName} ${lastName}`,
        email,
        password,
        role,
      }).unwrap()

      toast.success(`Welcome, ${result.name}! Account created as ${result.role}.`, {
        position: "top-right",
        autoClose: 2000,
      })
      navigate("/login")
    } catch (err: any) {
      toast.error(err.data?.message || "Registration failed", {
        position: "top-right",
        autoClose: 3000,
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-white px-4">
      <ToastContainer />
      <div className="max-w-6xl w-full bg-white shadow-lg rounded-xl flex flex-col lg:flex-row overflow-hidden">
        {/* Left: Form */}
        <div className="lg:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6">Sign Up</h2>
          <form onSubmit={handleRegister} className="space-y-4">
            {/* First Name */}
            <div className="relative">
              <AiOutlineUser className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            {/* Last Name */}
            <div className="relative">
              <AiOutlineUser className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            {/* Email */}
            <div className="relative">
              <AiOutlineMail className="absolute left-3 top-3 text-gray-400" size={20} />
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
              <AiOutlineLock className="absolute left-3 top-3 text-gray-400" size={20} />
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

            {/* Role Selection */}
            <div className="flex items-center gap-4 mt-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={role === "user"}
                  onChange={() => setRole("user")}
                  className="accent-green-500"
                />
                User
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={role === "admin"}
                  onChange={() => setRole("admin")}
                  className="accent-green-500"
                />
                Admin
              </label>
            </div>

            {/* Terms */}
            <div className="text-sm text-gray-500">
              <input type="checkbox" checked readOnly className="mr-2" />
              I agree to Ultimate Trade Terms of use
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-500 to-green-400 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {isLoading ? "Registering..." : "Sign Up"}
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
            <img
              src={register}
              alt="Sign Up Illustration"
              className="w-full h-64 object-contain rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage