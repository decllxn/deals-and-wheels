import { FaCar, FaComment, FaLink, FaClock, FaUserCircle } from "react-icons/fa";

const UserAuctionComments = () => {
  const userComments = [
    {
      commentId: 1,
      carImage: "/car1.jpg", // Replace with car image URL
      carName: "Chevrolet Camaro 2022",
      auctionDetailsLink: "#", // Auction link
      auctionTitle: "2022 Chevrolet Camaro - Starting at $30,000",
      auctionDescription: "A beautiful 2-door sports car with 10,000 miles. Only one owner.",
      commentDate: "2025-04-02",
      comment: "I think this is an amazing car! Can't wait to place my bid.",
    },
    {
      commentId: 2,
      carImage: "/car2.jpg", // Replace with car image URL
      carName: "BMW M3 2020",
      auctionDetailsLink: "#", // Auction link
      auctionTitle: "2020 BMW M3 - Starting at $40,000",
      auctionDescription: "A high-performance sedan with 20,000 miles. Pristine condition.",
      commentDate: "2025-04-01",
      comment: "The M3 is a legend! I’m definitely keeping an eye on this auction.",
    },
    {
      commentId: 3,
      carImage: "/car3.jpg", // Replace with car image URL
      carName: "Ford F-150 2021",
      auctionDetailsLink: "#", // Auction link
      auctionTitle: "2021 Ford F-150 - Starting at $35,000",
      auctionDescription: "A rugged pickup truck with 15,000 miles. Excellent for off-roading.",
      commentDate: "2025-03-30",
      comment: "I love the power of this truck. It’s a solid choice for anyone looking for a workhorse.",
    },
  ];

  return (
    <section className="px-6 py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-8">My Auction Comments</h2>

        <div className="space-y-6">
          {userComments.map((comment) => (
            <div key={comment.commentId} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              {/* Auction Car Image & Info */}
              <div className="flex space-x-4 mb-4">
                <img
                  src={comment.carImage}
                  alt={comment.carName}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <a
                    href={comment.auctionDetailsLink}
                    className="text-2xl font-semibold text-blue-600 hover:underline"
                  >
                    {comment.auctionTitle}
                  </a>
                  <p className="text-sm text-gray-600 mt-2">{comment.auctionDescription}</p>
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
                  href={comment.auctionDetailsLink}
                  className="flex items-center text-blue-500 hover:text-blue-600"
                >
                  <FaLink className="mr-2" />
                  View Auction Details
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

export default UserAuctionComments;