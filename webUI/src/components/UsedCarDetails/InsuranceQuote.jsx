import React, { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InsuranceQuote() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isModalOpen]);

  const providers = [
    {
      name: "Jubilee Insurance",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/27/Jubilee_Insurance_Logo.svg/2560px-Jubilee_Insurance_Logo.svg.png",
      benefits: ["24/7 Roadside Assistance", "Windshield Cover", "Fast Claim Processing"]
    },
    {
      name: "Britam",
      logo: "https://upload.wikimedia.org/wikipedia/en/8/83/Britam_Logo.png",
      benefits: ["Cashless Garage Access", "Personal Accident Cover", "Dedicated Claims Team"]
    },
    {
      name: "APA Insurance",
      logo: "https://upload.wikimedia.org/wikipedia/en/1/12/APA_Insurance_Logo.png",
      benefits: ["Courtesy Car", "Theft Protection", "Quick Renewals"]
    },
    {
      name: "Madison Insurance",
      logo: "https://upload.wikimedia.org/wikipedia/en/1/12/APA_Insurance_Logo.png",
      benefits: ["Full Cover", "Theft Recovery", "Fast Claims"]
    }
  ];

  return (
    <div className="mt-16">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[var(--text-color)]">
        <ShieldCheck className="w-6 h-6 text-[var(--accent-color)]" />
        Get Free Insurance Quotes
      </h2>
      <p className="text-sm text-[var(--muted-text)] mb-6">
        Compare multiple insurers instantly and get the best deal for your car.
      </p>

      <button
        className="py-3 px-6 rounded-lg bg-[var(--accent-color)] text-white font-semibold shadow-md hover:bg-[var(--accent-hover)] transition"
        onClick={() => setIsModalOpen(true)}
      >
        Get a Quote
      </button>

      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Soft dimmed overlay */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-all"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
            />

            {/* Modal */}
            <motion.div
              className="fixed top-1/2 left-1/2 z-50 w-[90%] md:w-[600px] lg:w-[550px] max-h-[85vh] bg-[var(--surface-color)] p-8 rounded-2xl shadow-2xl overflow-y-auto no-scrollbar"
              initial={{ opacity: 0, y: "-50%", x: "-50%", scale: 0.92 }}
              animate={{ opacity: 1, y: "-50%", x: "-50%", scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: "spring", stiffness: 400, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-[var(--text-color)]">Insurance Providers</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 bg-[var(--highlight-color)] rounded-full"
                >
                  <X className="w-5 h-5 text-[var(--text-color)]" />
                </button>
              </div>

              {/* Providers list */}
              <div className="flex flex-col gap-5">
                {providers.map((provider, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-6 bg-[var(--surface-color)] p-5 rounded-xl shadow-md transition-all"
                  >
                    <div className="flex-shrink-0">
                      <img src={provider.logo} alt={provider.name} className="h-14 object-contain" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-[var(--text-color)] mb-2">{provider.name}</h4>
                      <ul className="text-sm text-[var(--muted-text)] list-disc list-inside space-y-1">
                        {provider.benefits.map((benefit, idx) => (
                          <li key={idx}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="hidden md:block">
                      <button className="py-2 px-4 rounded-lg bg-[var(--accent-color)] text-white font-semibold hover:bg-[var(--accent-hover)] transition">
                        Get Quote
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Call to Actions */}
              <div className="block md:hidden mt-6">
                <button className="w-full py-3 rounded-lg bg-[var(--accent-color)] text-white font-semibold hover:bg-[var(--accent-hover)] transition">
                  Request Quote
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}