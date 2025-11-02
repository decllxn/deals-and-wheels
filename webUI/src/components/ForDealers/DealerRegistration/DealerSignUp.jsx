import React, { useState } from "react";
import { motion } from "framer-motion";
import { Car, Building2, Globe2, Phone, Star, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { dealerSignup } from "../../../api/dealerApi";

export default function DealerSignUp() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirm_password: "",
    name: "",
    company_name: "",
    business_type: "",
    contact_number: "",
    website: "",
    address: "",
    description: "",
    logo: null,
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm_password) {
      setErrorMsg("Passwords do not match!");
      return;
    }

    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      const data = await dealerSignup(formData);
      setSuccessMsg(data.message || "Dealer account created successfully!");
      localStorage.setItem("dealer_info", JSON.stringify(data.dealer));
      setTimeout(() => navigate("/dealer-dashboard"), 1500);
    } catch (error) {
      const err =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Signup failed. Please try again.";
      setErrorMsg(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-16 overflow-hidden mt-15"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        background:
          "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.06), transparent 60%), var(--bg-color)",
        color: "var(--text-color)",
      }}
    >
      {/* Floating Background Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[Car, Building2, Globe2, Phone, Star].map((Icon, index) => (
          <motion.div
            key={index}
            className="absolute opacity-10"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.6 + 0.4,
            }}
            animate={{
              y: [0, 20, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 12 + Math.random() * 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Icon
              size={65}
              style={{
                color: "var(--accent-color)",
                opacity: 0.12,
                filter: "blur(0.3px)",
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-10 max-w-2xl">
        <motion.h1
          initial={{ y: -25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight"
        >
          Become a{" "}
          <span style={{ color: "var(--accent-color)" }}>Verified Dealer</span>
        </motion.h1>
        <p className="text-[var(--muted-text)] text-sm md:text-base">
          Join our dealer network — showcase your cars, grow your reach, and
          manage your business seamlessly with our platform.
        </p>
      </div>

      {/* Floating Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-4xl bg-[rgba(255,255,255,0.04)] dark:bg-[rgba(0,0,0,0.3)] backdrop-blur-lg rounded-2xl p-6 md:p-10 shadow-2xl border border-[var(--border-color)]"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {[
          { name: "email", placeholder: "Business Email", type: "email" },
          { name: "password", placeholder: "Password", type: "password" },
          { name: "confirm_password", placeholder: "Confirm Password", type: "password" },
          { name: "name", placeholder: "Dealer Display Name" },
          { name: "company_name", placeholder: "Company Name" },
          { name: "business_type", placeholder: "Business Type" },
          { name: "contact_number", placeholder: "Contact Number" },
          { name: "website", placeholder: "Website URL", type: "url" },
        ].map((input, i) => (
          <motion.input
            key={i}
            {...input}
            value={form[input.name]}
            onChange={handleChange}
            className="w-full border border-[var(--border-color)] rounded-xl p-3 bg-[rgba(255,255,255,0.05)] dark:bg-[rgba(255,255,255,0.07)] focus:ring-2 focus:ring-[var(--accent-color)] focus:outline-none text-[var(--text-color)] shadow-sm transition-all duration-300 placeholder-[var(--muted-text)]"
            whileFocus={{ scale: 1.02 }}
          />
        ))}

        <motion.textarea
          name="address"
          placeholder="Business Address"
          value={form.address}
          onChange={handleChange}
          rows="2"
          className="md:col-span-2 w-full border border-[var(--border-color)] rounded-xl p-3 bg-[rgba(255,255,255,0.05)] dark:bg-[rgba(255,255,255,0.07)] focus:ring-2 focus:ring-[var(--accent-color)] focus:outline-none text-[var(--text-color)] placeholder-[var(--muted-text)] shadow-sm"
        />

        <motion.textarea
          name="description"
          placeholder="Short Description"
          value={form.description}
          onChange={handleChange}
          rows="3"
          className="md:col-span-2 w-full border border-[var(--border-color)] rounded-xl p-3 bg-[rgba(255,255,255,0.05)] dark:bg-[rgba(255,255,255,0.07)] focus:ring-2 focus:ring-[var(--accent-color)] focus:outline-none text-[var(--text-color)] placeholder-[var(--muted-text)] shadow-sm"
        />

        {/* Logo Upload */}
        <div className="md:col-span-2 flex flex-col items-center gap-3 mt-3">
          <label
            htmlFor="logo"
            className="cursor-pointer px-6 py-2 border border-[var(--border-color)] rounded-full bg-[rgba(255,255,255,0.05)] dark:bg-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.1)] text-sm transition text-[var(--text-color)]"
          >
            Upload Dealer Logo
          </label>
          <input
            type="file"
            id="logo"
            name="logo"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
        </div>

        {/* Submit */}
        <div className="md:col-span-2 text-center mt-6">
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-10 py-3 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white rounded-full font-semibold flex items-center justify-center gap-2 mx-auto shadow-lg transition-all duration-300"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" /> Creating Account...
              </>
            ) : (
              "Create Dealer Account"
            )}
          </motion.button>

          {errorMsg && (
            <p className="text-red-400 mt-3 text-sm whitespace-pre-wrap">{errorMsg}</p>
          )}
          {successMsg && (
            <p className="text-green-400 mt-3 text-sm">{successMsg}</p>
          )}
        </div>
      </motion.form>

      {/* Subtle glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(255,255,255,0.05)] to-transparent pointer-events-none" />
    </motion.div>
  );
}