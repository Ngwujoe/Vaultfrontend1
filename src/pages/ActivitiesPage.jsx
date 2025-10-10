// Pages/ActivitiesPage.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";

export default function ActivitiesPage({ userId }) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActivities() {
      try {
        const res = await axios.get(`https://backend-tmtp.onrender.com/users/${userId}/activities`);
        setActivities(res.data);
      } catch (err) {
        console.error("Failed to fetch activities:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchActivities();
  }, [userId]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <Topbar />

        {/* Page content */}
        <div className="p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Recent Activities</h2>

          <div className="bg-white rounded-lg p-6 shadow">
            {loading ? (
              <p className="text-gray-500">Loading activities...</p>
            ) : activities.length === 0 ? (
              <p className="text-gray-500">No recent activity found.</p>
            ) : (
              <ul className="text-sm text-gray-600">
                {activities.map((activity, index) => (
                  <li
                    key={index}
                    className="flex justify-between border-b py-2 hover:bg-gray-50 transition"
                  >
                    <span>{activity.action}</span>
                    <span className="text-gray-500 text-xs">
                      {new Date(activity.timestamp).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
