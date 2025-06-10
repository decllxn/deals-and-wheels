import { FaEdit, FaShareAlt, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaUserAlt } from "react-icons/fa";

const ProfileInfo = () => {
  return (
    <section className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg p-8 rounded-2xl shadow-lg max-w-4xl mx-auto space-y-6 mt-20 border border-gray-200">
      {/* Profile Header */}
      <div className="flex items-center space-x-6">
        {/* Profile Image */}
        <div className="relative">
          <img
            src="/profile-placeholder.jpg" // Replace with the dynamic profile image URL
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-lg"
          />
          <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer hover:bg-blue-600">
            <FaEdit className="text-white text-xl" />
          </div>
        </div>
        {/* Profile Info */}
        <div className="flex flex-col space-y-2">
          <h2 className="text-3xl font-semibold text-gray-800">John Doe</h2>
          <p className="text-lg text-gray-600">@johndoe</p>
          <p className="text-gray-500 text-sm">User Bio: Enthusiast car seller & buyer. Passionate about providing the best deals in the car auction world.</p>
          <div className="flex space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <FaUserAlt />
              <span>350 Followers</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaUserAlt />
              <span>280 Following</span>
            </div>
          </div>
        </div>
      </div>
      {/* Contact Information */}
      <div className="border-t border-gray-300 pt-4">
        <div className="flex items-center space-x-4 text-gray-600">
          <FaEnvelope />
          <span>johndoe@example.com</span>
        </div>
        <div className="flex items-center space-x-4 text-gray-600">
          <FaPhoneAlt />
          <span>+1 234 567 890</span>
        </div>
        <div className="flex items-center space-x-4 text-gray-600">
          <FaMapMarkerAlt />
          <span>New York, USA</span>
        </div>
      </div>
      {/* Actions */}
      <div className="flex justify-between items-center pt-4">
        {/* Edit Profile Button */}
        <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out">
          Edit Profile
        </button>
        {/* Share Profile Button */}
        <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-300 flex items-center space-x-2 transition duration-300 ease-in-out">
          <FaShareAlt />
          <span>Share Profile</span>
        </button>
      </div>
    </section>
  );
};

export default ProfileInfo;