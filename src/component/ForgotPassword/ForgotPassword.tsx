/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { toast } from "react-toastify";
import { useForgotPasswordMutation } from "@/Redux/api/authApi";
import { useNavigate } from "react-router";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
   const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await forgotPassword({ email }).unwrap();
      toast.success("Reset link sent! Check your email.");
          // Navigate to OTP page and pass email via state
      navigate(`/verify-otp?email=${email}`);
      setEmail(""); // clear input
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to send reset link");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-6">

        <h2 className="text-2xl font-bold text-center mb-4">
          Forgot Password
        </h2>

        <p className="text-gray-500 text-sm text-center mb-6">
          Enter your email and we will send you a reset link
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;