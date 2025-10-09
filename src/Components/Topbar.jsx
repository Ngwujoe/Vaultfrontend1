import { Bell, Mail, Menu } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom"; // ✅ Import this
import logo from "/Images/logo.png";

export default function Topbar({ title, sidebarOpen, setSidebarOpen, user }) {
  const { i18n } = useTranslation();

  // ✅ Extract initials from first + last name
  const getInitials = (first = "", last = "") =>
    `${first?.charAt(0) || ""}${last?.charAt(0) || ""}`.toUpperCase() || "U";

  // ✅ Generate color from the first letter
  const getColorFromLetter = (letter) => {
  const colors = [
      "bg-red-500",
      "bg-orange-500",
      "bg-amber-500",
      "bg-yellow-500",
      "bg-lime-500",
      "bg-green-500",
      "bg-emerald-500",
      "bg-teal-500",
      "bg-cyan-500",
      "bg-sky-500",
      "bg-blue-500",
      "bg-indigo-500",
      "bg-violet-500",
      "bg-purple-500",
      "bg-fuchsia-500",
      "bg-pink-500",
      "bg-rose-500",
    ];

    if (!letter) return "bg-gray-500";
    const index = (letter.toUpperCase().charCodeAt(0) - 65) % colors.length;
    return colors[index];
  };

  const initials = getInitials(user?.firstName, user?.lastName);
  const colorClass = getColorFromLetter(user?.firstName?.[0]);

  return (
    <header className="flex justify-between items-center bg-white px-4 sm:px-6 py-3 shadow-sm">
      <div className="flex items-center gap-3">
        {/* Sidebar Toggle for mobile */}
        <button
          className="lg:hidden text-gray-600"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu />
        </button>

        {/* Logo and Title */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Vault Logo" className="w-8 h-8 object-contain" />
          <span className="text-gray-700 text-sm sm:text-base font-medium">
            {title || "Vault Bank"}
          </span>
        </div>
      </div>

      {/* Right Side: Icons + User Initials */}
      <div className="flex items-center gap-4 sm:gap-6">
        <Mail className="cursor-pointer text-gray-600" />
        <Bell className="cursor-pointer text-gray-600" />

        {/* ✅ User initials circle with link to profile */}
        <Link to="/MyAccountPage">
          <div
            className={`w-9 h-9 flex items-center justify-center rounded-full text-white font-semibold text-sm uppercase ${colorClass} cursor-pointer hover:opacity-90 hover:scale-105 transition-transform duration-200`}
          >
            {initials}
          </div>
        </Link>
      </div>
    </header>
  );
}
