import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, PlusCircle } from "lucide-react";
import DealerListings from "./DealerListings";
import DealerAddListingForm from "./DealerAddListingForm";
import { useAuth } from "../../../context/AuthContext";

const API_BASE = "http://127.0.0.1:8000/vehicles";

export default function DealerListingManager({ dealerId = null }) {
  const { access, user } = useAuth();
  const [tab, setTab] = useState("listings");
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ---------------- FETCH LISTINGS ----------------
  const fetchListings = async () => {
    if (!access) return;

    try {
      setLoading(true);
      setError("");

      // ✅ If dealerId provided => fetch public listings for that dealer
      // else => fetch logged-in dealer's own listings
      const url = dealerId
        ? `${API_BASE}/listings/?dealer=${dealerId}`
        : `${API_BASE}/listings/my/`;

      const headers = { Authorization: `Bearer ${access}` };
      const { data } = await axios.get(url, { headers });

      // Handle paginated responses or array
      setListings(Array.isArray(data) ? data : data.results || []);
    } catch (err) {
      console.error("Error fetching listings:", err);
      setError("Failed to load listings. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [dealerId, access]);

  // ---------------- DELETE LISTING ----------------
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;

    try {
      await axios.delete(`${API_BASE}/listings/${id}/`, {
        headers: { Authorization: `Bearer ${access}` },
      });
      setListings((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Unable to delete this listing.");
    }
  };

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] p-6 md:p-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-center"
        >
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {dealerId ? "Dealer Listings" : "My Dealer Dashboard"}
            </h1>
            {!dealerId && user && (
              <p className="text-sm text-[var(--muted-text)]">
                Welcome back, {user?.company_name || user?.name || user?.email || "Dealer"}
              </p>
            )}
          </div>

          {!dealerId && (
            <div className="flex gap-3 mt-6 sm:mt-0">
              <button
                onClick={() => setTab("listings")}
                className={`flex items-center gap-2 px-5 py-2 rounded-full font-semibold transition-all duration-200 ${
                  tab === "listings"
                    ? "bg-[var(--accent-color)] text-white shadow-md"
                    : "border border-[var(--border-color)] hover:border-[var(--accent-color)]"
                }`}
              >
                <LayoutGrid size={18} /> My Listings
              </button>

              <button
                onClick={() => setTab("add")}
                className={`flex items-center gap-2 px-5 py-2 rounded-full font-semibold transition-all duration-200 ${
                  tab === "add"
                    ? "bg-[var(--accent-color)] text-white shadow-md"
                    : "border border-[var(--border-color)] hover:border-[var(--accent-color)]"
                }`}
              >
                <PlusCircle size={18} /> Add Listing
              </button>
            </div>
          )}
        </motion.header>

        <div className="border-t border-[var(--border-color)]"></div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {tab === "listings" ? (
            <motion.div
              key="listings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {error ? (
                <p className="text-center text-red-500 py-10">{error}</p>
              ) : (
                <DealerListings
                  listings={listings}
                  loading={loading}
                  onDelete={!dealerId ? handleDelete : null}
                />
              )}
            </motion.div>
          ) : (
            !dealerId && (
              <motion.div
                key="add"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <DealerAddListingForm
                  onSuccess={(newListing) => setListings((prev) => [newListing, ...prev])}
                  setTab={setTab}
                />
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}