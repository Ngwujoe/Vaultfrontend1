// src/pages/ManagePassword.jsx
import { useState } from "react";
import Sidebar from "../Components/Sidebar";
import TopBar from "../Components/Topbar";

export default function ManagePassword() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleShowPassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage("New password and confirmation do not match.");
      setIsError(true);
      return;
    }

    if (formData.newPassword.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      setIsError(true);
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      const token = localStorage.getItem("token"); // JWT token

      const res = await fetch(
        "https://backend-tmtp.onrender.com/users/reset-password/${token}",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            oldPassword: formData.oldPassword,
            newPassword: formData.newPassword,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Something went wrong");
        setIsError(true);
      } else {
        setMessage("✅ Password updated successfully!");
        setIsError(false);
        setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      }
    } catch (err) {
      setMessage("⚠️ Server error");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  // Disable submit if fields are empty
  const isFormIncomplete =
    !formData.oldPassword || !formData.newPassword || !formData.confirmPassword;

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar
          title="Dashboard / Manage Password"
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-center">
            <div className="bg-white shadow-md rounded-md p-6 sm:p-8 w-full max-w-lg">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/** Old Password */}
                <div className="relative">
                  <label className="block text-gray-600 font-medium mb-1">
                    Old Password
                  </label>
                  <input
                    type={showPassword.oldPassword ? "text" : "password"}
                    name="oldPassword"
                    value={formData.oldPassword}
                    onChange={handleChange}
                    placeholder="Old Password"
                    className="w-full border rounded-md p-2 pr-10 focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => toggleShowPassword("oldPassword")}
                    className="absolute top-9 right-2 text-gray-500 text-sm"
                  >
                    {showPassword.oldPassword ? "Hide" : "Show"}
                  </button>
                </div>

                {/** New Password */}
                <div className="relative">
                  <label className="block text-gray-600 font-medium mb-1">
                    New Password
                  </label>
                  <input
                    type={showPassword.newPassword ? "text" : "password"}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="New Password"
                    className="w-full border rounded-md p-2 pr-10 focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => toggleShowPassword("newPassword")}
                    className="absolute top-9 right-2 text-gray-500 text-sm"
                  >
                    {showPassword.newPassword ? "Hide" : "Show"}
                  </button>
                </div>

                {/** Confirm New Password */}
                <div className="relative">
                  <label className="block text-gray-600 font-medium mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type={showPassword.confirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm New Password"
                    className="w-full border rounded-md p-2 pr-10 focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => toggleShowPassword("confirmPassword")}
                    className="absolute top-9 right-2 text-gray-500 text-sm"
                  >
                    {showPassword.confirmPassword ? "Hide" : "Show"}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading || isFormIncomplete}
                  className="w-full sm:w-auto bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900 transition disabled:opacity-50"
                >
                  {loading ? "Updating..." : "Change Password"}
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
