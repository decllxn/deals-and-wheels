import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Upload } from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
    file: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/))
      newErrors.email = "Enter a valid email";
    if (!formData.topic) newErrors.topic = "Please select a topic";
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length === 0) {
      setTimeout(() => {
        setIsSubmitted(true);
      }, 700);
    }
  };

  return (
    <section
      className="relative py-28 px-6 overflow-hidden"
      style={{
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)",
      }}
    >
      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-4"
        >
          Send Us a <span style={{ color: "var(--accent-color)" }}>Message</span>
        </motion.h2>
        <p
          className="text-center text-lg mb-12"
          style={{ color: "var(--muted-text)" }}
        >
          Have a question or suggestion? We’d love to hear from you.
        </p>

        {/* Success Message */}
        <AnimatePresence>
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center py-20 text-center rounded-2xl bg-[var(--surface-color)]/70 border border-[var(--border-color)] backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
            >
              <CheckCircle2
                size={60}
                className="text-[var(--accent-color)] mb-4"
              />
              <h3 className="text-2xl font-semibold mb-2">
                Message Sent Successfully!
              </h3>
              <p style={{ color: "var(--muted-text)" }}>
                Our team will get back to you within 24 hours.
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="space-y-6 bg-[var(--surface-color)]/70 border border-[var(--border-color)] backdrop-blur-xl rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
            >
              {/* Name */}
              <div>
                <label className="block font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] transition-all duration-300"
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] transition-all duration-300"
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Topic */}
              <div>
                <label className="block font-medium mb-2">Subject / Topic</label>
                <select
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] transition-all duration-300"
                >
                  <option value="">Select a topic</option>
                  <option value="dealer">Dealer Inquiry</option>
                  <option value="partnership">Partnership</option>
                  <option value="support">Technical Support</option>
                  <option value="feedback">General Feedback</option>
                </select>
                {errors.topic && (
                  <p className="text-red-500 text-sm mt-1">{errors.topic}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block font-medium mb-2">Your Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] transition-all duration-300"
                  placeholder="Write your message here..."
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              {/* File Upload */}
              <div>
                <label className="block font-medium mb-2">Attach a File (optional)</label>
                <div className="flex items-center gap-3">
                  <label
                    htmlFor="file"
                    className="flex items-center gap-2 px-5 py-2 border border-[var(--border-color)] rounded-full cursor-pointer hover:bg-[var(--accent-color)] hover:text-white transition-all duration-300"
                  >
                    <Upload size={18} />
                    {formData.file ? formData.file.name : "Upload File"}
                  </label>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    onChange={handleChange}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full py-4 rounded-full text-lg font-semibold text-white flex items-center justify-center gap-2 shadow-lg"
                style={{
                  backgroundColor: "var(--accent-color)",
                  boxShadow: "0 6px 30px rgba(0,0,0,0.1)",
                }}
              >
                Send Message <Send size={20} />
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      {/* Ambient Glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[800px] h-[800px] rounded-full blur-[200px] opacity-10 -translate-x-1/2 -translate-y-1/2"
        style={{ backgroundColor: "var(--accent-color)" }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.12, 0.08] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </section>
  );
};

export default ContactForm;