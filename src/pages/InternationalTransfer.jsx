import React, { useState, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";

const InternationalTransfer = () => {
  const [formData, setFormData] = useState({
    amount: "",
    paymentAccount: "",
    accountType: "",
    bankName: "",
    accountName: "",
    accountNumber: "",
    bankCountry: "",
    routingNumber: "",
    details: "",
  });

  const options = useMemo(() => countryList().getData(), []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = (selectedOption) => {
    setFormData((prev) => ({ ...prev, bankCountry: selectedOption.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    alert("International Transfer Initiated!");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Fixed Topbar */}
        <Topbar />

        {/* Scrollable Content */}
        <div className="flex-1 flex items-center justify-center px-6 pt-28 md:pt-24 lg:pt-20 overflow-y-auto">
          <div className="max-w-3xl w-full bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              International Transfer
            </h2>

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
                    className="pl-7 pr-24 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                    Fee: $35
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

              {/* Account Type */}
              <div>
                <label className="block font-medium mb-1">Account Type</label>
                <select
                  name="accountType"
                  value={formData.accountType}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="">Select Account Type</option>
                  <option value="savings">Savings</option>
                  <option value="checking">Checking</option>
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

              {/* Bank Country */}
              <div>
                <label className="block font-medium mb-1">Bank Country</label>
                <Select
                  options={options}
                  value={options.find(
                    (opt) => opt.value === formData.bankCountry
                  )}
                  onChange={handleCountryChange}
                  placeholder="Select Bank Country"
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              </div>

              {/* Routing Number */}
              <div>
                <label className="block font-medium mb-1">
                  Routing Number / Bank Code
                </label>
                <input
                  type="text"
                  name="routingNumber"
                  value={formData.routingNumber}
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
        </div>
      </div>
    </div>
  );
};

export default InternationalTransfer;
