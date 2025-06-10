import React from "react";

const ProductBrands = ({ brands }) => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
            Our Trusted Brands
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            We work with the best
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            We partner with leading brands in the automotive industry to bring you high-quality spare parts.
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
            {brands.map((brand) => (
              <div key={brand.id} className="col-span-1 flex justify-center py-8 px-8 bg-gray-100 rounded-lg">
                <img
                  className="max-h-12"
                  src={brand.imageUrl}
                  alt={brand.name}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductBrands;