 import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";

export default function MyLoans() {
  const [loans, setLoans] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false); // 👈 sidebar state

  // Fetch loans from backend API
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/loans"); // your backend route
        const data = await res.json();
        setLoans(data);
      } catch (err) {
        console.error("Error fetching loans:", err);
      }
    };
    fetchLoans();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Topbar
          title="Dashboard / My Loans"
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="p-6">
          <h1 className="text-lg text-gray-600 mb-4">Dashboard / My Loans</h1>

          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-50 text-gray-600 text-sm">
                  <th className="p-3 text-left">#</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Type</th>
                  <th className="p-3 text-left">Duration</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {loans.length > 0 ? (
                  loans.map((loan, index) => (
                    <tr
                      key={loan._id}
                      className="border-t text-sm hover:bg-gray-50"
                    >
                      <td className="p-3">{index + 1}</td>
                      <td className="p-3 text-green-600 font-medium">
                        ${loan.amount.toLocaleString()}
                      </td>
                      <td className="p-3">{loan.type}</td>
                      <td className="p-3">{loan.duration}</td>
                      <td className="p-3 capitalize">{loan.status}</td>
                      <td className="p-3">
                        {new Date(loan.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center p-4 text-gray-500 italic"
                    >
                      No loan history found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
