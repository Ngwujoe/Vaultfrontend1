import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";

export default function Cards() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleApply = (e) => {
    e.preventDefault();
    setMessage("Application in progress...");
    setTimeout(() => setMessage(""), 4000);
  };

  const cards = [
    {
      name: "Black Card",
      gradient: "from-black via-gray-800 to-gray-900",
      shine: "before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-tr before:from-white/5 before:via-transparent before:to-transparent before:rounded-xl before:mix-blend-overlay",
      textColor: "text-gray-200",
      chipColor: "bg-gray-300",
      numberColor: "text-gray-100",
      balanceColor: "text-gray-300",
    },
    {
      name: "Gold Card",
      gradient: "from-yellow-600 via-amber-500 to-yellow-400",
      shine: "before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-tr before:from-white/30 before:via-transparent before:to-transparent before:rounded-xl before:mix-blend-overlay",
      textColor: "text-black",
      chipColor: "bg-black",
      numberColor: "text-black",
      balanceColor: "text-black",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Topbar
          title="Dashboard / Apply New Cards"
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="p-6 overflow-y-auto">
          <h1 className="text-lg text-gray-600 mb-4">
            Dashboard / Apply New Cards
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cards Display */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className={`relative rounded-xl shadow-lg p-6 flex flex-col justify-between overflow-hidden bg-gradient-to-r ${card.gradient} ${card.shine} transition-transform hover:scale-[1.02] duration-300`}
                >
                  <div className="flex justify-between items-center">
                    <div className={`w-10 h-6 rounded ${card.chipColor}`}></div>
                    <span className={`uppercase text-sm tracking-wider ${card.textColor}`}>
                      {card.name}
                    </span>
                  </div>
                  <div className={`mt-6 text-xl font-mono tracking-wider ${card.numberColor}`}>
                    6784 XXXX XXXX XXXX
                  </div>
                  <div className={`mt-6 flex justify-between items-center text-sm ${card.balanceColor}`}>
                    <span>$ X,XXX.XX</span>
                    <span>XXXX</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Apply for Card Form */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Apply New Card</h2>

              <form onSubmit={handleApply}>
                <label className="block text-sm text-gray-600 mb-1">
                  Select Card Account
                </label>
                <select className="w-full border rounded-md p-2 mb-3 focus:ring-2 focus:ring-black">
                  <option>Select Card Account</option>
                  <option>Savings Account</option>
                  <option>Checking Account</option>
                </select>

                <p className="text-sm text-gray-500 mb-3">Fee: $50</p>

                <label className="block text-sm text-gray-600 mb-1">
                  Account Pincode
                </label>
                <input
                  type="password"
                  placeholder="******"
                  className="w-full border rounded-md p-2 mb-4 focus:ring-2 focus:ring-black"
                />

                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
                >
                  Apply For Card
                </button>

                {message && (
                  <p className="mt-3 text-center text-sm text-blue-600 font-medium">
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

