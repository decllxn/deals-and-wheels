import React from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, MapPin, Phone } from "lucide-react";

const contactInfo = [
  {
    icon: <Mail size={32} />,
    title: "Email Support",
    detail: "support@dealsandwheels.co.ke",
    description: "Reach out anytime and we’ll respond within 24 hours.",
  },
  {
    icon: <MessageSquare size={32} />,
    title: "Live Chat",
    detail: "WhatsApp & Dashboard Chat",
    description: "Get real-time assistance from our support specialists.",
  },
  {
    icon: <MapPin size={32} />,
    title: "Office Address",
    detail: "Nairobi, Kenya",
    description: "Visit us for partnerships or dealership onboarding.",
  },
  {
    icon: <Phone size={32} />,
    title: "Phone",
    detail: "+254 700 123 456",
    description: "Available on weekdays from 9:00 AM – 5:00 PM EAT.",
  },
];

const ContactInfoCards = () => {
  return (
    <section
      className="relative py-24 px-6 md:px-12 overflow-hidden"
      style={{
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)",
      }}
    >
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Get in{" "}
          <span style={{ color: "var(--accent-color)" }}>Touch</span>
        </motion.h2>
        <p
          className="text-lg max-w-2xl mx-auto"
          style={{ color: "var(--muted-text)" }}
        >
          Connect with our team through any of the channels below — we’re here to help you succeed.
        </p>
      </div>

      {/* Contact Cards Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {contactInfo.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="relative p-8 rounded-2xl bg-[var(--surface-color)]/70 border border-[var(--border-color)] 
                       shadow-[0_4px_20px_rgba(0,0,0,0.04)] backdrop-blur-lg 
                       transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
          >
            {/* Icon */}
            <div
              className="w-14 h-14 flex items-center justify-center rounded-full mb-6 mx-auto"
              style={{ backgroundColor: "var(--accent-color)", opacity: 0.9 }}
            >
              <div className="text-white">{item.icon}</div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>

            {/* Detail */}
            <p
              className="text-[var(--accent-color)] font-medium mb-2"
              style={{ wordBreak: "break-word" }}
            >
              {item.detail}
            </p>

            {/* Description */}
            <p
              className="text-[var(--muted-text)] text-sm leading-relaxed"
              style={{ maxWidth: "280px", margin: "0 auto" }}
            >
              {item.description}
            </p>

            {/* Subtle Accent Line */}
            <motion.div
              className="absolute bottom-0 left-0 w-full h-[2px]"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--accent-color), transparent)",
              }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        ))}
      </div>

      {/* Soft Glow Background Element */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[700px] h-[700px] rounded-full blur-[180px] opacity-10 -translate-x-1/2 -translate-y-1/2"
        style={{ backgroundColor: "var(--accent-color)" }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.12, 0.08] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </section>
  );
};

export default ContactInfoCards;