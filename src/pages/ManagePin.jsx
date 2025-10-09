// src/pages/ManagePin.jsx
import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import TopBar from "../Components/Topbar";

export default function ManagePin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    oldPin: "",
    newPin: "",
    confirmPin: "",
  });
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPin !== formData.confirmPin) {
      setMessage("New PIN and confirmation do not match.");
      setIsError(true);
      return;
    }

    if (formData.newPin.length !== 4) {
      setMessage("PIN must be exactly 4 digits.");
      setIsError(true);
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      const token = localStorage.getItem("token"); // assumes JWT stored

      const res = await fetch("https://backend-tmtp.onrender.com/users/api/auth/change-pin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPin: formData.oldPin,
          newPin: formData.newPin,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Something went wrong");
        setIsError(true);
      } else {
        setMessage("✅ PIN updated successfully!");
        setIsError(false);
        setFormData({ oldPin: "", newPin: "", confirmPin: "" });
      }
    } catch (err) {
      setMessage("⚠️ Server error");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <TopBar
          title="Dashboard / Manage PIN"
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-2xl font-semibold mb-6">Manage PIN</h1>

          <div className="flex justify-center">
            <div className="bg-white shadow-md rounded-md p-6 sm:p-8 w-full max-w-lg">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    Old PIN
                  </label>
                  <input
                    type="password"
                    name="oldPin"
                    value={formData.oldPin}
                    onChange={handleChange}
                    placeholder="Old PIN"
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    New PIN
                  </label>
                  <input
                    type="password"
                    name="newPin"
                    value={formData.newPin}
                    onChange={handleChange}
                    placeholder="New PIN"
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    Confirm New PIN
                  </label>
                  <input
                    type="password"
                    name="confirmPin"
                    value={formData.confirmPin}
                    onChange={handleChange}
                    placeholder="Confirm New PIN"
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900 transition disabled:opacity-50"
                >
                  {loading ? "Updating..." : "Change PIN"}
                </button>

                {message && (
                  <p
                    className={`mt-3 text-sm font-medium ${
                      isError ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {message}
                  </p>
                )}
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
