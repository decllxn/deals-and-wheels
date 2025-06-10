import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaPencilAlt, FaPaperPlane, FaFileUpload } from "react-icons/fa";
import Select from "react-select";
import ReCAPTCHA from "react-google-recaptcha";

const inquiryOptions = [
  { value: "sales", label: "🚗 Sales Inquiry" },
  { value: "support", label: "🛠 Support Request" },
  { value: "partnership", label: "🤝 Partnership Opportunity" },
  { value: "other", label: "❓ Other" },
];

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: localStorage.getItem("user_name") || "",
    email: localStorage.getItem("user_email") || "",
    subject: "",
    message: "",
    inquiryType: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "name") localStorage.setItem("user_name", value);
    if (name === "email") localStorage.setItem("user_email", value);
  };

  const handleFileUpload = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSelectChange = (selectedOption) => {
    setFormData({ ...formData, inquiryType: selectedOption.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("🚀 Message Sent Successfully!");
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-6xl mx-auto mt-16 px-6">
      
      {/* 📢 Call to Action Section (Same Height as Form) */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="lg:w-1/2 min-h-[100%] mr-3 mb-3 flex items-center justify-center relative rounded-lg overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/handshake.jpg')` }} // Replace with your image path
        >
          <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dimmed Overlay */}
        </div>
        <div className="relative z-10 p-10 text-center lg:text-left flex flex-col justify-center h-full">
          <h2 className="text-4xl font-extrabold text-white leading-tight">
            Get in Touch <br />
            <span className="text-blue-400">We're Here to Help!</span>
          </h2>
          <p className="text-gray-300 mt-4 text-lg">
            Whether you need assistance, want to sell a car, or have partnership ideas, we're just a message away!
          </p>
          <div className="mt-6">
            <a
              href="tel:+254712345678"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition"
            >
              📞 Call Us Now
            </a>
          </div>
        </div>
      </motion.div>

      {/* 📝 Contact Form Section */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="lg:w-1/2 bg-white dark:bg-[#1f1f1f] p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 min-h-[100%]"
      >
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          ✉️ Contact Us
        </h3>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* 🧑 Name Input */}
          <div className="relative">
            <FaUser className="absolute left-4 top-3 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white py-3 pl-12 pr-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* 📧 Email Input */}
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-3 text-gray-400 dark:text-gray-500" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white py-3 pl-12 pr-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* 🔽 Inquiry Type Dropdown */}
          <Select
            options={inquiryOptions}
            placeholder="Select Inquiry Type"
            onChange={handleSelectChange}
            className="dark:bg-gray-900 text-gray-900 dark:text-[#1f1f1f]"
          />

          {/* ✍️ Message Input */}
          <div className="relative">
            <FaPencilAlt className="absolute left-4 top-3 text-gray-400 dark:text-gray-500" />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="4"
              className="w-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white py-3 pl-12 pr-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              required
            ></textarea>
          </div>

          {/* 📂 File Upload */}
          <div className="relative">
            <FaFileUpload className="absolute left-4 top-3 text-gray-400 dark:text-gray-500" />
            <input
              type="file"
              onChange={handleFileUpload}
              className="w-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white py-3 pl-12 pr-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 🔐 reCAPTCHA */}
          <div className="flex justify-center">
            <ReCAPTCHA sitekey="YOUR_RECAPTCHA_SITE_KEY" />
          </div>

          {/* 🚀 Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg transition flex items-center justify-center"
          >
            <FaPaperPlane className="mr-2" /> Send Message
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ContactForm;
