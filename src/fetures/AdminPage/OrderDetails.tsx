import { useParams } from "react-router-dom";
import { useGetSingleOrderQuery } from "@/Redux/api/orderApi";

// Type definitions
export interface RecipeInfo {
  _id: string;
  title: string;
  ingredients?: string[];
  steps?: string[];
  price?: number;
  image?: string;
}

export interface UserInfo {
  _id: string;
  name: string;
}

export interface Order {
  _id: string;
  recipeId: RecipeInfo;
  userId: UserInfo; // populated user object
  status: "Pending" | "Delivered" | "Cancelled";
}

const OrderDetails = () => {
  const { id } = useParams<{ id: string }>();

  // Fetch single order
  const { data: order, isLoading, isError } = useGetSingleOrderQuery(id!);

  if (isLoading) return <p className="text-center mt-10">Loading order...</p>;
  if (isError || !order)
    return <p className="text-center mt-10 text-red-500">Order not found</p>;

  const { recipeId, userId } = order;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded mt-10">
      <h2 className="text-3xl font-bold mb-4">
        {recipeId?.title || "Unknown Product"}
      </h2>

      <p className="mb-2">
        <strong>Status:</strong>{" "}
        <span className="text-blue-600">{order.status}</span>
      </p>

      <p className="mb-2">
        <strong>User:</strong> {userId?.name || "Unknown User"}
      </p>

      <p className="mb-2">
        <strong>Ingredients:</strong>{" "}
        {recipeId?.ingredients?.join(", ") || "N/A"}
      </p>

      <p className="mb-2">
        <strong>Steps:</strong> {recipeId?.steps?.join(", ") || "N/A"}
      </p>

      <p className="mb-2">
        <strong>Price:</strong> ${recipeId?.price ?? 0}
      </p>

      {recipeId?.image && (
        <img
          src={recipeId.image}
          alt={recipeId.title}
          className="mt-4 w-full h-64 object-cover rounded"
        />
      )}
    </div>
  );
};

export default OrderDetails;