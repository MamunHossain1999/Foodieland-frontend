/* eslint-disable @typescript-eslint/no-explicit-any */
import { authApi, useGetProfileQuery, useLogoutUserMutation } from "@/Redux/api/authApi";
import { useDispatch } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const { data: user } = useGetProfileQuery();
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
      toast.error(err?.data?.message || "Logout failed!");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar - fixed */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col justify-between fixed h-full">

        <div>
          <h2 className="text-2xl font-bold p-5 border-b border-gray-700">
            Admin Panel
          </h2>

          <nav className="flex flex-col gap-3 p-5">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                isActive ? "text-yellow-400 font-semibold" : "hover:text-yellow-400"
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/admin/products"
              className={({ isActive }) =>
                isActive ? "text-yellow-400 font-semibold" : "hover:text-yellow-400"
              }
            >
              All Products
            </NavLink>

            <NavLink
              to="/admin/add-product"
              className={({ isActive }) =>
                isActive ? "text-yellow-400 font-semibold" : "hover:text-yellow-400"
              }
            >
              Add Product
            </NavLink>

            <NavLink
              to="/admin/orders"
              className={({ isActive }) =>
                isActive ? "text-yellow-400 font-semibold" : "hover:text-yellow-400"
              }
            >
              User Orders
            </NavLink>

            <NavLink
              to="/admin/all-users"
              className={({ isActive }) =>
                isActive ? "text-yellow-400 font-semibold" : "hover:text-yellow-400"
              }
            >
              All Users
            </NavLink>
          </nav>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-700 p-5 flex flex-col gap-3">
          <button
            onClick={() => navigate("/")}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded"
          >
            ← Back to Home
          </button>

          <NavLink
            to="/admin/profile"
            className="flex items-center gap-3 mt-2"
          >
            <img
              src={user?.avatar}
              alt="admin"
              className="w-10 h-10 rounded-full"
            />
            <span>{user?.name}</span>
          </NavLink>

          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded mt-2"
          >
            Logout
          </button>

          <p className="text-xs text-gray-400 text-center mt-4">
            © 2026 YourCompany
          </p>
        </div>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 ml-64">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>

        <Outlet />
      </main>

    </div>
  );
};

export default AdminDashboard;