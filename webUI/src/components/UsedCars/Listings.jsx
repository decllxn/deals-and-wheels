import React, { useEffect, useState } from "react";
import Card from "./Card";
import CarPagination from "./CarPagination";
import { fetchListings } from "../../api2";

const Listings = ({ filters = {}, filtersOpen, onCountChange }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(12);
  const [count, setCount] = useState(0);

  // ✅ Reset to page 1 whenever filters change
  useEffect(() => {
    setPage(1);
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    const controller = new AbortController();

    const loadCars = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await fetchListings(
          "",
          { ...filters, ordering: "-created_at" },
          page,
          pageSize,
          controller.signal
        );

        setCars(data?.results ?? []);
        setCount(data?.count ?? 0);

        // ✅ Inform parent of count
        if (onCountChange) onCountChange(data?.count ?? 0);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Failed to fetch used cars", err);
          setError("Something went wrong. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadCars();
    return () => controller.abort();
  }, [JSON.stringify(filters), page, pageSize]);

  const totalPages = Math.ceil(count / pageSize);

  // ✅ Adjust columns based on sidebar open/closed
  const gridCols = filtersOpen
    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  if (loading) {
    return (
      <div className={`grid gap-6 mt-6 ${gridCols}`}>
        {Array.from({ length: pageSize }).map((_, i) => (
          <div key={i} className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 mt-6 font-medium">{error}</p>;
  }

  if (!cars.length) {
    return (
      <p className="text-center text-gray-500 mt-6 text-lg">
        No cars match your filters. Please adjust your search criteria.
      </p>
    );
  }

  return (
    <>
      <div className={`grid gap-6 mt-6 ${gridCols}`}>
        {cars.map((car) => (
          <Card key={car.id} car={car} />
        ))}
      </div>

      <CarPagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </>
  );
};

export default Listings;