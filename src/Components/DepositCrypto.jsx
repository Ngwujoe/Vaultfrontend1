// src/Components/DepositCrypto.jsx
import React, { useEffect, useRef, useState } from "react";


export default function DepositCrypto({
  address,
  siteName = "Vault",
  label = "Deposit Crypto",
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    // close on ESC
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // click outside to close
  useEffect(() => {
    const onClick = (e) => {
      if (open && modalRef.current && !modalRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const handleCopy = async () => {
    try {
      if (!address) return;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(address);
      } else {
        // fallback
        const ta = document.createElement("textarea");
        ta.value = address;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm ${className}`}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        {/* coin icon (simple) */}
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.5" />
          <path d="M8 12h8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        {label}
      </button>

      {open && (
        // overlay
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Deposit crypto modal"
        >
          <div
            ref={modalRef}
            className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            {/* header */}
            <div className="flex items-center justify-between px-5 py-3 border-b">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-600 text-white rounded-full w-9 h-9 flex items-center justify-center font-semibold">
                  {siteName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-semibold">{siteName}</h3>
                  <p className="text-xs text-gray-500">Deposit Crypto</p>
                </div>
              </div>
              <button
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-gray-700 p-2 rounded"
              >
                ✕
              </button>
            </div>

            {/* body */}
            <div className="px-6 py-5">
              <p className="text-sm text-gray-600 mb-3">
                Send the desired cryptocurrency to the address below. Once sent, confirm on-chain.
              </p>

              <div className="bg-gray-50 border rounded-lg p-4 mb-3">
                <label className="text-xs text-gray-500">Wallet address</label>
                <div className="mt-2 flex items-center gap-3">
                  <input
                    readOnly
                    value={address || ""}
                    className="flex-1 bg-transparent text-sm text-gray-800 outline-none break-all"
                  />
                  <button
                    onClick={handleCopy}
                    className="px-3 py-1 bg-gray-900 text-white rounded-md text-xs hover:bg-black"
                    aria-label="Copy address"
                  >
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
                <p className="mt-2 text-xs text-gray-400 select-text">
                  {/* show shortened address hint */}
                  {address
                    ? `Starts with ${address.slice(0, 8)}…${address.slice(-6)}`
                    : "No address configured"}
                </p>
              </div>

              {/* QR placeholder (optional) */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded bg-white border flex items-center justify-center text-xs text-gray-400">
                  QR
                </div>
                <div className="text-sm text-gray-600">
                  <div className="font-medium">Network</div>
                  <div className="text-xs text-gray-400">Bitcoin / Ethereum / USDT (choose one)</div>
                </div>
              </div>
            </div>

            {/* footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t">
              <div className="text-xs text-gray-500">Be careful — send only the correct token to this address.</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(address || "");
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1500);
                  }}
                  className="px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700"
                >
                  {copied ? "Copied" : "Copy Address"}
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md text-sm hover:bg-gray-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
