// src/components/Sidebar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaMoneyBill,
  FaExchangeAlt,
  FaCreditCard,
  FaFileInvoice,
  FaUser,
  FaQuestionCircle,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const [openMenu, setOpenMenu] = useState(null);
  const [securityOpen, setSecurityOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
  // Remove authentication data
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  sessionStorage.clear();

  // Redirect to login page
  navigate("/");

  // Optional: reload app to clear state
  window.location.reload();
};


  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
    if (menu !== "account") setSecurityOpen(false); // close security when leaving account
  };

  return (
    <aside
      className={`fixed lg:static top-0 left-0 h-full bg-white shadow-md p-4 overflow-y-auto transition-transform duration-300 z-50
        ${sidebarOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0 lg:w-64"}
      `}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6 lg:mb-4">
        <h2 className="text-xl font-bold">Menu</h2>
        <button
          className="lg:hidden text-gray-600"
          onClick={() => setSidebarOpen(false)}
        >
          ✖
        </button>
      </div>

      {/* Navigation */}
      <nav className="space-y-4">
        {/* Dashboard */}
        <Link to="/dashboard" className="flex items-center gap-3 hover:text-blue-600">
          <FaHome /> Dashboard
        </Link>

        {/* Deposit Money */}
        <div>
          <button
            className="flex items-center justify-between w-full hover:text-blue-600"
            onClick={() => toggleMenu("deposit")}
          >
            <span className="flex items-center gap-3">
              <FaMoneyBill /> Deposit Money
            </span>
            <span
              className={`transform transition-transform duration-300 ${
                openMenu === "deposit" ? "rotate-90" : ""
              }`}
            >
              <FaChevronRight />
            </span>
          </button>

          <div
            className={`ml-8 mt-2 space-y-2 text-sm text-gray-600 overflow-hidden transition-all duration-300 ease-in-out 
              ${openMenu === "deposit" ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
          >
            <Link to="/ChequeDeposit" className="block hover:text-blue-600">
              Check Deposit
            </Link>
          </div>
        </div>

        {/* Transfer Money */}
        <div>
          <button
            className="flex items-center justify-between w-full hover:text-blue-600"
            onClick={() => toggleMenu("transfer")}
          >
            <span className="flex items-center gap-3">
              <FaExchangeAlt /> Transfer Money
            </span>
            <span
              className={`transform transition-transform duration-300 ${
                openMenu === "transfer" ? "rotate-90" : ""
              }`}
            >
              <FaChevronRight />
            </span>
          </button>

          <div
            className={`ml-8 mt-2 space-y-2 text-sm text-gray-600 overflow-hidden transition-all duration-300 ease-in-out 
              ${openMenu === "transfer" ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
          >
            <Link to="/LocalTransfer" className="block hover:text-blue-600">Local Transfer</Link>
            <Link to="/InternationalTransfer" className="block hover:text-blue-600">Wire Transfer</Link>
          </div>
        </div>

        {/* Credit Cards */}
        <div>
          <button
            className="flex items-center justify-between w-full hover:text-blue-600"
            onClick={() => toggleMenu("credit")}
          >
            <span className="flex items-center gap-3">
              <FaCreditCard /> Credit Cards
            </span>
            <span
              className={`transform transition-transform duration-300 ${
                openMenu === "credit" ? "rotate-90" : ""
              }`}
            >
              <FaChevronRight />
            </span>
          </button>

          <div
            className={`ml-8 mt-2 space-y-2 text-sm text-gray-600 overflow-hidden transition-all duration-300 ease-in-out 
              ${openMenu === "credit" ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
          >
            <Link to="/Cards" className="block hover:text-blue-600">Apply New</Link>
          </div>
        </div>

        {/* Loan / Mortgages */}

        <div>
            <button
            className="flex items-center justify-between w-full hover:text-blue-600"
            onClick={() => toggleMenu("Loan/Mortgages")}
          >
            <span className="flex items-center gap-3">
              <FaFileInvoice /> Loan/Mortgages
            </span>
            <span
              className={`transform transition-transform duration-300 ${
                openMenu === "Loan/Mortgages" ? "rotate-90" : ""
              }`}
            >
              <FaChevronRight />
            </span>
          </button>


          <div className={`ml-8 mt-2 space-y-2 text-sm text-gray-600 overflow-hidden transition-all duration-300 ease-in-out 
              ${openMenu === "Loan/Mortgages" ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
              >

            <Link to ="/LoanRequest" className="block hover:text-blue-600">New Loans</Link>
            <Link to ="/Myloans" className="block hover:text-blue-600">My Loans</Link>
        </div>
        </div>
        

        {/* Bank Statement */}
        <Link to ="/HistoryPage" className="flex items-center gap-3 hover:text-blue-600">
          <FaFileInvoice /> Bank Statement
        </Link>

        {/* My Account (with Security submenu) */}
        <div>
          <button
            className="flex items-center justify-between w-full hover:text-blue-600"
            onClick={() => toggleMenu("account")}
          >
            <span className="flex items-center gap-3">
              <FaUser /> My Account
            </span>
            <span
              className={`transform transition-transform duration-300 ${
                openMenu === "account" ? "rotate-90" : ""
              }`}
            >
              <FaChevronRight />
            </span>
          </button>

          <div
            className={`ml-8 mt-2 space-y-2 text-sm text-gray-600 overflow-hidden transition-all duration-300 ease-in-out 
              ${openMenu === "account" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
          >
            <Link to ="/MyAccountPage"className="block hover:text-blue-600">Profile</Link>
            <Link to ="/KycVerificationPage" className="block hover:text-blue-600">KYC</Link>
            <Link to ="/NextOfKinForm" className="block hover:text-blue-600">Next of Kin</Link>

            {/* Security Submenu */}
            <div>
              <button
                className="flex items-center justify-between w-full hover:text-blue-600"
                onClick={() => setSecurityOpen(!securityOpen)}
              >
                <span>Security</span>
                <span
                  className={`transform transition-transform duration-300 ${
                    securityOpen ? "rotate-90" : ""
                  }`}
                >
                  <FaChevronRight />
                </span>
              </button>

              <div
                className={`ml-6 mt-2 space-y-2 text-sm text-gray-600 overflow-hidden transition-all duration-300 ease-in-out 
                  ${securityOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <Link to ="/ManagePassword" className="block hover:text-blue-600">Password</Link>
                <Link to ="/ManagePin" className="block hover:text-blue-600">Pincode</Link>
                <Link to ="/ActivitiesPage" className="block hover:text-blue-600">Activities</Link>
                <Link to ="/NewTicket" className="block hover:text-blue-600">Report</Link>
              </div>
            </div>
          </div>
        </div>

        <div>
          <button
                className="flex items-center justify-between w-full hover:text-blue-600"
                onClick={() => toggleMenu("Need Help")}
              >
                <span className="flex items-center gap-3">
              <FaQuestionCircle /> Need Help
            </span>
                <span
                  className={`transform transition-transform duration-300 ${
                     openMenu === "Need Help" ? "rotate-90" : ""
                  }`}
                >
                  <FaChevronRight />
                </span>
              </button>

              <div
                className={`ml-6 mt-2 space-y-2 text-sm text-gray-600 overflow-hidden transition-all duration-300 ease-in-out 
                  ${openMenu === "Need Help" ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <Link to ="/NewTicket" className="block hover:text-blue-600">New Tickets</Link>
                <Link to ="/TicketHistory" className="block hover:text-blue-600">View Ticket</Link>
                <Link to ="/Helpdesk" className="block hover:text-blue-600">Help Desk</Link>
              </div>




        </div>


        {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 text-red-500 hover:text-red-700 w-full text-left"
>
        <FaSignOutAlt /> Sign Out
      </button>

        {/* Logout */}
        
      </nav>
    </aside>
  );
}
