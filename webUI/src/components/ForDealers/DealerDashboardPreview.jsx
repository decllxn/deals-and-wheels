import React from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  Car,
  MessageSquare,
  LayoutDashboard,
  LineChart,
} from "lucide-react";

const dashboardItems = [
  {
    id: 1,
    title: "Inventory Management",
    description:
      "Easily upload, edit, and organize your car listings — complete with photos, pricing, and verification tools.",
    image:
      "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=900&q=80",
    icon: <Car size={26} />,
  },
  {
    id: 2,
    title: "Analytics Overview",
    description:
      "Gain insights into your dealership’s performance with data on leads, views, and top-performing vehicles.",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=80",
    icon: <LineChart size={26} />,
  },
  {
    id: 3,
    title: "Leads & Messages",
    description:
      "Engage with verified buyers directly through the dashboard — real-time chats, inquiries, and notifications.",
    image:
      "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=900&q=80",
    icon: <MessageSquare size={26} />,
  },
];

const DealerDashboardPreview = () => {
  return (
    <section
      className="relative py-24 px-6 overflow-hidden"
      style={{
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)",
      }}
    >
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-5"
        >
          Dealer <span style={{ color: "var(--accent-color)" }}>Dashboard</span>{" "}
          Preview
        </motion.h2>
        <p
          className="text-lg md:text-xl max-w-2xl mx-auto"
          style={{ color: "var(--muted-text)" }}
        >
          Experience the power and simplicity of the{" "}
          <span style={{ color: "var(--accent-color)" }}>Deals & Wheels</span>{" "}
          Dealer Portal — built to help dealerships grow, track, and sell with
          confidence.
        </p>
      </div>

      {/* Dashboard Feature Grid */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        {dashboardItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: index * 0.2,
              type: "spring",
              stiffness: 80,
            }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden border border-[var(--border-color)] 
                       bg-[var(--surface-color)]/60 backdrop-blur-lg shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
          >
            {/* Dashboard Mockup */}
            <div className="relative">
              <motion.img
                src={item.image}
                alt={item.title}
                className="w-full h-56 object-cover"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.5 }}
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-color)]/90 via-[var(--bg-color)]/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col justify-between h-[220px]">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="p-2 rounded-xl"
                    style={{
                      backgroundColor: "var(--accent-color)",
                      color: "white",
                    }}
                  >
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--muted-text)" }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating Decorative Icons */}
      <motion.div
        className="absolute top-20 left-10 opacity-10"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <LayoutDashboard size={100} />
      </motion.div>
      <motion.div
        className="absolute bottom-16 right-10 opacity-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <BarChart3 size={90} />
      </motion.div>
    </section>
  );
};

export default DealerDashboardPreview;