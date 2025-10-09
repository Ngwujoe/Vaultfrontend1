import { useEffect, useState } from "react";
import axios from "axios";

export default function HistoryTable() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get("http://localhost:5000/api/transactions", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // ✅ Extract the actual transactions array
        setTransactions(res.data.transactions || []);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) return <p className="text-center mt-4">Loading transactions...</p>;

  return (
    <div className="bg-white rounded shadow p-4 overflow-x-auto">
      <table className="min-w-full text-sm text-left">
        <thead>
          <tr className="text-gray-500 border-b">
            <th className="p-2">S/N</th>
            <th className="p-2">Reference ID</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Type</th>
            <th className="p-2">Payment Account</th>
            <th className="p-2">Status</th>
            <th className="p-2">Date</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center py-4 text-gray-500">
                No transactions found
              </td>
            </tr>
          ) : (
            transactions.map((tx, idx) => (
              <tr key={tx._id} className="border-t hover:bg-gray-50">
                <td className="p-2">{idx + 1}</td>
                <td className="p-2">{tx.reference || tx._id}</td>
                <td
                  className={`p-2 font-semibold ${
                    tx.type === "withdrawal" ? "text-red-600" : "text-green-600"
                  }`}
                >
                  ${tx.amount?.toFixed(2)}
                </td>
                <td className="p-2 capitalize">{tx.type}</td>
                <td className="p-2">
                  <span className="px-2 py-1 bg-gray-200 rounded text-xs">
                    {tx.account || "N/A"}
                  </span>
                </td>
                <td className="p-2">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      tx.status === "Successful"
                        ? "bg-green-200 text-green-800"
                        : tx.status === "Processing"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {tx.status || "Pending"}
                  </span>
                </td>
                <td className="p-2">{new Date(tx.createdAt).toLocaleString()}</td>
                <td className="p-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs">
                    View Receipt
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="mt-4 text-sm text-gray-600">
        Showing {transactions.length} transaction{transactions.length !== 1 && "s"}
      </div>
    </div>
  );
}
