import { FaUsers } from "react-icons/fa";

const UserCommunities = () => {
  const userCommunities = [
    {
      id: 1,
      communityName: "Luxury Car Enthusiasts",
      communityImage: "/testcar.jpg", // Replace with actual community image URL
      communityLink: "#", // Link to the community
    },
    {
      id: 2,
      communityName: "Classic Car Club",
      communityImage: "/community2.jpg", // Replace with actual community image URL
      communityLink: "#", // Link to the community
    },
    {
      id: 3,
      communityName: "Electric Vehicle Revolution",
      communityImage: "/community3.jpg", // Replace with actual community image URL
      communityLink: "#", // Link to the community
    },
    {
      id: 4,
      communityName: "Off-road Adventures",
      communityImage: "/community4.jpg", // Replace with actual community image URL
      communityLink: "#", // Link to the community
    },
  ];

  return (
    <section className="px-6 py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-8">
          My Communities <FaUsers className="inline-block ml-2 text-blue-600" />
        </h2>

        {/* Communities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {userCommunities.map((community) => (
            <div
              key={community.id}
              className="relative group overflow-hidden rounded-lg shadow-lg"
            >
              <a href={community.communityLink}>
                <img
                  src={community.communityImage}
                  alt={community.communityName}
                  className="w-full h-64 object-cover transition-all duration-300 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent p-4 text-white">
                  <h3 className="text-xl font-semibold">{community.communityName}</h3>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserCommunities;