import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { PlusCircle, Save, UploadCloud, X, Lock } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const API_BASE = "http://127.0.0.1:8000/vehicles/";

export default function DealerAddListingForm({ onSuccess, setTab }) {
  const { user, access, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    price: "",
    make: "",
    model: "",
    year: "",
    mileage: "",
    transmission: "",
    drivetrain: "",
    fuel_type: "",
    body_style: "",
    exterior_color: "",
    interior_color: "",
    vin: "",
    engine: "",
    title_status: "",
    location: "",
    description: "",
    condition: "Used",
    seller_type: "Dealer",
    has_warranty: false,
    is_featured: false,
    images: [],
  });
  const [imagePreviews, setImagePreviews] = useState([]);

  // 🚫 Require authentication
  if (!isAuthenticated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-10 text-center bg-[var(--surface-color)] border border-[var(--border-color)] rounded-xl shadow-md"
      >
        <Lock className="mx-auto text-[var(--accent-color)] mb-3" size={40} />
        <h2 className="text-xl font-semibold text-[var(--text-color)]">
          Sign in required
        </h2>
        <p className="text-[var(--muted-text)] mt-2">
          You need to be logged in as a dealer to add listings.
        </p>
        <a
          href="/login"
          className="inline-block mt-5 px-6 py-2 bg-[var(--accent-color)] text-white rounded-full hover:bg-[var(--accent-hover)] transition"
        >
          Go to Login
        </a>
      </motion.div>
    );
  }

  // ✏️ Input Handlers
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setForm((prev) => ({ ...prev, images: files }));
    setImagePreviews(files.map((f) => URL.createObjectURL(f)));
  };

  // 🚀 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (key === "images") {
          value.forEach((file) => formData.append("image_files", file));
        } else {
          formData.append(key, value);
        }
      });

      const { data } = await axios.post(`${API_BASE}listings/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${access}`,
        },
      });

      onSuccess?.(data);

      // Reset form cleanly
      setForm({
        title: "",
        price: "",
        make: "",
        model: "",
        year: "",
        mileage: "",
        transmission: "",
        drivetrain: "",
        fuel_type: "",
        body_style: "",
        exterior_color: "",
        interior_color: "",
        vin: "",
        engine: "",
        title_status: "",
        location: "",
        description: "",
        condition: "Used",
        seller_type: "Dealer",
        has_warranty: false,
        is_featured: false,
        images: [],
      });
      setImagePreviews([]);
      setTab?.("listings");
    } catch (err) {
      console.error("Error creating listing:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Dropdowns
  const transmissionOptions = [
    "Automatic",
    "Manual",
    "CVT",
    "Dual-Clutch",
    "Semi-Automatic",
    "Other",
  ];
  const drivetrainOptions = ["FWD", "RWD", "AWD", "4WD"];
  const fuelOptions = ["Petrol", "Diesel", "Hybrid", "Electric"];
  const bodyStyles = [
    "Sedan",
    "SUV",
    "Hatchback",
    "Truck",
    "Coupe",
    "Convertible",
    "Wagon",
    "Other",
  ];
  const titleStatuses = ["Clean", "Salvage", "Rebuilt", "Parts Only"];

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="grid md:grid-cols-2 gap-6 p-6 bg-[var(--surface-color)] rounded-2xl shadow-lg border border-[var(--border-color)] backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="md:col-span-2 text-2xl font-bold mb-4 text-[var(--text-color)]">
        Add New Car Listing
      </h2>

      {/* Basic Fields */}
      {[
        { name: "title", placeholder: "Listing Title" },
        { name: "price", placeholder: "Price (KSh)", type: "number" },
        { name: "make", placeholder: "Make" },
        { name: "model", placeholder: "Model" },
        { name: "year", placeholder: "Year", type: "number" },
        { name: "mileage", placeholder: "Mileage (km)", type: "number" },
        { name: "vin", placeholder: "VIN" },
        { name: "engine", placeholder: "Engine (e.g., 2.0L Turbo)" },
        { name: "location", placeholder: "Location" },
      ].map((f) => (
        <input
          key={f.name}
          {...f}
          value={form[f.name]}
          onChange={handleChange}
          required={["title", "price", "make", "model"].includes(f.name)}
          className="px-4 py-2 rounded-lg border border-[var(--border-color)] bg-transparent text-[var(--text-color)] placeholder-[var(--muted-text)] focus:border-[var(--accent-color)] outline-none transition"
        />
      ))}

      {/* Dropdowns */}
      {[ 
        { name: "transmission", options: transmissionOptions, label: "Transmission" },
        { name: "drivetrain", options: drivetrainOptions, label: "Drivetrain" },
        { name: "fuel_type", options: fuelOptions, label: "Fuel Type" },
        { name: "body_style", options: bodyStyles, label: "Body Style" },
        { name: "title_status", options: titleStatuses, label: "Title Status" },
      ].map(({ name, options, label }) => (
        <select
          key={name}
          name={name}
          value={form[name]}
          onChange={handleChange}
          className="px-4 py-2 rounded-lg border border-[var(--border-color)] bg-transparent text-[var(--text-color)] focus:border-[var(--accent-color)]"
        >
          <option value="">{`Select ${label}`}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ))}

      {/* Description */}
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="md:col-span-2 px-4 py-3 rounded-lg border border-[var(--border-color)] bg-transparent text-[var(--text-color)] placeholder-[var(--muted-text)] focus:border-[var(--accent-color)] outline-none min-h-[120px]"
      />

      {/* Image Upload */}
      <div className="md:col-span-2 mt-4">
        <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl cursor-pointer border-[var(--border-color)] hover:border-[var(--accent-color)] transition">
          <UploadCloud className="text-[var(--accent-color)] mb-2" />
          <span className="text-sm text-[var(--muted-text)]">
            Click to upload car images (multiple allowed)
          </span>
          <input type="file" multiple className="hidden" onChange={handleImageChange} />
        </label>

        {imagePreviews.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-4">
            {imagePreviews.map((src, i) => (
              <div key={i} className="relative group">
                <img
                  src={src}
                  alt="Preview"
                  className="w-28 h-28 object-cover rounded-lg border border-[var(--border-color)] group-hover:opacity-75 transition"
                />
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-black/60 p-1 rounded-full text-white hover:bg-black/80 transition"
                  onClick={() =>
                    setImagePreviews((prev) => prev.filter((_, idx) => idx !== i))
                  }
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="md:col-span-2 text-center mt-6">
        <button
          type="submit"
          disabled={loading}
          className="px-10 py-3 rounded-full bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white font-semibold flex items-center justify-center gap-2 mx-auto shadow-md transition"
        >
          {loading ? (
            <>
              <Save className="animate-spin" size={18} />
              Saving...
            </>
          ) : (
            <>
              <PlusCircle size={18} /> Publish Listing
            </>
          )}
        </button>
      </div>
    </motion.form>
  );
}