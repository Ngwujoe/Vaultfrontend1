import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation
    if (password !== confirm) {
      setMessage("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `https://backend-tmtp.onrender.com/users/reset-password/${token}`,
        { newPassword: password }
      );

      // Updated message to reflect email sending
      setMessage(
        res.data.message || 
        "Password has been reset successfully. Check your email for your new password."
      );

      // Redirect to login after 3 seconds
      setTimeout(() => navigate("/"), 3000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Determine message color
  const messageColor = message.toLowerCase().includes("success") ? "text-green-600" : "text-red-600";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
      >
        <div className="text-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            alt="Reset"
            className="mx-auto w-12 h-12 mb-3"
          />
          <h2 className="text-lg font-semibold">
            Please choose a strong and easy password.
          </h2>
        </div>

        <input
          type="password"
          placeholder="Enter New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border border-gray-300 p-3 rounded w-full mb-3 focus:outline-none focus:ring-2 focus:ring-black"
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          className="border border-gray-300 p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white w-full py-2 rounded hover:bg-gray-800"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>

        {message && (
          <p className={`text-center mt-4 text-sm ${messageColor}`}>{message}</p>
        )}
      </form>
    </div>
  );
}
