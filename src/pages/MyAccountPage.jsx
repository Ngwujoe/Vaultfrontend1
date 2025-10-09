import { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import TopBar from "../Components/Topbar";

export default function MyAccountPage() {
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch user profile from backend
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found. Please login.");

        const res = await fetch("http://localhost:5000/users/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Failed to fetch profile. Server says: ${errorText}`);
        }

        const data = await res.json();
        setUser(data);

        // Optional: set profile pic if available
        if (data.avatarUrl) setProfilePic(data.avatarUrl);
      } catch (err) {
        console.error("Error fetching user:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Handle local image preview (frontend only)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfilePic(URL.createObjectURL(file));
    // TODO: send file to backend with FormData to save permanently
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading account...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">No user data found. Please login again.</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <TopBar
          title="Dashboard / My Account"
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          user={user}
        />

        {/* Main content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-2xl font-semibold mb-6">My Account</h1>

          <div className="bg-white shadow rounded p-6 max-w-4xl mx-auto">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">
              GENERAL INFORMATION
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Side - Profile Picture */}
              <div className="flex flex-col items-center gap-4">
                <div className="w-32 h-32 bg-gray-200 border rounded overflow-hidden">
                  {profilePic ? (
                    <img
                      src={profilePic}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">
                      No Image
                    </div>
                  )}
                </div>
                <label className="text-sm cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-1.5 rounded">
                    Upload Picture
                  </button>
                </label>
              </div>

              {/* Right Side - User Info */}
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex">
                  <span className="w-32 font-medium">Full Name:</span>
                  <span>{user.firstName} {user.lastName}</span>
                </div>
                <div className="flex">
                  <span className="w-32 font-medium">Email Address:</span>
                  <span>{user.email}</span>
                </div>
                <div className="flex">
                  <span className="w-32 font-medium">Phone:</span>
                  <span>{user.phone}</span>
                </div>
                <div className="flex">
                  <span className="w-32 font-medium">Role:</span>
                  <span className="text-yellow-600 font-semibold">{user.role}</span>
                </div>
                <div className="flex">
                  <span className="w-32 font-medium">Account Number:</span>
                  <span>{user.accountNumber}</span>
                </div>
                <div className="flex">
                  <span className="w-32 font-medium">Balance:</span>
                  <span>${user.balance?.toFixed(2) || 0}</span>
                </div>

                {/* Login Activities */}
                {user.loginActivities && user.loginActivities.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold text-gray-800 mb-2">Login Activities:</h3>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {user.loginActivities.map((activity, index) => (
                        <li key={index}>
                          {activity.action} - {new Date(activity.timestamp).toLocaleString()}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
