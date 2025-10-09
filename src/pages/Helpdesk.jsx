// Pages/Helpdesk.jsx
import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";

export default function Helpdesk({ user }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Get started",
      answer:
        "Welcome to the Helpdesk. Here you can find useful resources and guides to help you navigate your account easily.",
    },
    {
      question: "How to send wire transfer",
      answer:
        "When sending wire transfer, you need to ensure you have sufficient funds and correct recipient details before confirming the transaction.",
    },
    // Add more FAQs as needed
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <Topbar
          title="Dashboard / Helpdesk"
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          user={user}
        />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Page Header */}
          <div className="bg-blue-500 text-white py-10 text-center rounded-b-md mb-6">
            <h1 className="text-2xl font-semibold">Helpdesk</h1>
            <p className="text-sm opacity-90">
              A knowledge base Admin Template
            </p>
          </div>

          {/* FAQ Content */}
          <div className="flex justify-center mb-10 px-4">
            <div className="w-full max-w-2xl space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-md shadow-sm border border-gray-200"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex justify-between items-center px-4 py-3 text-left text-sm font-medium text-blue-600 hover:text-blue-700 focus:outline-none"
                  >
                    {faq.question}
                    <span
                      className={`transform transition-transform ${
                        openIndex === index ? "rotate-90" : ""
                      }`}
                    >
                      ➤
                    </span>
                  </button>

                  {openIndex === index && (
                    <div className="bg-black text-white text-sm px-4 py-3 rounded-b-md">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
