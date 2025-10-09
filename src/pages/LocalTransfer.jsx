// src/pages/LocalTransfer.jsx
import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";

const LocalTransfer = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [formData, setFormData] = useState({
    amount: "",
    paymentAccount: "",
    bankName: "",
    accountNumber: "",
    accountName: "",
    details: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Transfer initiated!");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <Topbar setSidebarOpen={setSidebarOpen} />

        {/* Page Content */}
        <main className="flex-1 p-6">
          <div className="max-w-3xl mx-auto bg-white rounded-md shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Local Transfer</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Amount */}
              <div>
                <label className="block font-medium mb-1">
                  Amount (Total Balance: $0.00)
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                    className="pl-7 pr-20 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                    Fee: $30
                  </span>
                </div>
              </div>

              {/* Payment Account */}
              <div>
                <label className="block font-medium mb-1">Payment Account</label>
                <select
                  name="paymentAccount"
                  value={formData.paymentAccount}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="">Select Payment Account</option>
                  <option value="account1">Account 1</option>
                  <option value="account2">Account 2</option>
                </select>
              </div>

              {/* Bank Name */}
              <div>
                <label className="block font-medium mb-1">Bank Name</label>
                <input
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              {/* Account Number */}
              <div>
                <label className="block font-medium mb-1">Account Number</label>
                <input
                  type="text"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              {/* Account Name */}
              <div>
                <label className="block font-medium mb-1">Account Name</label>
                <input
                  type="text"
                  name="accountName"
                  value={formData.accountName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              {/* Details */}
              <div>
                <label className="block font-medium mb-1">Details</label>
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Reason for transfer"
                  className="w-full border border-gray-300 rounded-md p-2"
                ></textarea>
              </div>

              {/* Make Transfer Button */}
              <div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition"
                >
                  Make Transfer
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LocalTransfer;
