/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "@/Redux/api/authApi";
import { Eye, EyeOff } from "lucide-react";
import { z } from "zod";

// Validation schema
const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
  otp: z.string().length(6, "OTP must be 6 digits"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Query params থেকে email ও otp নেওয়া
  const query = new URLSearchParams(location.search);
  const [email] = useState(query.get("email") || "");
  const [otp] = useState(query.get("otp") || "");

  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  useEffect(() => {
    if (!email || !otp) {
      toast.error("Missing email or OTP. Please go back and request OTP again.");
      navigate("/login"); // OTP request page
    }
  }, [email, otp, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = resetPasswordSchema.safeParse({
      email,
      otp,
      newPassword,
    });

    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    try {
      const res = await resetPassword({ email, otp, newPassword }).unwrap();
      toast.success(res.message);
      navigate("/login");
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "Reset password failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label className="text-sm font-medium">New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border p-2 rounded mt-1 pr-10"
              placeholder="Enter new password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-9 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;