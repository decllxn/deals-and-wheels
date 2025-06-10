import { useEffect, useRef } from "react";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ImageModal = ({ images, currentIndex, setCurrentIndex, closeModal }) => {
  const modalRef = useRef(null);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeModal();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  const prevImage = () => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextImage = () => setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  // Touch gestures for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e) => (touchStartX = e.changedTouches[0].screenX);
  const handleTouchEnd = (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) nextImage();
    if (touchEndX - touchStartX > 50) prevImage();
  };

  return (
    <div
      className="fixed inset-0 bg-[#1f1f1f] bg-opacity-80 backdrop-blur-lg flex justify-center items-center z-50"
      onClick={(e) => e.target === modalRef.current && closeModal()}
      ref={modalRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close Button */}
      <button className="absolute top-6 right-6 bg-black bg-opacity-50 p-3 rounded-full text-white text-xl hover:scale-110 transition" onClick={closeModal}>
        <FaTimes />
      </button>

      {/* Navigation Buttons */}
      <button className="absolute left-6 bg-black bg-opacity-50 p-3 rounded-full text-white text-2xl hover:scale-110 transition" onClick={prevImage}>
        <FaChevronLeft />
      </button>

      {/* Image Display with Smooth Animation */}
      <div className="relative">
        <img
          src="/testcar.jpg"
          alt="Car"
          className="w-[90vw] md:w-[70vw] max-h-[85vh] object-contain rounded-lg shadow-2xl transition-transform duration-500"
        />

        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 px-3 py-1 rounded-full text-white text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      <button className="absolute right-6 bg-black bg-opacity-50 p-3 rounded-full text-white text-2xl hover:scale-110 transition" onClick={nextImage}>
        <FaChevronRight />
      </button>

      {/* Thumbnail Preview Bar */}
      <div className="absolute bottom-6 flex gap-3 bg-black bg-opacity-50 p-2 rounded-lg">
        {images.map((img, index) => (
          <img
            key={index}
            src="/testcar.jpg"
            alt="Thumbnail"
            className={`w-14 h-14 object-cover rounded-md cursor-pointer transition-transform duration-300 ${
              index === currentIndex ? "border-2 border-white scale-110" : "opacity-50 hover:opacity-100"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageModal;