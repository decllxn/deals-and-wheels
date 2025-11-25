import React from "react";

export default function DealerImagesUploader({ images, onAdd, onRemove, onChange }) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3 text-[var(--accent-color)]">Images</h3>

      {/* Responsive grid layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {images.map((img, idx) => {
          let src = "";
          if (img instanceof File) {
            src = URL.createObjectURL(img);
          } else if (img && img.image) {
            src = img.image;
          }

          return (
            <div
              key={idx}
              className="relative border border-dashed border-gray-300 rounded-xl overflow-hidden h-28 sm:h-32 md:h-36 flex items-center justify-center bg-gray-50 hover:shadow-md transition-shadow"
            >
              {src ? (
                <img
                  src={src}
                  alt={`car-${idx}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-400 text-xs sm:text-sm text-center">No Image</div>
              )}

              {/* Remove Button */}
              <button
                type="button"
                onClick={() => onRemove(idx)}
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center shadow text-sm sm:text-base"
              >
                ×
              </button>

              {/* File Input Overlay */}
              <input
                type="file"
                name={idx.toString()}
                onChange={onChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          );
        })}

        {/* Add Image Card */}
        <div
          onClick={onAdd}
          className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl h-28 sm:h-32 md:h-36 cursor-pointer hover:bg-gray-100 transition-colors"
        >
          <span className="text-gray-400 text-sm sm:text-base font-medium text-center">
            + Add Image
          </span>
        </div>
      </div>
    </div>
  );
}