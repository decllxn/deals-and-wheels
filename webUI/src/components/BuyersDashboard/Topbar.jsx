import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaBell, FaUserCircle, FaCog, FaSignOutAlt, FaCheckCircle } from "react-icons/fa";

const Topbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const notificationRef = useRef(null);
  const userMenuRef = useRef(null);

  // Function to close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current && !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
      if (
        userMenuRef.current && !userMenuRef.current.contains(event.target)
      ) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white dark:bg-[#1f1f1f] shadow-md px-6 py-4 flex items-center justify-between relative">
      {/* 🔍 Search Bar */}
      <div className="relative flex items-center bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg w-full md:w-1/3">
        <FaSearch className="text-gray-500 dark:text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none px-2 w-full text-gray-700 dark:text-gray-300"
        />
      </div>

      {/* 🔔 Notifications & User Profile */}
      <div className="flex items-center space-x-6">
        {/* Notification Bell with Badge */}
        <div ref={notificationRef} className="relative">
          <div
            className="relative cursor-pointer"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <FaBell className="text-xl text-gray-700 dark:text-gray-300" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </div>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-50 transition-all duration-300 ease-in-out">
              <h4 className="text-gray-700 dark:text-gray-300 font-semibold mb-2">Notifications</h4>
              <ul className="space-y-3 max-h-60 overflow-y-auto">
                <li className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  <FaCheckCircle className="text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    🚗 Your auction just received a new bid!
                  </span>
                </li>
                <li className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  <FaCheckCircle className="text-blue-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    💰 Payment received for a sold vehicle.
                  </span>
                </li>
                <li className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  <FaCheckCircle className="text-yellow-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    🔧 Your vehicle listing has been approved.
                  </span>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div ref={userMenuRef} className="relative">
          <div
            className="relative flex items-center cursor-pointer"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <FaUserCircle className="text-2xl text-gray-700 dark:text-gray-300" />
            <span className="absolute bottom-0 right-0 bg-green-500 w-3 h-3 rounded-full border-2 border-white dark:border-gray-900"></span>
          </div>

          {/* User Dropdown Menu */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 transition-all duration-300 ease-in-out">
              <a
                href="/profile"
                className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Profile
              </a>
              <a
                href="/settings"
                className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Settings
              </a>
              <hr className="border-gray-200 dark:border-gray-700" />
              <button className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center">
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
