import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X } from "lucide-react";

export default function DealerProfileModal({ dealer, authToken, onClose, onLogoChange }) {
  const [edited, setEdited] = useState({
    company_name: dealer.company_name || "",
    website: dealer.website || "",
    contact_number: dealer.contact_number || "",
    address: dealer.address || "",
    description: dealer.description || "",
  });
  const [preview, setPreview] = useState(dealer.logo || null);
  const [loading, setLoading] = useState(false);

  // Handle text input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEdited((prev) => ({ ...prev, [name]: value }));
  };

  // Handle logo upload
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setPreview(fileURL);
      setEdited((prev) => ({ ...prev, logo: file }));
      onLogoChange(fileURL);
    }
  };

  // Handle save (PATCH request)
  const handleSave = async () => {
    setLoading(true);
    try {
      const formData = new FormData();

      // Only include fields that are not null or undefined
      Object.entries(edited).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });

      const response = await fetch("http://127.0.0.1:8000/dealers/api/dealers/me/", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ PATCH error:", errorText);
        alert("Failed to update dealer profile. Check console for details.");
      } else {
        const updated = await response.json();
        console.log("✅ Dealer updated:", updated);
        onClose();
      }
    } catch (error) {
      console.error("❌ Error updating dealer:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 px-4 sm:px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="bg-[var(--surface-color)] rounded-3xl w-full max-w-lg 
                     border border-[var(--border-color)] shadow-[0_8px_20px_var(--shadow-color)]
                     flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-[var(--border-color)] sticky top-0 bg-[var(--surface-color)] rounded-t-3xl z-10">
            <h3 className="text-lg font-semibold text-[var(--text-color)]">Edit Profile</h3>
            <button
              onClick={onClose}
              className="text-[var(--muted-text)] hover:text-[var(--accent-color)] transition"
            >
              <X className="w-5 h-5 stroke-[1.25]" />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="overflow-y-auto px-6 py-4 space-y-4 scrollbar-thin scrollbar-thumb-[var(--border-color)] scrollbar-track-transparent">
            {/* Profile Picture */}
            <div className="flex flex-col items-center mb-4">
              <div className="relative">
                <img
                  src={preview || "/placeholder-logo.png"}
                  alt="Preview"
                  className="w-24 h-24 rounded-2xl object-cover border border-[var(--border-color)] shadow-sm"
                />
                <label
                  className="absolute bottom-0 right-0 bg-[var(--accent-color)] p-1.5 rounded-full 
                             cursor-pointer hover:bg-[var(--accent-hover)] transition"
                >
                  <Upload className="w-4 h-4 text-white stroke-[1.25]" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-3">
              <Input label="Company Name" name="company_name" value={edited.company_name} onChange={handleChange} />
              <Input label="Website" name="website" value={edited.website} onChange={handleChange} />
              <Input label="Contact Number" name="contact_number" value={edited.contact_number} onChange={handleChange} />
              <Input label="Address" name="address" value={edited.address} onChange={handleChange} />
              <Textarea label="Description" name="description" value={edited.description} onChange={handleChange} />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 px-6 py-4 border-t border-[var(--border-color)] sticky bottom-0 bg-[var(--surface-color)] rounded-b-3xl">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-[var(--border-color)] 
                         text-[var(--muted-text)] hover:text-[var(--accent-color)] 
                         hover:border-[var(--accent-color)] transition"
              disabled={loading}
            >
              Cancel
            </button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleSave}
              disabled={loading}
              className={`px-5 py-2.5 rounded-xl font-medium text-white 
                         ${loading ? "bg-gray-400" : "bg-[var(--accent-color)] hover:bg-[var(--accent-hover)]"} 
                         shadow-[0_4px_10px_var(--shadow-color)] transition`}
            >
              {loading ? "Saving..." : "Save"}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function Input({ label, name, value, onChange }) {
  return (
    <div>
      <label className="block text-sm text-[var(--muted-text)] mb-1">{label}</label>
      <input
        name={name}
        value={value || ""}
        onChange={onChange}
        className="w-full px-3 py-2 rounded-xl bg-[var(--surface-color)] border border-[var(--border-color)] 
                   text-[var(--text-color)] focus:border-[var(--accent-color)] focus:outline-none 
                   focus:ring-1 focus:ring-[var(--highlight-color)] text-sm transition"
      />
    </div>
  );
}

function Textarea({ label, name, value, onChange }) {
  return (
    <div>
      <label className="block text-sm text-[var(--muted-text)] mb-1">{label}</label>
      <textarea
        name={name}
        value={value || ""}
        onChange={onChange}
        rows={3}
        className="w-full px-3 py-2 rounded-xl bg-[var(--surface-color)] border border-[var(--border-color)] 
                   text-[var(--text-color)] focus:border-[var(--accent-color)] focus:outline-none 
                   focus:ring-1 focus:ring-[var(--highlight-color)] text-sm resize-none transition"
      />
    </div>
  );
}