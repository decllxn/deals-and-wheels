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

        // 🔑 After fetch, scroll back to filter section
        filterRef?.current?.scrollToTop?.();
      } catch (err) {
        console.error("Failed to fetch listings", err);
        setError("Something went wrong. Please try again later.");
        setListings([]);
      } finally {
        setLoading(false);
      }
    };

    loadListings();
  }, [filters, page, pageSize, filterRef]);

  const totalPages = Math.ceil(count / pageSize);

  // Loading Skeletons
  if (loading) {
    return (
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
        {Array.from({ length: pageSize }).map((_, i) => (
          <div key={i} className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
        ))}
      </div>
    );
  }

  // Error State
  if (error) {
    return <p className="text-center text-red-500 mt-6 font-medium">{error}</p>;
  }

  // Empty State
  if (!listings.length) {
    return (
      <p className="text-center text-gray-500 mt-6 text-lg">
        🚘 No cars found. Try adjusting your filters.
      </p>
    );
  }

  return (
    <>
      {/* Listings Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>

      {/* Pagination Component */}
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </>
  );
};

export default ListingGrid;