import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const FeaturedAuctionSlider = () => {
  const [featuredAuctions, setFeaturedAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedAuctions = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/auctions/auctions/');
        if (!response.ok) throw new Error('Failed to fetch featured auctions');
        const data = await response.json();
        const featured = data.results.filter(item => item.featured).slice(0, 5);
        setFeaturedAuctions(featured);
      } catch (err) {
        setError(err.message);
        setFeaturedAuctions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedAuctions();
  }, []);

  const Wrapper = ({ children }) => (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-[var(--bg-color)] text-[var(--text-color)]">
      <h2 className="text-2xl font-semibold mb-4">Featured Auctions</h2>
      {children}
    </div>
  );

  if (loading) {
    return <Wrapper><p className="italic text-[var(--muted-text)]">Loading featured auctions...</p></Wrapper>;
  }

  if (error) {
    return <Wrapper><p className="text-red-500">Error loading featured auctions: {error}</p></Wrapper>;
  }

  if (featuredAuctions.length === 0) {
    return <Wrapper><p className="italic text-[var(--muted-text)]">No featured auctions available at the moment.</p></Wrapper>;
  }

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-[var(--bg-color)] text-[var(--text-color)]">
      <h2 className="text-2xl font-semibold mb-4">Featured Auctions</h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation={{
          prevEl: '.swiper-button-prev-auction',
          nextEl: '.swiper-button-next-auction',
          disabledClass: 'swiper-button-disabled',
        }}
        pagination={{ clickable: true, dynamicBullets: true }}
        className="relative w-full overflow-hidden rounded-lg shadow-md"
      >
        {featuredAuctions.map((auction) => (
          <SwiperSlide key={auction.id}>
            <div
              className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 bg-[var(--bg-color)] text-[var(--text-color)] rounded-lg overflow-hidden"
              style={{ minHeight: '350px' }}
            >
              {/* Left Image */}
              <div className="col-span-3 relative overflow-hidden rounded-l-lg h-[350px] sm:h-[300px] md:h-[450px]">
                {auction.images?.[0]?.image ? (
                  <img
                    src={auction.images[0].image}
                    alt={auction.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"
                    onClick={() => navigate(`/auction-detail/${auction.id}`)}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder-landscape.png";
                      e.target.style.objectFit = 'contain';
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-[var(--border-color)] flex items-center justify-center">
                    <img src="/placeholder-landscape.png" alt="Placeholder" className="max-w-full max-h-full object-contain" />
                  </div>
                )}
              </div>

              {/* Right Grid + Info */}
              <div className="col-span-2 flex flex-col justify-between h-[350px] sm:h-[300px] md:h-[450px]">
                <div className="grid grid-cols-2 grid-rows-2 gap-2 md:gap-3 rounded-r-lg overflow-hidden flex-grow">
                  {(auction.images || []).slice(1, 5).map((img, i) => (
                    <div
                      key={img.id || i}
                      className="relative overflow-hidden rounded-md cursor-pointer"
                      onClick={() => navigate(`/auction-detail/${auction.id}`)}
                    >
                      <img
                        src={img.image}
                        alt={`${auction.title} - ${i + 2}`}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/placeholder-small.png";
                          e.target.style.objectFit = 'contain';
                        }}
                      />
                    </div>
                  ))}

                  {auction.images?.length <= 1 &&
                    Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="relative overflow-hidden rounded-md bg-[var(--border-color)] flex items-center justify-center">
                        <img src="/placeholder-small.png" alt="Placeholder" className="max-w-full max-h-full object-contain" />
                      </div>
                    ))}
                </div>

                {/* Text & Button */}
                <div className="px-2 sm:px-3 md:px-4 pb-3 pt-4">
                  <h3 className="text-lg sm:text-xl font-semibold mb-1 line-clamp-1">{auction.title}</h3>
                  <p className="text-sm text-[var(--muted-text)]">{auction.make} {auction.model}</p>
                  <p className="text-xs text-[var(--muted-text)]">
                    Ends: {new Date(auction.auction_deadline).toLocaleDateString()} · {new Date(auction.auction_deadline).toLocaleTimeString()}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-3 inline-block bg-[var(--surface-color)] hover:bg-[var(--accent-color)] hover:text-white text-[var(--text-color)] border border-[var(--border-color)] py-1.5 px-4 text-sm rounded-md transition"
                    onClick={() => navigate(`/auction-detail/${auction.id}`)}
                  >
                    View Auction
                  </motion.button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Navigation Arrows - Unified Bottom-Right Positioning */}
        <div className="swiper-button-prev-auction
          absolute bottom-4 right-16 z-10 // Positioned bottom-right for all screens
          bg-[var(--surface-color)] bg-opacity-60 hover:bg-opacity-90
          text-[var(--text-color)] hover:text-[var(--accent-color)]
          shadow-md hover:shadow-lg transition-all duration-200
          rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center cursor-pointer backdrop-blur-md">
          <FaChevronLeft className="text-base sm:text-lg" />
        </div>
        <div className="swiper-button-next-auction
          absolute bottom-4 right-4 z-10 // Positioned bottom-right for all screens
          bg-[var(--surface-color)] bg-opacity-60 hover:bg-opacity-90
          text-[var(--text-color)] hover:text-[var(--accent-color)]
          shadow-md hover:shadow-lg transition-all duration-200
          rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center cursor-pointer backdrop-blur-md">
          <FaChevronRight className="text-base sm:text-lg" />
        </div>
      </Swiper>
    </div>
  );
};

export default FeaturedAuctionSlider;