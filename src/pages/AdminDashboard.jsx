import { useState, useEffect } from "react";
import axios from "axios";
import Topbar from "../Components/Topbar";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [amount, setAmount] = useState("");

  // Fetch all users
  useEffect(() => {
    async function fetchUsers() {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://backend-tmtp.onrender.com/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    }
    fetchUsers();
  }, []);

  // Increase user balance
  const handleIncreaseBalance = async () => {
    if (!selectedUser || !amount) return;
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://backend-tmtp.onrender.com/users/${selectedUser._id}/increase-balance`,
        { amount: parseFloat(amount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`✅ Added $${amount} to ${selectedUser.firstName}'s balance`);
      setAmount("");
      setSelectedUser(null);
    } catch (err) {
      console.error("Failed to increase balance:", err);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Topbar */}
        <Topbar
          title="Admin Dashboard"
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Admin Sections */}
        <section className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Users Table */}
          <div className="bg-white rounded-lg p-6 shadow col-span-2">
            <h2 className="font-bold mb-4 text-lg">All Users</h2>
            <table className="w-full text-sm text-left border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Balance</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-t">
                    <td className="p-2">{user.firstName} {user.lastName}</td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-2">${user.balance.toFixed(2)}</td>
                    <td className="p-2">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="px-2 py-1 bg-blue-600 text-white rounded-md text-sm"
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Increase Balance Card */}
          {selectedUser && (
            <div className="bg-black text-white rounded-lg p-6 shadow col-span-2">
              <h3 className="font-bold mb-2 text-lg">
                Increase Balance for {selectedUser.firstName} {selectedUser.lastName}
              </h3>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="px-3 py-2 rounded-l-md text-white w-full"
                />
                <button
                  onClick={handleIncreaseBalance}
                  className="bg-green-500 px-4 py-2 rounded-r-md text-white"
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
