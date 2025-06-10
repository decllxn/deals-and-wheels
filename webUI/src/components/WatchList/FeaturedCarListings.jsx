import FeaturedCarCard from "./FeaturedCarCard";

const FeaturedCarListings = () => {
  const featuredCars = [
    {
      id: 1,
      name: "2022 Toyota Land Cruiser",
      price: 12500000,
      image: "/testcar.jpg",
      isFeatured: true,
      isHotDeal: true,
    },
    {
      id: 2,
      name: "2023 BMW X5",
      price: 9800000,
      image: "https://source.unsplash.com/400x300/?bmw,suv",
      isFeatured: true,
      isHotDeal: false,
    },
    {
      id: 3,
      name: "2021 Mercedes-Benz GLE",
      price: 11000000,
      image: "https://source.unsplash.com/400x300/?mercedes,suv",
      isFeatured: true,
      isHotDeal: false,
    },
    {
      id: 4,
      name: "2020 Audi Q7",
      price: 7500000,
      image: "https://source.unsplash.com/400x300/?audi,suv",
      isFeatured: true,
      isHotDeal: true,
    },
  ];

  return (
    <section className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Featured Cars for Sale</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {featuredCars.map((car) => (
          <FeaturedCarCard key={car.id} car={car} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedCarListings;