import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, XCircle } from "lucide-react";

const CarWalkaroundVideo = ({ videoUrl }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const openVideo = () => {
    setIsVideoOpen(true);
  };

  const closeVideo = () => {
    setIsVideoOpen(false);
  };

  return (
    <div className="max-w-3xl mx-auto my-16 p-8 rounded-2xl shadow-lg border border-gray-200 bg-white">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
          <PlayCircle className="w-6 h-6 mr-2 text-blue-600" />
          Walkaround Video
        </h2>
        {!isVideoOpen && (
          <button
            onClick={openVideo}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Play Video
          </button>
        )}
      </div>

      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative"
          >
            <button
              onClick={closeVideo}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors duration-300"
            >
              <XCircle className="w-8 h-8" />
            </button>
            <video
              src={videoUrl}
              controls
              className="w-full rounded-lg shadow-md"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CarWalkaroundVideo;