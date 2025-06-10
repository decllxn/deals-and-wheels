import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, User, CheckCircle } from "lucide-react";

const ScheduleInspectionFormModern = () => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    location: "",
    inspector: "",
    notes: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="bg-[--card] rounded-2xl shadow-md p-6 flex flex-col gap-4"
    >
      <h2 className="text-lg font-semibold text-[--text] flex items-center gap-2 mb-4">
        <Calendar className="text-[--accent]" size={20} /> Schedule Inspection
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div>
          <label htmlFor="date" className="block text-sm text-[--text-muted] mb-1">
            Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-2.5 text-[--text-muted]" size={16} />
            <input
              type="date"
              id="date"
              name="date"
              onChange={handleChange}
              className="bg-[--bg] border border-[--border] rounded-md p-2 pl-9 text-[--text] w-full focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label htmlFor="time" className="block text-sm text-[--text-muted] mb-1">
            Time
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-2.5 text-[--text-muted]" size={16} />
            <input
              type="time"
              id="time"
              name="time"
              onChange={handleChange}
              className="bg-[--bg] border border-[--border] rounded-md p-2 pl-9 text-[--text] w-full focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label htmlFor="location" className="block text-sm text-[--text-muted] mb-1">
            Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-2.5 text-[--text-muted]" size={16} />
            <input
              type="text"
              id="location"
              name="location"
              onChange={handleChange}
              className="bg-[--bg] border border-[--border] rounded-md p-2 pl-9 text-[--text] w-full focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label htmlFor="inspector" className="block text-sm text-[--text-muted] mb-1">
            Inspector
          </label>
          <div className="relative">
            <User className="absolute left-3 top-2.5 text-[--text-muted]" size={16} />
            <select
              id="inspector"
              name="inspector"
              onChange={handleChange}
              className="bg-[--bg] border border-[--border] rounded-md p-2 pl-9 text-[--text] w-full focus:outline-none"
            >
              <option value="">Select Inspector</option>
              <option value="john_doe">John Doe</option>
              <option value="jane_smith">Jane Smith</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="notes" className="block text-sm text-[--text-muted] mb-1">
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            rows="3"
            onChange={handleChange}
            className="bg-[--bg] border border-[--border] rounded-md p-2 text-[--text] w-full focus:outline-none"
          ></textarea>
        </div>
        <button
          type="submit"
          className={`bg-[--accent] hover:bg-[--accent-darker] text-white rounded-md py-2 font-semibold transition-colors ${
            isSubmitted && "bg-green-500 hover:bg-green-600"
          }`}
          disabled={isSubmitted}
        >
          {isSubmitted ? (
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="animate-pulse" size={20} /> Scheduled!
            </div>
          ) : (
            "Schedule Inspection"
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default ScheduleInspectionFormModern;