import React, { useState } from "react";
import Sidebar from "../Components/Sidebar"; // adjust the path if needed
import Topbar from "../Components/Topbar";   // if you’ve extracted Topbar

function ChequeUpload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("chequeImage", file);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      setMessage(result.message || "Uploaded successfully.");
      setFile(null);
      setPreview(null);
    } catch (error) {
      console.error("Upload failed:", error);
      setMessage("An error occurred while uploading.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Topbar */}
        <Topbar title="Dashboard / Deposit Cheque" />

        {/* Page Content */}
        <section className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-md w-full mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md mt-6 sm:mt-10">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">
              Mobile Check Deposit
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
                className="block w-full text-xs sm:text-sm text-gray-600
                           file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-3 sm:file:px-4
                           file:rounded file:border-0
                           file:text-xs sm:file:text-sm file:font-semibold
                           file:bg-blue-100 file:text-blue-700
                           hover:file:bg-blue-200
                           cursor-pointer"
              />

              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mx-auto w-full max-w-[200px] sm:max-w-xs rounded border border-gray-300 mt-2"
                />
              )}

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded text-sm sm:text-base transition-colors"
              >
                Deposit Cheque
              </button>
            </form>

            <p className="text-[11px] sm:text-xs text-gray-500 mt-3 sm:mt-4 italic text-center">
              Note: cheque deposit may be delayed for confirmation.
            </p>

            {message && (
              <p className="mt-3 sm:mt-4 text-center text-sm text-gray-700 font-medium">
                {message}
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default ChequeUpload;
