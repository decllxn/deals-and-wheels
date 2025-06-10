import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCamera, FaSyncAlt, FaEye } from "react-icons/fa";

const CarShowcasePreview = () => {
  const [images, setImages] = useState([]);
  const [is360View, setIs360View] = useState(false);
  const [backgroundRemoved, setBackgroundRemoved] = useState(false);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imagePromises = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises).then((results) => {
      setImages(results);
    });
  };

  const handle360ViewToggle = () => {
    setIs360View(!is360View);
  };

  const handleBackgroundRemoval = () => {
    // Simulate background removal (replace with actual API call)
    setBackgroundRemoved(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
    >
      <motion.h2
        variants={itemVariants}
        className="text-3xl font-bold text-gray-900 mb-6 text-center"
      >
        Showcase Your Car in Style 🚗✨
      </motion.h2>

      <div className="mb-6">
        <label
          htmlFor="imageUpload"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors duration-300"
        >
          <FaCamera className="mr-2" />
          Upload Images
        </label>
        <input
          type="file"
          id="imageUpload"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image Preview */}
        <motion.div variants={itemVariants}>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Live Preview
          </h3>
          <div className="space-y-4">
            {images.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Car Preview ${index + 1}`}
                    className="rounded-lg shadow-md"
                  />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500">
                No images uploaded yet.
              </div>
            )}
          </div>
        </motion.div>

        {/* 360 View & Background Removal Controls */}
        <motion.div variants={itemVariants}>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Enhance Your Listing
          </h3>
          <div className="space-y-4">
            <button
              onClick={handle360ViewToggle}
              className={`flex items-center justify-center w-full px-4 py-3 rounded-lg ${
                is360View ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700"
              } hover:bg-gray-200 transition-colors duration-300`}
            >
              <FaSyncAlt className="mr-2" />
              {is360View ? "Disable 360° View" : "Enable 360° View"}
            </button>
            <button
              onClick={handleBackgroundRemoval}
              className={`flex items-center justify-center w-full px-4 py-3 rounded-lg ${
                backgroundRemoved ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700"
              } hover:bg-gray-200 transition-colors duration-300`}
            >
              <FaEye className="mr-2" />
              {backgroundRemoved ? "Background Removed" : "Remove Background"}
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CarShowcasePreview;