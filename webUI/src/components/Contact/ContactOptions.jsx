import React from "react";
import { FaPhone, FaEnvelope, FaComments, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const ContactOptions = () => {
  return (
    <div className="w-full max-w-5xl mx-auto mt-12 px-6">
      {/* Section Title */}
      <motion.h2 
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-[#1f1f1f] text-center"
      >
        📞 Get in Touch with Us
      </motion.h2>
      <p className="text-gray-600 dark:text-gray-400 text-center mt-2">
        Choose the best way to reach us. We're always here to help!
      </p>

      {/* Contact Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {/* 📞 Call Us */}
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          className="flex flex-col items-center p-6 bg-white dark:bg-[#1f1f1f] rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <FaPhone className="text-blue-600 dark:text-blue-400 text-3xl mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Call Us</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Speak directly with our team.</p>
          <a href="tel:+254712345678" className="mt-3 text-blue-600 dark:text-blue-400 font-medium hover:underline">
            +254 712 345 678
          </a>
        </motion.div>

        {/* 📧 Email Support */}
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          className="flex flex-col items-center p-6 bg-white dark:bg-[#1f1f1f] rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <FaEnvelope className="text-green-600 dark:text-green-400 text-3xl mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Email Us</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Send us your inquiries anytime.</p>
          <a href="mailto:support@dealsandwheels.com?subject=Customer Support Inquiry" className="mt-3 text-green-600 dark:text-green-400 font-medium hover:underline">
            support@dealsandwheels.com
          </a>
        </motion.div>

        {/* 💬 Live Chat */}
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          className="flex flex-col items-center p-6 bg-white dark:bg-[#1f1f1f] rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <FaComments className="text-purple-600 dark:text-purple-400 text-3xl mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Live Chat</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Chat with us in real-time.</p>
          <button className="mt-3 bg-purple-600 dark:bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600 transition">
            Start Chat
          </button>
        </motion.div>

        {/* 📍 Our Location (Google Maps) */}
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          className="flex flex-col items-center p-6 bg-white dark:bg-[#1f1f1f] rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <FaMapMarkerAlt className="text-red-600 dark:text-red-400 text-3xl mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Visit Us</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Come meet us in person.</p>
          <a 
            href="https://goo.gl/maps/example" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="mt-3 text-red-600 dark:text-red-400 font-medium hover:underline"
          >
            Open in Google Maps
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactOptions;