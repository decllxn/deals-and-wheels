import React, { useState, useEffect } from "react";
import { FaSearchPlus, FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

const CarImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]?.image || "/placeholder-landscape.png");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768); // Adjust breakpoint as needed

  useEffect(() => {
    if (images && images.length > 0) {
      setSelectedImage(images[0].image);
    }
  }, [images]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768); // Adjust breakpoint as needed
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      const handleKeyDown = (e) => {
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
        if (e.key === "Escape") setIsModalOpen(false);
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isModalOpen, images]);

  const openModal = (index) => {
    setModalIndex(index);
    setIsModalOpen(true);
  };

  const nextImage = () => {
    setModalIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setModalIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (isSmallScreen) {
    return (
      <div className="w-full my-6 rounded-md shadow-md overflow-hidden">
        <div className="relative group aspect-video">
          <img
            src={selectedImage}
            alt="Selected Car"
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-103"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/placeholder-landscape.png";
            }}
            onClick={() => images?.length > 0 && openModal(images.findIndex(img => img.image === selectedImage))}
            style={{ cursor: images?.length > 0 ? 'pointer' : 'default' }}
          />
          {images?.length > 0 && (
            <button
              onClick={() => openModal(images.findIndex(img => img.image === selectedImage))}
              className="absolute top-2 right-2 bg-black bg-opacity-50 p-2 transition hover:bg-opacity-80 rounded-md"
            >
              <FaSearchPlus className="text-white text-lg" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full my-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-1"> {/* Very small gap */}
        {/* Main Image */}
        <div className="md:col-span-9 relative group overflow-hidden rounded-md shadow-md aspect-video"> {/* Added aspect-video */}
          <img
            src={selectedImage}
            alt="Selected Car"
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-103"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/placeholder-landscape.png";
            }}
          />
          {images?.length > 0 && (
            <button
              onClick={() => openModal(images.findIndex(img => img.image === selectedImage))}
              className="absolute top-2 right-2 bg-black bg-opacity-50 p-2 transition hover:bg-opacity-80 rounded-md"
            >
              <FaSearchPlus className="text-white text-lg" />
            </button>
          )}
        </div>

        {/* Thumbnails */}
        <div className="md:col-span-3 grid grid-cols-2 grid-rows-4 gap-1 overflow-hidden rounded-md"> {/* 2 columns, 4 rows */}
          {images?.slice(0, 7).map((img, index) => (
            <div
              key={img.id}
              className={`relative overflow-hidden cursor-pointer transition-opacity duration-150 aspect-square ${
                selectedImage === img.image ? "opacity-100 shadow-md z-10" : "opacity-70 hover:opacity-100"
              }`}
              onClick={() => setSelectedImage(img.image)}
            >
              <img
                src={img.image}
                alt={`Thumbnail ${index}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/placeholder-small.png";
                }}
              />
              {selectedImage === img.image && (
                <div className="absolute inset-0 border-2 border-blue-500 rounded-md pointer-events-none"></div>
              )}
            </div>
          ))}
          {images?.length > 7 && (
            <div
              onClick={() => openModal(0)}
              className="relative cursor-pointer flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-60 text-white rounded-md col-span-2 row-span-1"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
              <span className="absolute text-sm font-semibold z-10">
                View All ({images.length})
              </span>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && images?.length > 0 && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 transition-opacity"
          onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}
        >
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 text-white text-3xl hover:scale-110 transition"
          >
            <FaTimes />
          </button>
          <button
            onClick={prevImage}
            className="absolute left-4 text-white text-3xl hover:scale-110 transition"
          >
            <FaChevronLeft />
          </button>
          <div className="max-h-[95vh] max-w-[95vw] relative"> {/* Container for better fitting */}
            <img
              src={images[modalIndex]?.image}
              alt="Car Image"
              className="w-full h-full object-contain shadow-xl transition-transform duration-200 scale-100"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/placeholder-large.png";
              }}
            />
          </div>
          <button
            onClick={nextImage}
            className="absolute right-4 text-white text-3xl hover:scale-110 transition"
          >
            <FaChevronRight />
          </button>
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-sm font-medium">
            {modalIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default CarImageGallery;