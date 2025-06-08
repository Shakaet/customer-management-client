import React, { useContext, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { Context } from "../provider/AuthProvider";

const AddaLead = () => {

   let {user}=  useContext(Context)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    product: "",
    status: "New",
    expectedDate: "",
    notes: "",
    myEmail:user?.email
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/leads", formData);

      if (res.data.insertedId) {
        Swal.fire("Success!", "Lead added successfully!", "success");
        setFormData({
          name: "",
          phone: "",
          email: "",
          product: "",
          status: "New",
          expectedDate: "",
          notes: "",
        });
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">
        Add New Lead
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium">Customer Name</label>
          <input
            type="text"
            name="name"
            placeholder="Rahul Sharma"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md mt-1"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="9876543210"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md mt-1"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            name="email"
            placeholder="rahul@email.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md mt-1"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">
            Product Interested
          </label>
          <input
            type="text"
            name="product"
            placeholder="Health Insurance"
            value={formData.product}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md mt-1"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Lead Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md mt-1"
          >
            <option value="New">New</option>
            <option value="In Process">In Process</option>
            <option value="Follow-Up">Follow-Up</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium">
            Expected Closure Date
          </label>
          <input
            type="date"
            name="expectedDate"
            value={formData.expectedDate}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md mt-1"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Notes</label>
          <textarea
            name="notes"
            placeholder="Right Something"
            value={formData.notes}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md mt-1"
            rows={4}
            required
          />
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Add Lead
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AddaLead;
