// Pages/TicketHistory.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
import axios from "axios";

export default function TicketHistory({ user }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tickets from MongoDB API
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get(`http:/https://backend-tmtp.onrender.com/tickets?userId=${user?._id}`);
        setTickets(res.data);
      } catch (err) {
        console.error("Failed to fetch tickets:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [user]);

  // Function to assign colors based on ticket status
  const getStatusClasses = (status) => {
    switch ((status || "").toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-600 border-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-600 border-yellow-400";
      case "failed":
        return "bg-red-100 text-red-600 border-red-400";
      default:
        return "bg-gray-100 text-gray-600 border-gray-300";
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <Topbar
          title="Dashboard / Ticket History"
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          user={user}
        />

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="w-full max-w-5xl bg-white shadow-md rounded-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
              Ticket History
            </h2>

            {loading ? (
              <p className="text-center text-gray-500 py-10">Loading tickets...</p>
            ) : tickets.length === 0 ? (
              <p className="text-center text-gray-500 py-10">No tickets found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-gray-700">
                  <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                    <tr>
                      <th className="px-4 py-3 text-left border-b">#</th>
                      <th className="px-4 py-3 text-left border-b">Ticket</th>
                      <th className="px-4 py-3 text-left border-b">Type</th>
                      <th className="px-4 py-3 text-left border-b">Status</th>
                      <th className="px-4 py-3 text-left border-b">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.map((ticket, index) => (
                      <tr
                        key={ticket._id || index}
                        className="border-b hover:bg-gray-50 transition"
                      >
                        <td className="px-4 py-2">{index + 1}</td>
                        <td className="px-4 py-2 text-blue-600 hover:underline cursor-pointer">
                          {ticket.title || ticket.ticketType}
                        </td>
                        <td className="px-4 py-2">{ticket.type || ticket.ticketType}</td>
                        <td className="px-4 py-2">
                          <span
                            className={`px-2 py-1 border text-xs rounded ${getStatusClasses(
                              ticket.status
                            )}`}
                          >
                            {ticket.status || "Pending"}
                          </span>
                        </td>
                        <td className="px-4 py-2">
                          {ticket.date
                            ? new Date(ticket.date).toLocaleString()
                            : new Date(ticket.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <p className="text-sm text-gray-500 mt-3">List of all tickets</p>
          </div>
        </main>
      </div>
    </div>
  );
}
