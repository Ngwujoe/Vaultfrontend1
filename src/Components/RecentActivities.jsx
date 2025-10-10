import { useEffect, useState } from "react";
import axios from "axios";

export default function RecentActivities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    async function fetchActivities() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(
          "https://backend-tmtp.onrender.com/users/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setActivities(res.data.loginActivities || []);
      } catch (err) {
        console.error("Failed to fetch activities:", err);
      }
    }

    fetchActivities();

    // Optional: refresh every 10 seconds
    const interval = setInterval(fetchActivities, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <h3 className="font-bold mb-2">Recent Activities</h3>
      <ul className="text-sm text-gray-600">
        {activities.length === 0 && <li className="text-gray-400">No recent activity.</li>}
        {activities.map((activity, index) => (
          <li key={index} className="flex justify-between border-b py-1">
            <span>{activity.action}</span>
            <span className="text-red-500">
              {new Date(activity.timestamp).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
