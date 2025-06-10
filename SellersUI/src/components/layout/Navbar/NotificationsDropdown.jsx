import { useState, useEffect, useRef } from "react";
import { Bell, CheckCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const notifications = [
  {
    id: 1,
    type: "info",
    title: "Server maintenance",
    description: "Scheduled maintenance at 10 PM tonight.",
    time: "10m ago",
  },
  {
    id: 2,
    type: "success",
    title: "Backup completed",
    description: "System backup was successful.",
    time: "1h ago",
  },
  {
    id: 3,
    type: "alert",
    title: "Security warning",
    description: "Suspicious login attempt detected.",
    time: "2h ago",
  },
];

export default function NotificationsDropdown({ theme }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const iconForType = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "alert":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Bell className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Icon */}
      <motion.button
        onClick={toggleDropdown}
        className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md cursor-pointer transition-colors duration-300 ${
          theme === "light" ? "bg-gray-300" : "bg-[#2a2a2a]"
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Bell className="w-6 h-6 text-white" />
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`absolute right-0 mt-2 w-80 max-w-sm rounded-lg overflow-hidden z-20 shadow-lg ${
              theme === "light" ? "bg-white" : "bg-[#1f1f1f]"
            }`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4">
              <div className="font-semibold text-[var(--text)] mb-2">
                Notifications
              </div>
              <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700 max-h-64 overflow-y-auto">
                {notifications.map((note) => (
                  <div key={note.id} className="flex items-start gap-2 py-2">
                    <div>{iconForType(note.type)}</div>
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium text-[var(--text)]">
                        {note.title}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {note.description}
                      </div>
                      <div className="text-[10px] text-gray-400 dark:text-gray-500">
                        {note.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-3 flex items-center justify-center space-x-2 py-2 text-sm text-[var(--accent)] hover:bg-[var(--accent-hover)] rounded-md transition-colors">
                <span>View All Notifications</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}