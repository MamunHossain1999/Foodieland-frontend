/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetAllRecipesQuery, useDeleteRecipeMutation } from "@/Redux/api/recipeApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminProducts = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetAllRecipesQuery();
  const [deleteRecipe] = useDeleteRecipeMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);

  const products = (data as any)?.recipes ?? [];

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products</p>;

  const handleDeleteClick = (id: string) => {
    setSelectedRecipeId(id);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedRecipeId) return;
    try {
      await deleteRecipe(selectedRecipeId).unwrap();
      toast.success("Recipe deleted successfully!");
    } catch (err: any) {
      console.error("Delete failed:", err?.data || err.message);
      toast.error("Delete failed!");
    } finally {
      setModalOpen(false);
      setSelectedRecipeId(null);
    }
  };

  const cancelDelete = () => {
    setModalOpen(false);
    setSelectedRecipeId(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Products</h2>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {products?.map((p: any) => (
            <tr key={p._id} className="border-t">
              <td className="p-3">{p.title}</td>
              <td className="p-3">{p.category}</td>
              <td className="p-3 flex gap-3">
                <button
                  className="text-blue-500"
                  onClick={() => navigate(`/admin/update/product/${p._id}`)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500"
                  onClick={() => handleDeleteClick(p._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p className="mb-4">Are you sure you want to delete this recipe?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;