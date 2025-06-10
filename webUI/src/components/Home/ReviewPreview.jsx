import React from "react";
import { FaStar, FaCar, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const reviews = [
  {
    id: 1,
    title: "2024 Tesla Model 3 Review",
    car: "Tesla Model 3",
    reviewer: "John D.",
    score: 9.2,
    image: "/testcar.jpg",
  },
  {
    id: 2,
    title: "2023 Toyota Supra - A True Icon",
    car: "Toyota Supra",
    reviewer: "Maria K.",
    score: 8.8,
    image: "/supra_review.jpg",
  },
  {
    id: 3,
    title: "Off-Road King: Ford Bronco Reviewed",
    car: "Ford Bronco",
    reviewer: "Elijah M.",
    score: 9.5,
    image: "/bronco_review.jpg",
  },
];

const ReviewPreview = () => {
  return (
    <section className="py-20" style={{ backgroundColor: "var(--bg-color)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: "var(--text-color)" }}>
          Deals<span className="text-red-600">&</span>Wheels Reviews
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <Link
              to={`/reviews/${review.id}`}
              key={review.id}
              className="bg-[#292929] border border-white/10 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:bg-[#333] transition-all duration-300 flex flex-col"
              style={{
                backgroundColor: "var(--surface-color)",
                borderColor: "var(--border-color)",
              }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={review.image}
                  alt={review.title}
                  className="w-full h-48 object-cover object-center transition-transform duration-500 transform hover:scale-105"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2" style={{ color: "var(--text-color)" }}>
                    {review.title}
                  </h3>
                  <p className="text-sm mb-1 flex items-center" style={{ color: "var(--muted-text)" }}>
                    <FaCar className="mr-2" style={{ color: "var(--accent-color)" }} /> {review.car}
                  </p>
                  <p className="text-sm flex items-center mb-4" style={{ color: "var(--muted-text)" }}>
                    <FaUserCircle className="mr-2" style={{ color: "var(--muted-text)" }} /> {review.reviewer}
                  </p>
                </div>
                <div className="mt-auto flex items-center justify-between pt-2 border-t" style={{ borderColor: "var(--border-color)" }}>
                  <span className="text-xs" style={{ color: "var(--muted-text)" }}>D&W Score:</span>
                  <span className="text-base font-bold flex items-center" style={{ color: "var(--accent-color)" }}>
                    <FaStar className="mr-1" style={{ color: "var(--highlight-color)" }} /> {review.score}/10
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* "Read More Reviews" Button */}
        <div className="flex justify-center mt-10">
          <Link
            to="/reviews"
            className="inline-block py-3 px-6 text-lg font-semibold rounded-lg transition-colors duration-300"
            style={{
              color: "var(--text-color)",
              backgroundColor: "var(--accent-color)",
              borderColor: "var(--accent-hover)",
            }}
          >
            Read More Reviews
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ReviewPreview;