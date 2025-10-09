import { useState } from "react";
import Sidebar from "../Components/Sidebar";
import TopBar from "../Components/Topbar";

export default function NextOfKinPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "Male",
    dob: "",
    address: "",
    state: "",
    idFront: null,
    idBack: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <TopBar
          title="Dashboard / Next of Kin"
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          user={{ firstName: "John" }} // later replace with real user data
        />

        {/* Main content */}
        <main className="flex-1 p-6 overflow-y-auto">
          
          <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Add Next of Kin Information
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-gray-600 font-medium">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-600 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="example@mail.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-gray-600 font-medium">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="15890138371"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-gray-600 font-medium">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-gray-600 font-medium">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-gray-600 font-medium">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Address"
                />
              </div>

              {/* State */}
              <div>
                <label className="block text-gray-600 font-medium">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="State"
                />
              </div>

              {/* ID Card Uploads */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 font-medium">
                    ID Card (Front)
                  </label>
                  <input
                    type="file"
                    name="idFront"
                    onChange={handleChange}
                    className="w-full border rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 font-medium">
                    ID Card (Back)
                  </label>
                  <input
                    type="file"
                    name="idBack"
                    onChange={handleChange}
                    className="w-full border rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Add
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
