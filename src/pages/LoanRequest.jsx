import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";

export default function LoanRequest() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    account: "",
    type: "",
    duration: "",
    repayment: "",
    details: "",
    pincode: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token"); // 🔹 Get token
      const res = await fetch("https://backend-tmtp.onrender.com/users/api/loans/loan-request", {
        method: "POST",
        headers: { "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 🔹 Include token 
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Loan request submitted successfully!");
        setFormData({
          amount: "",
          account: "",
          type: "",
          duration: "",
          repayment: "",
          details: "",
          pincode: "",
        });
      } else {
        setMessage(`❌ ${data.error || "Something went wrong"}`);
      }
    } catch (err) {
      setMessage("❌ Network error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <Topbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="p-6 overflow-y-auto">
          <h1 className="text-lg text-gray-600 mb-4">Dashboard / Loan Request</h1>

          <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl">
            <h2 className="text-lg font-semibold mb-4">Loan Request</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm">Loan Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full border rounded p-2 mt-1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm">Settlement Account</label>
                <select
                  name="account"
                  value={formData.account}
                  onChange={handleChange}
                  className="w-full border rounded p-2 mt-1"
                  required
                >
                  <option value="">Select Settlement Account</option>
                  <option>Savings</option>
                  <option>Checking</option>
                </select>
              </div>

              <div>
                <label className="block text-sm">Loan Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full border rounded p-2 mt-1"
                  required
                >
                  <option value="">Select Loan Type</option>
                  <option>Personal Loan</option>
                  <option>Business Loan</option>
                  <option>Mortgage Loan</option>
                </select>
              </div>

              <div>
                <label className="block text-sm">Loan Duration</label>
                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full border rounded p-2 mt-1"
                  required
                >
                  <option value="">Select Duration</option>
                  <option>6 Months</option>
                  <option>12 Months</option>
                  <option>24 Months</option>
                </select>
              </div>

              <div>
                <label className="block text-sm">Repayment Duration</label>
                <select
                  name="repayment"
                  value={formData.repayment}
                  onChange={handleChange}
                  className="w-full border rounded p-2 mt-1"
                  required
                >
                  <option value="">Select Repayment</option>
                  <option>Monthly</option>
                  <option>Quarterly</option>
                  <option>Yearly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm">Details</label>
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  className="w-full border rounded p-2 mt-1"
                  rows="3"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-sm">Account Pincode</label>
                <input
                  type="password"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="w-full border rounded p-2 mt-1"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Request Loan"}
              </button>
            </form>

            {message && (
              <p className="mt-4 text-center text-sm font-medium">{message}</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
