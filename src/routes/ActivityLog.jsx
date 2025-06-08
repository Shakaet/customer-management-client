import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

const ActivityLog = () => {
  // Fetch all users
  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:3000/users");
    return res.data;
  };

  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  // Handle role update
  const handleRoleChange = async (id, newRole) => {
    try {
      const res = await axios.patch(`http://localhost:3000/api/users/${id}`, {
        role: newRole,
      });
      if (res.data.modifiedCount > 0) {
        Swal.fire("Updated!", "User role updated successfully.", "success");
        refetch();
      } else {
        Swal.fire("No Change", "Role already set.", "info");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update role", "error");
    }
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto mt-10 p-4 bg-white rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold text-center text-indigo-400 mb-6">
        Manage Users
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border border-gray-200">
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              <th className="py-3 px-4 border">#</th>
              <th className="py-3 px-4 border">Name</th>
              <th className="py-3 px-4 border">Email</th>
              <th className="py-3 px-4 border">Photo</th>
              <th className="py-3 px-4 border">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="hover:bg-gray-50 transition">
                <td className="py-3 px-4 border">{index + 1}</td>
                <td className="py-3 px-4 border">{user.name}</td>
                <td className="py-3 px-4 border">{user.email}</td>
                <td className="py-3 px-4 border">
                  <img
                    src={user.user_photo}
                    alt="user"
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="py-3 px-4 border">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="admin">admin</option>
                    <option value="executives">executive</option>
                  </select>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ActivityLog;
