import React from "react";
import { motion } from "framer-motion";
import { Star, Quote, ShieldCheck } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote:
      "After joining Deals & Wheels, we sold 15 cars in just 2 months — all verified buyers.",
    dealer: "AutoMart Kenya",
    tag: "Verified Dealer",
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 2,
    quote:
      "The analytics and lead tools helped us understand our buyers better and close deals faster.",
    dealer: "Prime Autos",
    tag: "Verified Dealer",
    image:
      "https://images.unsplash.com/photo-1620641788421-7a1c342ea42a?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 3,
    quote:
      "Deals & Wheels gave us national visibility — our listings now attract serious buyers daily.",
    dealer: "Nairobi Motors",
    tag: "Verified Dealer",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 4,
    quote:
      "Our dealership grew 40% in inquiries within the first month — it’s a total game changer.",
    dealer: "Elite Auto Hub",
    tag: "Verified Dealer",
    image:
      "https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 5,
    quote:
      "Best platform we’ve used — easy uploads, verified buyers, and excellent support.",
    dealer: "Kisumu Cars",
    tag: "Verified Dealer",
    image:
      "https://images.unsplash.com/photo-1609921141835-9a6c4caaaf3a?auto=format&fit=crop&w=200&q=80",
  },
];

// Duplicate array for seamless loop
const scrollingTestimonials = [...testimonials, ...testimonials];

const DealerSuccessStories = () => {
  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)",
      }}
    >
      {/* Section Header */}
      <div className="max-w-4xl mx-auto text-center mb-16 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-5"
        >
          Dealer <span style={{ color: "var(--accent-color)" }}>Success</span>{" "}
          Stories
        </motion.h2>
        <p
          className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
          style={{ color: "var(--muted-text)" }}
        >
          Discover how{" "}
          <span style={{ color: "var(--accent-color)" }}>Deals & Wheels</span>{" "}
          is empowering trusted dealerships to scale their sales and visibility
          across Kenya.
        </p>
      </div>

      {/* Scrolling Testimonials */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 45,
            ease: "linear",
          }}
          style={{ width: "200%" }}
        >
          {scrollingTestimonials.map((item, index) => (
            <div
              key={index}
              className="w-[22%] min-w-[300px] md:min-w-[380px] flex-shrink-0 px-4"
            >
              <div
                className="h-full rounded-2xl border border-[var(--border-color)] 
                           bg-[var(--surface-color)]/70 backdrop-blur-xl 
                           shadow-[0_4px_20px_rgba(0,0,0,0.05)] 
                           p-7 flex flex-col justify-between transition-all duration-300"
              >
                {/* Top quote icon */}
                <Quote
                  size={30}
                  className="text-[var(--accent-color)] mb-3 opacity-70"
                />

                {/* Testimonial text */}
                <p className="text-[15px] leading-relaxed italic text-[var(--text-color)] opacity-90 mb-5">
                  “{item.quote}”
                </p>

                {/* Divider */}
                <div className="h-px bg-[var(--border-color)] mb-5 opacity-50" />

                {/* Dealer Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.dealer}
                      className="w-11 h-11 rounded-full object-cover border border-[var(--border-color)] shadow-sm"
                    />
                    <div>
                      <h4 className="font-semibold text-sm">{item.dealer}</h4>
                      <div className="flex items-center gap-1 text-xs text-[var(--muted-text)]">
                        <ShieldCheck
                          size={12}
                          className="text-[var(--accent-color)]"
                        />
                        <span>{item.tag}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[#f3c945]">
                    <Star size={14} className="fill-[#f3c945]" />
                    <span className="text-xs font-medium">5.0</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Footer Note */}
      <div
        className="text-center text-sm mt-12 px-6"
        style={{ color: "var(--muted-text)" }}
      >
        * Testimonials from verified dealerships using Deals & Wheels across
        Kenya.
      </div>

      {/* Edge Gradients */}
      <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-[var(--bg-color)] to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-[var(--bg-color)] to-transparent pointer-events-none" />
    </section>
  );
};

export default DealerSuccessStories;