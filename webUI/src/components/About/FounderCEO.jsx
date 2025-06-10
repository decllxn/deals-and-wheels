import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

const FounderCEO = () => {
  return (
    <section className="w-full bg-white py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Founder Image */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative w-full h-[450px] rounded-xl overflow-hidden shadow-2xl"
        >
          <img
            src="/CEO.jpg" // Replace with your founder's image
            alt="Founder & CEO"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/40"></div>
        </motion.div>

        {/* Founder Text */}
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-800"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Meet the Founder & C.E.O
          </h2>

          <p className="text-lg md:text-xl font-light leading-relaxed mb-6 text-gray-700">
            At the heart of <span className="font-semibold">Deals & Wheels</span> is a vision shaped
            by relentless passion, unwavering integrity, and bold innovation. Our founder brings years
            of experience in the automotive and tech space — transforming an idea into a revolutionary platform.
          </p>

          <div className="flex items-start gap-3">
            <FaQuoteLeft className="text-2xl text-blue-600 mt-1" />
            <p className="italic text-md text-gray-600">
              "My mission is simple — make car buying and selling seamless, secure, and empowering for everyone.
              We're not just building a platform; we're building a legacy of trust."
            </p>
          </div>

          <div className="mt-6">
            <p className="font-semibold text-lg text-black">— [Founder’s Name]</p>
            <p className="text-sm text-gray-500">Founder & C.E.O, Deals & Wheels</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderCEO;
