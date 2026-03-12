/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetAllUsersQuery, useUpdateUserRoleMutation, useDeleteUserMutation } from "@/Redux/api/authApi";
import { toast } from "react-toastify";

const AllUsersPage = () => {
  const { data, isLoading, error } = useGetAllUsersQuery();
  const [updateUserRole] = useUpdateUserRoleMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const users = data?.users ?? [];

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users</p>;

  const handleRoleChange = async (id: string, role: "user" | "admin") => {
    try {
      setUpdatingUserId(id);
      await updateUserRole({ id, role }).unwrap();
      toast.success("User role updated successfully!");
    } catch (err: any) {
      toast.error(err?.data?.message || err.message || "Failed to update role");
    } finally {
      setUpdatingUserId(null);
    }
  };

  const handleDeleteClick = (id: string) => {
    setSelectedUserId(id);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedUserId) return;
    try {
      await deleteUser(selectedUserId).unwrap();
      toast.success("User deleted successfully!");
    } catch (err: any) {
      toast.error(err?.data?.message || err.message || "Failed to delete user");
    } finally {
      setModalOpen(false);
      setSelectedUserId(null);
    }
  };

  const cancelDelete = () => {
    setModalOpen(false);
    setSelectedUserId(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">All Users</h1>

        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 border-b">ID</th>
                <th className="p-3 border-b">Name</th>
                <th className="p-3 border-b">Email</th>
                <th className="p-3 border-b">Role</th>
                <th className="p-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: any) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="p-3 border-b">{user._id}</td>
                  <td className="p-3 border-b">{user.name}</td>
                  <td className="p-3 border-b">{user.email}</td>
                  <td className="p-3 border-b">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value as "user" | "admin")
                      }
                      disabled={updatingUserId === user._id}
                      className="border p-1 rounded"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="p-3 border-b flex gap-2">
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                      onClick={() => handleDeleteClick(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Delete Confirmation Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
              <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
              <p className="mb-4">Are you sure you want to delete this user?</p>
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
      </main>
    </div>
  );
};

export default AllUsersPage;