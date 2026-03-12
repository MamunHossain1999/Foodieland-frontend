/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { useGetAllUsersQuery } from "@/Redux/api/authApi";
import { useGetAllRecipesQuery } from "@/Redux/api/recipeApi";

const AdminHome = () => {
  // Fetch data
  const { data: usersData, isLoading: usersLoading } = useGetAllUsersQuery();
  const { data, isLoading: productsLoading } = useGetAllRecipesQuery();

  const users = usersData?.users ?? [];
  const products = (data as any)?.recipes ?? [];

  // Demo orders
  const orders = [
    { id: 1, user: "Md Mamun Hossain", product: "Chocolate Cake", total: "$15", status: "Pending" },
    { id: 2, user: "Ammu Rehena", product: "Pasta", total: "$12", status: "Delivered" },
    { id: 3, user: "John Doe", product: "Burger", total: "$8", status: "Cancelled" },
  ];

  return (
    <div className="space-y-8">

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-500">Total Products</h3>
          <p className="text-2xl font-bold">{productsLoading ? "..." : products.length}</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-500">Total Users</h3>
          <p className="text-2xl font-bold">{usersLoading ? "..." : users.length}</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-500">Orders</h3>
          <p className="text-2xl font-bold">{orders.length}</p>
        </div>
      </div>

      {/* Admin Pages */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Admin Pages</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <Link to="/admin/products">
            <div className="bg-blue-500 text-white p-6 rounded shadow hover:bg-blue-600 transition">
              <h3 className="text-lg font-semibold">Manage Products</h3>
              <p className="text-sm">View and manage all products</p>
            </div>
          </Link>

          <Link to="/admin/add-product">
            <div className="bg-green-500 text-white p-6 rounded shadow hover:bg-green-600 transition">
              <h3 className="text-lg font-semibold">Add Product</h3>
              <p className="text-sm">Add new product</p>
            </div>
          </Link>

          <Link to="/admin/all-users">
            <div className="bg-purple-500 text-white p-6 rounded shadow hover:bg-purple-600 transition">
              <h3 className="text-lg font-semibold">Users</h3>
              <p className="text-sm">Manage users</p>
            </div>
          </Link>

          <Link to="/admin/orders">
            <div className="bg-orange-500 text-white p-6 rounded shadow hover:bg-orange-600 transition">
              <h3 className="text-lg font-semibold">Orders</h3>
              <p className="text-sm">View all orders</p>
            </div>
          </Link>

          <Link to="/admin/profile">
            <div className="bg-gray-700 text-white p-6 rounded shadow hover:bg-gray-800 transition">
              <h3 className="text-lg font-semibold">Admin Profile</h3>
              <p className="text-sm">View and update profile</p>
            </div>
          </Link>

        </div>
      </div>

    </div>
  );
};

export default AdminHome;