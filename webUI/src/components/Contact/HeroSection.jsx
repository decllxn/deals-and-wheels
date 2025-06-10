import React from 'react';

const HeroSection = () => {
  return (
    <div className="relative bg-cover bg-center h-[600px] flex items-center justify-center"
         style={{ backgroundImage: `url('/testcar.jpg')` }}> {/* Replace with your image path */}
      <div className="absolute inset-0 bg-black opacity-50 dark:opacity-70"></div> {/* Dark Overlay */}
      <div className="relative z-10 container mx-auto text-center px-4">
        <h1 className="text-5xl font-extrabold text-white mb-6 leading-tight">
          Let's Connect & Build Together
        </h1>
        <p className="text-xl text-gray-300 mb-10">
          We're here to understand your needs and provide tailored solutions. Reach out and let's start a conversation.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors text-lg">
            Get in Touch
          </button>
          <button className="bg-transparent border border-gray-300 hover:border-gray-100 text-white font-semibold py-3 px-8 rounded-lg transition-colors text-lg">
            Explore FAQ
          </button>
        </div>
        <div className="mt-8">
            <p className="text-sm text-gray-300">
                Or call us directly at: <a href="tel:+15551234567" className="text-blue-400 hover:underline">+1 (555) 123-4567</a>
            </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;