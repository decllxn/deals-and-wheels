import React from "react";
import { FaWhatsapp, FaTwitter, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

const socialLinks = [
  { icon: <FaWhatsapp />, url: "https://wa.me/254712345678", color: "text-green-400", hover: "hover:bg-green-500", label: "WhatsApp" },
  { icon: <FaTwitter />, url: "https://twitter.com/dealsandwheels", color: "text-blue-400", hover: "hover:bg-blue-400", label: "Twitter" },
  { icon: <FaLinkedin />, url: "https://linkedin.com/company/dealsandwheels", color: "text-blue-600", hover: "hover:bg-blue-600", label: "LinkedIn" },
  { icon: <FaFacebook />, url: "https://facebook.com/dealsandwheels", color: "text-blue-500", hover: "hover:bg-blue-500", label: "Facebook" },
  { icon: <FaInstagram />, url: "https://instagram.com/dealsandwheels", color: "text-pink-500", hover: "hover:bg-pink-500", label: "Instagram" },
];

const SocialMediaLinks = () => {
  return (
    <div className="w-full mx-auto px-6 py-12 bg-[#1f1f1f] shadow-lg">
      {/* 🌟 Header */}
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-semibold text-white text-center mb-6"
      >
        Stay Connected With Us
      </motion.h2>

      {/* 🔗 Social Media Links */}
      <div className="flex justify-center space-x-6">
        {socialLinks.map((social, index) => (
          <motion.a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center justify-center w-12 h-12 rounded-full transition text-white ${social.color} ${social.hover} shadow-md`}
            title={social.label}
          >
            {social.icon}
          </motion.a>
        ))}
      </div>

      {/* 🟢 WhatsApp Direct Chat */}
      <div className="flex justify-center mt-8">
        <motion.a
          href="https://wa.me/254712345678?text=Hello!%20I'm%20interested%20in%20buying/selling%20a%20car."
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-3 bg-[#25D366] hover:bg-green-600 text-white font-medium py-3 px-6 rounded-full shadow-lg transition"
        >
          <FaWhatsapp className="text-xl" />
          <span>Chat with Us on WhatsApp</span>
        </motion.a>
      </div>
    </div>
  );
};

export default SocialMediaLinks;