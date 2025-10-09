import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function LoginPage() {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        // ✅ Save token, userId, and role to localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data._id);
        localStorage.setItem("role", data.role);


        // ✅ Redirect based on user role
        if (data.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-900 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('/Images/Bank.webp')",
      }}
    >
    

      {/* Login Card */}
      <div className="bg-white rounded-xl shadow-lg w-96 p-6">
        <h1 className="text-center text-xl font-semibold mb-4">{t("Home")}</h1>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("email")}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("password")}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div className="text-right">
            <Link to ="/ForgotPassword" className="text-sm text-gray-600 hover:underline">
              {t("forgot password")}
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
          >
            {t("login")}
          </button>

          <p className="text-center text-sm mt-3">
            <Link to="/RegisterPage" className="text-blue-600 hover:underline">
              {t("create account")}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
