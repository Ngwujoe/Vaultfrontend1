import Sidebar from "../Components/Sidebar";
import TopBar from "../Components/Topbar";
import { useState } from "react";

export default function KycVerificationPage() {
  const [formData, setFormData] = useState({
    idFront: null,
    idBack: null,
    proofOfAddress: null,
    idNumber: "",
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleChange = (e) => {
    const { name, files, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted data:", formData);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <TopBar
          title="Dashboard / KYC Verification"
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          user={{ firstName: "John" }}
        />

        <main className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-2xl font-semibold mb-6">
            Dashboard / KYC Verification
          </h1>

          <div className="bg-white rounded shadow p-6 max-w-5xl">
            <h2 className="text-lg font-semibold mb-4">
              MORE INFORMATION NEEDED
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* ID Front */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    ID Front
                  </label>
                  <input
                    type="file"
                    name="idFront"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 text-sm"
                  />
                </div>

                {/* ID Back */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    ID Back
                  </label>
                  <input
                    type="file"
                    name="idBack"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 text-sm"
                  />
                </div>

                {/* ID Number */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    ID Number
                  </label>
                  <input
                    type="text"
                    name="idNumber"
                    placeholder="Enter your ID Number"
                    value={formData.idNumber}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 text-sm"
                  />
                </div>

                {/* Proof of Address */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Proof of Address
                  </label>
                  <input
                    type="file"
                    name="proofOfAddress"
                    accept="image/*,.pdf"
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
                >
                  Submit Verification
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
