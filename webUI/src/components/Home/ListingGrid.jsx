import React, { useEffect, useState } from "react";
import { fetchListings } from "../../api2";
import ListingCard from "./ListingCard";
import Pagination from "./Pagination";

const ListingGrid = ({ filters, filterRef }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(12);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const loadListings = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchListings("", {
          ...filters,
          page,
          page_size: pageSize,
        });
        setListings(data?.results ?? []);
        setCount(data?.count ?? 0);
        filterRef?.current?.scrollToTop?.();
      } catch (err) {
        console.error("Failed to fetch listings", err);
        setError("Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadListings();
  }, [filters, page, pageSize, filterRef]);

  const totalPages = Math.ceil(count / pageSize);

  // 🔄 Loading Skeleton
  if (loading) {
    return (
      <div className="grid gap-6 sm:gap-8 lg:gap-8 xl:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10 max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        {Array.from({ length: pageSize }).map((_, i) => (
          <div
            key={i}
            className="h-64 bg-[var(--surface-color)]/50 rounded-2xl animate-pulse shadow-md"
          ></div>
        ))}
      </div>
    );
  }

  // ❌ Error State
  if (error) {
    return (
      <p className="text-center text-red-500 mt-10 font-medium">{error}</p>
    );
  }

  // 🚫 Empty State
  if (!listings.length) {
    return (
      <div className="text-center text-[var(--muted-text)] mt-16 text-sm">
        🚘 No cars found. Try adjusting your filters.
      </div>
    );
  }

  // ✅ Main Grid
  return (
    <>
      <div
        className="
          mt-10
          grid
          gap-6 sm:gap-8 lg:gap-8 xl:gap-10
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-2
          lg:grid-cols-3 
          xl:grid-cols-4 
          2xl:grid-cols-4
          max-w-[1500px]
          mx-auto
          px-4 sm:px-6 lg:px-8
          transition-all
        "
      >
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </>
  );
};

export default ListingGrid;