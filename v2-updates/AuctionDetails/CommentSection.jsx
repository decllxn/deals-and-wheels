import React, { useState } from "react";
import { MessageSquare, Heart, Eye, AtSign, ArrowUpRightFromSquare, Flag } from "lucide-react";

const CommentSection = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState("");
  const [filter, setFilter] = useState("recent");

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment({
        user: "You",
        profilePic: null,
        text: newComment,
        likes: 0,
        views: 0,
        replies: [],
        timestamp: new Date().toISOString(),
      });
      setNewComment("");
    }
  };

  const filteredComments = () => {
    let sortedComments = [...comments];
    switch (filter) {
      case "recent":
        return sortedComments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      case "seller":
        return sortedComments.filter((comment) => comment.isSellerComment);
      case "views":
        return sortedComments.sort((a, b) => b.views - a.views);
      case "likes":
        return sortedComments.sort((a, b) => b.likes - a.likes);
      default:
        return sortedComments;
    }
  };

  const ProfileIcon = ({ profilePic, className }) => {
    return (
      <div className={`w-10 h-10 rounded-full overflow-hidden flex items-center justify-center ${className}`}>
        {profilePic ? (
          <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <i className="ri-user-line text-2xl text-gray-500" />
        )}
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto my-8 sm:my-16 p-4 sm:p-8 rounded-2xl shadow-lg border border-gray-200 bg-white">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">Comments & Bids</h2>
      <div className="mb-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add your comment..."
          className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
          rows="3"
        />
        <button
          onClick={handleAddComment}
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-300 text-sm"
        >
          Post Comment
        </button>
      </div>

      <div className="flex flex-wrap space-x-2 sm:space-x-4 mb-4 sm:mb-6">
        <button
          onClick={() => setFilter("recent")}
          className={`px-2 py-1 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm ${filter === "recent" ? "bg-gray-100" : "hover:bg-gray-50"} whitespace-nowrap`}
        >
          Most Recent
        </button>
        <button
          onClick={() => setFilter("seller")}
          className={`px-2 py-1 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm ${filter === "seller" ? "bg-gray-100" : "hover:bg-gray-50"} whitespace-nowrap`}
        >
          Seller Comments
        </button>
        <button
          onClick={() => setFilter("views")}
          className={`px-2 py-1 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm ${filter === "views" ? "bg-gray-100" : "hover:bg-gray-50"} whitespace-nowrap`}
        >
          Most Viewed
        </button>
        <button
          onClick={() => setFilter("likes")}
          className={`px-2 py-1 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm ${filter === "likes" ? "bg-gray-100" : "hover:bg-gray-50"} whitespace-nowrap`}
        >
          Most Liked
        </button>
      </div>

      <div>
        {filteredComments().map((comment) => (
          <div key={comment.id} className="mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row items-start space-x-0 sm:space-x-4">
              <ProfileIcon profilePic={comment.profilePic} className="w-10 h-10 mb-2 sm:mb-0" />
              <div className="w-full">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-x-2">
                  <span className="font-semibold text-sm">{comment.user}</span>
                  {comment.isSellerComment && (
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded whitespace-nowrap">Seller</span>
                  )}
                  <span className="text-gray-500 text-xs">{new Date(comment.timestamp).toLocaleDateString()}</span>
                </div>
                <p className="mt-1 text-sm">{comment.text}</p>
                <div className="flex flex-wrap items-center space-x-2 sm:space-x-4 mt-2 text-xs">
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-500">{comment.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-500">{comment.views}</span>
                  </div>
                  <button className="text-blue-600 flex items-center space-x-1">
                    <AtSign className="w-4 h-4" />
                    Reply
                  </button>
                  {comment.externalLink && (
                    <a href={comment.externalLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 flex items-center space-x-1">
                      <ArrowUpRightFromSquare className="w-4 h-4" />
                      Link
                    </a>
                  )}
                  <button className="text-red-600 flex items-center space-x-1">
                    <Flag className="w-4 h-4" />
                    Flag
                  </button>
                </div>
                {comment.replies && comment.replies.map((reply) => (
                  <div key={reply.id} className="ml-0 sm:ml-8 mt-4">
                    <div className="flex flex-col sm:flex-row items-start space-x-0 sm:space-x-4">
                      <ProfileIcon profilePic={reply.profilePic} className="w-8 h-8 mb-2 sm:mb-0" />
                      <div className="w-full">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-sm">{reply.user}</span>
                          <span className="text-gray-500 text-xs">{new Date(reply.timestamp).toLocaleDateString()}</span>
                        </div>
                        <p className="mt-1 text-sm">
                          <span className="font-semibold text-blue-600">@{comment.user}</span> {reply.text}
                        </p>
                        <div className="flex items-center space-x-4 mt-2 text-xs">
                          <div className="flex items-center space-x-1">
                            <Heart className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-500">{reply.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-500">{reply.views}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;