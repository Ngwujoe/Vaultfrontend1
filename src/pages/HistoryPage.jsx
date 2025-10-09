// src/Components/HistoryTable.jsx
// src/pages/HistoryPage.jsx
import { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
import HistoryTable from "../Components/HistoryTable";

export default function HistoryPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <Topbar
          title="Dashboard / History"
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-2xl font-semibold mb-6">Transaction History</h1>
          <HistoryTable />
        </main>
      </div>
    </div>
  );
}
