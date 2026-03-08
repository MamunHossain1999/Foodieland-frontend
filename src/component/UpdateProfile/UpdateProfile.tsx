/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useGetProfileQuery, useUpdateProfileMutation } from "@/Redux/api/authApi";
import { toast } from "react-toastify";
import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").optional(),
  email: z.string().email("Invalid email address").optional(),
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
});

const UpdateProfile = () => {
  const { data: user, isLoading: profileLoading, refetch } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",

  });

  // Prefill form
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: "",
        avatar: user.avatar || "",
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationResult = updateProfileSchema.safeParse(formData);
    if (!validationResult.success) {
      toast.error(validationResult.error.issues[0].message);
      return;
    }

    try {
      const result = await updateProfile(validationResult.data).unwrap();
      toast.success(result.message || "Profile updated successfully!");
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update profile");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) return toast.error("Please select an image file");
    if (file.size > 5 * 1024 * 1024) return toast.error("File size must be less than 5MB");

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

 const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!selectedFile) return toast.error("Please select a file");

  setIsUploading(true);

  const formData = new FormData();
  formData.append("avatar", selectedFile);

  try {
    const res = await fetch("http://localhost:5000/api/auth/upload-avatar", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const result = await res.json();

    if (!res.ok) throw new Error(result.message || "Upload failed");

    // 👇 এখানে image url নিন
    const imageUrl = result.imageUrl;

    // preview update
    setPreviewUrl(imageUrl);

    toast.success("Profile picture uploaded successfully!");

    setSelectedFile(null);

    refetch();

  } catch (err: any) {
    toast.error(err.message || "Upload failed");
    console.error(err);
  } finally {
    setIsUploading(false);
  }
};

  if (profileLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <div className="min-h-screen flex items-center justify-center">No user data found</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Update Profile</h2>

        {/* Profile Form */}
        <form onSubmit={handleProfileUpdate} className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password (optional)</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new password"
            />
          </div>

          <button
            type="submit"
            disabled={isUpdating}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUpdating ? "Updating..." : "Update Profile"}
          </button>
        </form>

        {/* Profile Picture Upload */}
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {selectedFile && (
            <div className="p-3 bg-blue-50 rounded border border-blue-200">
              <p className="text-sm text-gray-600">Selected: <span className="font-semibold">{selectedFile.name}</span></p>
              <p className="text-xs text-gray-500 mt-1">Size: {(selectedFile.size / 1024).toFixed(2)} KB</p>
            </div>
          )}

          {previewUrl && (
            <div className="flex justify-center">
              <img src={previewUrl} alt="Preview" className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover" />
            </div>
          )}

          <button
            type="submit"
            disabled={!selectedFile || isUploading}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? "Uploading..." : "Upload Picture"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;