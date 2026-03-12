/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import {
  useGetOrderHistoryQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
  type Order,
  
} from "@/Redux/api/orderApi";
import { toast } from "react-toastify";

const MyOrders = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useGetOrderHistoryQuery();
  // Ensure orders is always an array
  const orders: Order[] = Array.isArray(data) ? data : [];

  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  const handleStatusChange = async (
    orderId: string,
    newStatus: "Pending" | "Delivered" | "Cancelled"
  ) => {
    try {
      const res = await updateOrderStatus({ orderId, status: newStatus }).unwrap();
      toast.success(res.message);
    } catch (error: any) {
      toast.error(error.data?.message || "Failed to update order status");
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    try {
      const res = await deleteOrder(orderId).unwrap();
      toast.success(res.message);
    } catch (error: any) {
      toast.error(error.data?.message || "Failed to delete order");
    }
  };

  if (isLoading) return <div>Loading orders...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id} className="border-t">
                <td className="p-3">{o.recipeId?.title || "Unknown"}</td>
                <td className="p-3">${o.recipeId?.price ?? 0}</td>
                <td className="p-3">
                  <select
                    value={o.status}
                    onChange={(e) =>
                      handleStatusChange(
                        o._id,
                        e.target.value as "Pending" | "Delivered" | "Cancelled"
                      )
                    }
                    className="border p-1 rounded"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => handleDeleteOrder(o._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => navigate(`/admin/order/${o._id}`)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyOrders;