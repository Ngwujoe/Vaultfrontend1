import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
import { Link } from "react-router-dom";


// ✅ RecentActivities component
function RecentActivities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    async function fetchActivities() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get("https://backend-tmtp.onrender.com/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setActivities(res.data.loginActivities || []);
      } catch (err) {
        console.error("Failed to fetch activities:", err);
      }
    }

    fetchActivities();
    const interval = setInterval(fetchActivities, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <h3 className="font-bold mb-2">Recent Activities</h3>
      <ul className="text-sm text-gray-600">
        {activities.length === 0 && (
          <li className="text-gray-400">No recent activities.</li>
        )}
        {activities.map((act, idx) => (
          <li key={idx} className="flex justify-between">
            <span>{act.action}</span>
            <span className="text-red-500">
              {new Date(act.timestamp).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [inflowOpen, setInflowOpen] = useState(false);
  const [outflowOpen, setOutflowOpen] = useState(false);

  // Fetch user profile
  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get("https://backend-tmtp.onrender.com/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    }

    fetchUser();
    const interval = setInterval(fetchUser, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  if (!user) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <Topbar
          title="Dashboard / Overview"
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <section className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Balance Card */}
          <div className="bg-black text-white rounded-2xl p-6 shadow-md relative">
            <div className="flex justify-between items-center mb-4">
              <span className="flex items-center gap-2">
                <img
                  src="https://via.placeholder.com/28"
                  alt="profile"
                  className="rounded-full"
                />
                <span className="text-sm">{user.firstName} {user.lastName}</span>
              </span>
              <button className="text-white text-lg">+</button>
            </div>

            <h2 className="text-lg font-semibold">Current Balance</h2>
            <p className="text-3xl font-bold my-2">${user.balance.toFixed(2)}</p>

            {/* Inflow / Outflow */}
            <div className="flex gap-4 mt-4">
              <div
                className="bg-white text-black px-4 py-2 rounded-lg flex-1 cursor-pointer"
                onClick={() => setInflowOpen(!inflowOpen)}
              >
                <div className="flex justify-between items-center">
                  <span>Inflow</span>
                  <span>{inflowOpen ? "▲" : "▼"}</span>
                </div>
                <p className="text-green-600 font-bold text-sm">
                  ${user.inflow?.toFixed(2) || "0.00"}
                </p>
              </div>

              <div
                className="bg-white text-black px-4 py-2 rounded-lg flex-1 cursor-pointer"
                onClick={() => setOutflowOpen(!outflowOpen)}
              >
                <div className="flex justify-between items-center">
                  <span>Outflow</span>
                  <span>{outflowOpen ? "▲" : "▼"}</span>
                </div>
                <p className="text-red-600 font-bold text-sm">
                  ${user.outflow?.toFixed(2) || "0.00"}
                </p>
              </div>
            </div>

            {/* Loan / Savings */}
            <div className="mt-4 text-sm space-y-1">
              <p>
                Loan Balance: <span className="text-blue-500">${user.loanBalance?.toFixed(2) || "0.00"}</span>
              </p>
              <p>
                Savings Balance: <span className="text-blue-500">${user.savingsBalance?.toFixed(2) || "0.00"}</span>
              </p>
              <p>
                Current Balance: <span className="text-blue-500">${user.balance.toFixed(2)}</span>
              </p>
            </div>

            <div className="flex justify-between mt-4">
              <button className="px-4 py-2 rounded-md bg-purple-100 text-purple-600 text-sm">
                <Link to = "/HistoryPage">
                View Details</Link>
              </button>
              <button className="px-4 py-2 rounded-md bg-green-100 text-green-600 text-sm">
               <Link to ="/MyAccountPage"> Account Details </Link>
              </button>
            </div>
          </div>

          {/* Recent Activities */}
          <RecentActivities />
        </section>
      </main>
    </div>
  );
}
