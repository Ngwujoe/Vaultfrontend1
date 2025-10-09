// Pages/NewTicket.jsx
import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
import axios from "axios";

export default function NewTicket({ user }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    ticketType: "",
    info: "",
    pincode: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5000/tickets", {
        ...formData,
        userId: user?._id, // ✅ attach the logged-in user ID
      });

      if (res.status === 201) {
        setMessage("✅ Ticket created successfully!");
        setFormData({ ticketType: "", info: "", pincode: "" });
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to create ticket. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <Topbar
          title="Dashboard / New Ticket"
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          user={user}
        />

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="w-full max-w-3xl bg-white shadow-md rounded-md p-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-4 border-b pb-2">
              New Ticket
            </h2>

            {message && (
              <p className="mb-4 text-sm font-medium text-center">
                {message}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Ticket Type */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Ticket Type
                </label>
                <select
                  name="ticketType"
                  value={formData.ticketType}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 text-sm text-gray-700 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  required
                >
                  <option value="">Select Loan Type</option>
                  <option value="Technical Issue">Technical Issue</option>
                  <option value="Account Inquiry">Account Inquiry</option>
                  <option value="Loan Request">Loan Request</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* More Information */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  More Information
                </label>
                <textarea
                  name="info"
                  placeholder="Well detailed"
                  value={formData.info}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 text-sm text-gray-700 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  rows="4"
                  required
                ></textarea>
              </div>

              {/* Account Pincode */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Account Pincode
                </label>
                <input
                  type="password"
                  name="pincode"
                  placeholder="******"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 text-sm text-gray-700 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-black text-white text-sm px-5 py-2 rounded shadow hover:bg-gray-800 transition disabled:opacity-50"
                >
                  {loading ? "Creating..." : "Create New Ticket"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
