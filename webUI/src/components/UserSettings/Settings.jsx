import { useState } from "react";
import { FaUser, FaPalette, FaBell, FaChevronDown, FaChevronUp } from "react-icons/fa";
import Switch from "react-switch"; // Import react-switch

const Settings = () => {
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState({
    dailyEmail: true,
    weeklyEmail: true,
    soundOnBid: false,
    mentionComments: { email: true, inSite: true },
    replyComments: { email: true, inSite: true },
    newAuctionFollowed: { email: true, inSite: true },
    newFollower: { email: true, inSite: true },
    auctionEnding: { email: true, inSite: true },
    outbidAlert: { email: true, inSite: true },
    newBidSeller: { email: true, inSite: true },
    newCommentSeller: { email: true, inSite: true },
  });
  const [expandedSections, setExpandedSections] = useState({
    account: true,
    appearance: true,
    notifications: true,
  });

  const toggleNotification = (key, type) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [type]: !prev[key][type],
      },
    }));
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 mt-10">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Settings</h2>

      {/* Account Settings */}
      <div className="border rounded-xl p-6 mb-6 shadow-md">
        <div className="flex justify-between items-center mb-4 cursor-pointer" onClick={() => toggleSection("account")}>
          <h3 className="flex items-center text-xl font-semibold">
            <FaUser className="mr-2 text-blue-500" /> Account
          </h3>
          {expandedSections.account ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {expandedSections.account && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Email:</span>
              <span className="text-gray-600">munene.declan1@gmail.com</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Password:</span>
              <span className="text-gray-600">Not Set</span>
              <button className="ml-3 text-blue-500 hover:underline">Set Password</button>
            </div>
            <div className="flex justify-between items-center">
              <span>Linked Accounts:</span>
              <button className="ml-3 text-blue-500 hover:underline">Manage Linked Accounts</button>
            </div>
            <div className="flex justify-between items-center">
              <span>Two-Factor Authentication:</span>
              <button className="ml-3 text-blue-500 hover:underline">Enable</button>
            </div>
          </div>
        )}
      </div>

      {/* Appearance Settings */}
      <div className="border rounded-xl p-6 mb-6 shadow-md">
        <div className="flex justify-between items-center mb-4 cursor-pointer" onClick={() => toggleSection("appearance")}>
          <h3 className="flex items-center text-xl font-semibold">
            <FaPalette className="mr-2 text-blue-500" /> Appearance
          </h3>
          {expandedSections.appearance ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {expandedSections.appearance && (
          <div className="space-y-4">
            <p className="text-gray-700 mb-3">Choose your preferred theme:</p>
            <div className="flex space-x-4">
              {["light", "dark", "auto"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setTheme(mode)}
                  className={`px-4 py-2 rounded-lg ${theme === mode ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} hover:bg-blue-100 transition-colors duration-200`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>
            <div className="flex justify-between items-center mt-4">
              <span>Font Size:</span>
              <select className="border rounded-md p-2">
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Notification Settings */}
      <div className="border rounded-xl p-6 mb-6 shadow-md">
        <div className="flex justify-between items-center mb-4 cursor-pointer" onClick={() => toggleSection("notifications")}>
          <h3 className="flex items-center text-xl font-semibold">
            <FaBell className="mr-2 text-blue-500" /> Notifications
          </h3>
          {expandedSections.notifications ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {expandedSections.notifications && (
          <div className="space-y-4">
            <p className="text-gray-700 mb-3">Manage your email and in-site notifications.</p>

            <div className="mb-4">
              <h4 className="text-lg font-semibold">Email Preferences</h4>
              <div className="flex justify-between items-center mt-2">
                <span>Daily Car Auctions Email</span>
                <Switch checked={notifications.dailyEmail} onChange={() => toggleNotification("dailyEmail", "email")} />
              </div>
              <div className="flex justify-between items-center mt-2">
                <span>Weekly Market Recap Email</span>
                <Switch checked={notifications.weeklyEmail} onChange={() => toggleNotification("weeklyEmail", "email")} />
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-lg font-semibold">General Notifications</h4>
              <div className="flex justify-between items-center mt-2">
                <span>Play sound when bids are placed</span>
                <Switch checked={notifications.soundOnBid} onChange={() => toggleNotification("soundOnBid", "email")} />
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-lg font-semibold">Auction Alerts</h4>
              <div className="flex justify-between items-center mt-2">
                <span>Outbid Alerts</span>
                <div className="flex space-x-2">
                  <Switch checked={notifications.outbidAlert.email} onChange={() => toggleNotification("outbidAlert", "email")} /><span>Email</span>
                  <Switch checked={notifications.outbidAlert.inSite} onChange={() => toggleNotification("outbidAlert", "inSite")} /><span>In-Site</span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span>1 Hour Before Auction Ends</span>
                <div className="flex space-x-2">
                  <Switch checked={notifications.auctionEnding.email} onChange={() => toggleNotification("auctionEnding", "email")} /><span>Email</span>
                  <Switch checked={notifications.auctionEnding.inSite} onChange={() => toggleNotification("auctionEnding", "inSite")} /><span>In-Site</span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-lg font-semibold">Seller Notifications</h4>
              <div className="flex justify-between items-center mt-2">
                <span>New Bids on My Auction</span>
                <div className="flex space-x-2">
                  <Switch checked={notifications.newBidSeller.email} onChange={() => toggleNotification("newBidSeller", "email")} /><span>Email</span>
                  <Switch checked={notifications.newBidSeller.inSite} onChange={() => toggleNotification("newBidSeller", "inSite")} /><span>In-Site</span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span>New Comments on My Auction</span>
                <div className="flex space-x-2">
                  <Switch checked={notifications.newCommentSeller.email} onChange={() => toggleNotification("newCommentSeller", "email")} /><span>Email</span>
                  <Switch checked={notifications.newCommentSeller.inSite} onChange={() => toggleNotification("newCommentSeller", "inSite")} /><span>In-Site</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;