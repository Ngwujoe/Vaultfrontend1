// src/pages/ResetPassword.jsx
import { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
const [email, setEmail] = useState("");
const [message, setMessage] = useState("");
const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
e.preventDefault();
setLoading(true);
setMessage("");


try {
  const res = await axios.post(
    "https://voltabancaditalia.com/users/forgot-password",
    { email }
  );
  setMessage(res.data.message);
} catch (err) {
  setMessage(err.response?.data?.message || "Something went wrong.");
} finally {
  setLoading(false);
}


};

return ( <div className="min-h-screen flex items-center justify-center bg-gray-100"> <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center"> <h2 className="text-xl font-semibold mb-2">Forgot Your Password?</h2> <p className="text-gray-500 mb-4">
Enter the email linked to your account. We'll send you a reset link. </p>


    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Enter your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-black"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
      >
        {loading ? "Sending..." : "Send Reset Link"}
      </button>
    </form>

    {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
  </div>
</div>


);
}
