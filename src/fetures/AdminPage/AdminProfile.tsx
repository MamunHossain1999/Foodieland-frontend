/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { useGetProfileQuery, useLogoutUserMutation, authApi } from "@/Redux/api/authApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminProfile = () => {
  const { data: user, isLoading } = useGetProfileQuery();
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(authApi.util.resetApiState());
      toast.success("Logout successful!", { position: "top-right", autoClose: 2000 });
      navigate("/login");
    } catch (err: any) {
      toast.error(err?.data?.message || "Logout failed!", { position: "top-right", autoClose: 3000 });
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <div className="min-h-screen flex items-center justify-center">Please login to view your profile.</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-2xl max-w-4xl w-full overflow-hidden">

        {/* Cover */}
        <div className="h-40 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

        {/* Profile Section */}
        <div className="px-6 pb-6">
          <div className="flex flex-col items-center -mt-16">
            <img
              src={user.avatar || "https://i.ibb.co/2kR1m9p/default-avatar.png"}
              alt="profile"
              className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://i.ibb.co/2kR1m9p/default-avatar.png";
              }}
            />
            <h2 className="text-2xl font-bold mt-3">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => navigate("/admin/update-profile")}
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Update Profile
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>

          {/* About Section */}
          <div className="mt-6 text-center">
            <h3 className="text-lg font-semibold mb-2">About Me</h3>
            <p className="text-gray-600 text-sm md:text-base">
              Passionate frontend developer who loves building modern,
              responsive and user-friendly web applications using React,
              Tailwind CSS and modern JavaScript tools.
            </p>
          </div>

          {/* Info Grid */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Contact</h4>
              <p className="text-gray-600 text-sm">Email: {user.email}</p>
              <p className="text-gray-600 text-sm">Phone: +880 123456789</p>
              <p className="text-gray-600 text-sm">Location: Bangladesh</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Skills</h4>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs">React</span>
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs">Tailwind</span>
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs">JavaScript</span>
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs">Node.js</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mt-6 text-xl text-gray-600">
            <a href="#" className="hover:text-blue-600"><FaFacebook /></a>
            <a href="#" className="hover:text-black"><FaGithub /></a>
            <a href="#" className="hover:text-blue-700"><FaLinkedin /></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;