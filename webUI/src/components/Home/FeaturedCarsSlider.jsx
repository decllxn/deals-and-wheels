import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const FeaturedCarsSlider = () => {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedCars = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/vehicles/listings/');
        if (!response.ok) throw new Error('Failed to fetch featured cars');
        const data = await response.json();
        const featured = data.results.filter(item => item.is_featured).slice(0, 5);
        setFeaturedCars(featured);
      } catch (err) {
        setError(err.message);
        setFeaturedCars([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedCars();
  }, []);

  const Wrapper = ({ children }) => (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-[var(--bg-color)] text-[var(--text-color)]">
      <h2 className="text-3xl font-bold mb-6 tracking-tight">Featured Cars For Sale</h2>
      {children}
    </div>
  );

  if (loading) return <Wrapper><p className="italic text-[var(--muted-text)]">Loading featured cars...</p></Wrapper>;
  if (error) return <Wrapper><p className="text-red-500">Error loading featured cars: {error}</p></Wrapper>;
  if (featuredCars.length === 0) return <Wrapper><p className="italic text-[var(--muted-text)]">No featured cars available at the moment.</p></Wrapper>;

  return (
    <Wrapper>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        loop
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        navigation={{
          prevEl: '.swiper-button-prev-car',
          nextEl: '.swiper-button-next-car',
          disabledClass: 'swiper-button-disabled',
        }}
        pagination={{ clickable: true, dynamicBullets: true }}
        className="relative rounded-xl"
      >
        {featuredCars.map((car) => (
          <SwiperSlide key={car.id}>
            <div className="flex flex-col lg:flex-row gap-4 bg-[var(--bg-color)] rounded-xl overflow-hidden transition duration-300">
              
              {/* Left - Main Image */}
              <div
                className="w-full lg:w-[55%] h-[250px] sm:h-[300px] lg:h-[460px] cursor-pointer"
                onClick={() => navigate(`/car-detail/${car.id}`)}
              >
                <img
                  src={car.images?.[0]?.image || "/placeholder-landscape.png"}
                  alt={car.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder-landscape.png";
                    e.target.style.objectFit = 'contain';
                  }}
                />
              </div>

              {/* Right - Grid & Info */}
              <div className="w-full lg:w-[45%] flex flex-col justify-between">
                {/* Image Grid */}
                <div className="grid grid-cols-2 gap-2 mb-4 px-1 lg:px-0">
                  {(car.images || []).slice(1, 5).map((img, i) => (
                    <div
                      key={i}
                      className="h-24 sm:h-28 md:h-32 relative rounded overflow-hidden cursor-pointer"
                      onClick={() => navigate(`/car-detail/${car.id}`)}
                    >
                      <img
                        src={img.image}
                        alt={`${car.title} - ${i + 2}`}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/placeholder-small.png";
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Info */}
                <div className="px-2 md:px-0">
                  <h3 className="text-lg sm:text-xl font-semibold line-clamp-1">{car.title}</h3>
                  <p className="text-sm text-[var(--muted-text)]">{car.make} {car.model}</p>
                  <p className="text-xs text-[var(--muted-text)] mb-3">Year: {car.year}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[var(--accent-color)] text-white py-2 px-5 text-sm rounded-md transition-all hover:shadow-md"
                    onClick={() => navigate(`/car-detail/${car.id}`)}
                  >
                    View Details
                  </motion.button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Navigation Arrows */}
        <div className="swiper-button-prev-car absolute bottom-4 right-20 z-10 bg-[var(--bg-color)] hover:bg-[var(--accent-color)] text-[var(--text-color)] hover:text-white border border-[var(--border-color)] rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center cursor-pointer transition">
          <FaChevronLeft className="text-base sm:text-lg" />
        </div>
        <div className="swiper-button-next-car absolute bottom-4 right-4 z-10 bg-[var(--bg-color)] hover:bg-[var(--accent-color)] text-[var(--text-color)] hover:text-white border border-[var(--border-color)] rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center cursor-pointer transition">
          <FaChevronRight className="text-base sm:text-lg" />
        </div>
      </Swiper>
    </Wrapper>
  );
};

export default FeaturedCarsSlider;