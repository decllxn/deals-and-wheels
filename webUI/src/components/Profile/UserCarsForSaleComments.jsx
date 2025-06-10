import { FaCar, FaComment, FaLink, FaClock, FaUserCircle } from "react-icons/fa";

const UserCarsForSaleComments = () => {
  const userComments = [
    {
      commentId: 1,
      carImage: "/car1.jpg", // Replace with car image URL
      carName: "Toyota Camry 2018",
      listingDetailsLink: "#", // Listing link
      listingTitle: "2018 Toyota Camry - $18,000",
      listingDescription: "Reliable and well-maintained Camry with low mileage.",
      commentDate: "2025-04-02",
      comment: "Is this car still available? I'm very interested.",
    },
    {
      commentId: 2,
      carImage: "/car2.jpg", // Replace with car image URL
      carName: "Honda Civic 2019",
      listingDetailsLink: "#", // Listing link
      listingTitle: "2019 Honda Civic - $20,000",
      listingDescription: "Great condition Civic with all the latest features.",
      commentDate: "2025-04-01",
      comment: "What's the mileage on this car? And are you the original owner?",
    },
    {
      commentId: 3,
      carImage: "/car3.jpg", // Replace with car image URL
      carName: "Nissan Rogue 2020",
      listingDetailsLink: "#", // Listing link
      listingTitle: "2020 Nissan Rogue - $25,000",
      listingDescription: "Spacious and comfortable SUV, perfect for families.",
      commentDate: "2025-03-30",
      comment: "Does this Rogue have a sunroof? And can I schedule a test drive?",
    },
  ];

  return (
    <section className="px-6 py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-8">My Cars For Sale Comments</h2>

        <div className="space-y-6">
          {userComments.map((comment) => (
            <div key={comment.commentId} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              {/* Listing Car Image & Info */}
              <div className="flex space-x-4 mb-4">
                <img
                  src={comment.carImage}
                  alt={comment.carName}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <a
                    href={comment.listingDetailsLink}
                    className="text-2xl font-semibold text-blue-600 hover:underline"
                  >
                    {comment.listingTitle}
                  </a>
                  <p className="text-sm text-gray-600 mt-2">{comment.listingDescription}</p>
                </div>
              </div>

              {/* Comment Content */}
              <div className="border-t border-gray-300 pt-4">
                <div className="flex items-center mb-4">
                  <FaUserCircle className="text-gray-500 mr-2" />
                  <p className="text-sm text-gray-600">{`Commented on: ${new Date(comment.commentDate).toLocaleDateString()}`}</p>
                </div>
                <p className="text-lg text-gray-800">{comment.comment}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4 pt-4">
                <a
                  href={comment.listingDetailsLink}
                  className="flex items-center text-blue-500 hover:text-blue-600"
                >
                  <FaLink className="mr-2" />
                  View Listing Details
                </a>
                <button className="flex items-center text-blue-500 hover:text-blue-600">
                  <FaComment className="mr-2" />
                  Reply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserCarsForSaleComments;