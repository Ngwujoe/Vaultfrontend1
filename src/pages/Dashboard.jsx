import { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
import { Link } from "react-router-dom";
import useUserProfile from "../hooks/useUserProfile";
import RecentActivities from "../Components/RecentActivities"; 
import DepositCrypto from "../Components/DepositCrypto";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inflowOpen, setInflowOpen] = useState(false);
  const [outflowOpen, setOutflowOpen] = useState(false);
  const walletAddress = "0x1234abcd5678ef90..."; 

  const { user, loading, error } = useUserProfile(); // ✅ use the hook

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-20">Error loading user data.</p>;
  if (!user) return <p className="text-center mt-20">No user data available.</p>;

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

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
                <span className="text-sm">
                  {user.firstName} {user.lastName}
                </span>
              </span>
              <button className="text-white text-lg">+</button>
            </div>

            <h2 className="text-lg font-semibold">Current Balance</h2>
            <p className="text-3xl font-bold my-2">${user.balance.toFixed(2)}</p>

            <div className="flex gap-4 mt-4">
              {/* Inflow */}
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

              {/* Outflow */}
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
                Loan Balance:{" "}
                <span className="text-blue-500">
                  ${user.loanBalance?.toFixed(2) || "0.00"}
                </span>
              </p>
              <p>
                Savings Balance:{" "}
                <span className="text-blue-500">
                  ${user.savingsBalance?.toFixed(2) || "0.00"}
                </span>
              </p>
              <p>
                Current Balance:{" "}
                <span className="text-blue-500">
                  ${user.balance.toFixed(2)}
                </span>
              </p>
            </div>

            <div className="flex justify-between mt-4">
              <button className="px-4 py-2 rounded-md bg-purple-100 text-purple-600 text-sm">
                <Link to="/HistoryPage">View Details</Link>
              </button>
              <button className="px-4 py-2 rounded-md bg-green-100 text-green-600 text-sm">
                <Link to="/MyAccountPage">Account Details</Link>
              </button>
            </div>
          </div>

          <RecentActivities />


        <div>
          {/* ... other UI */}
         <DepositCrypto
        address={walletAddress}
        siteName="VoltaBanca"
        label="Deposit Crypto"
         />
        </div>

      </section>
      </main>
    </div>
  );
}
