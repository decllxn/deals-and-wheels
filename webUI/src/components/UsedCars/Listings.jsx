import React, { useEffect, useState } from "react";
import Card from "./Card";
import CarPagination from "./CarPagination";
import { fetchListings } from "../../api2";

const Listings = ({ filters = {}, filtersOpen, onCountChange }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 12;
  const [count, setCount] = useState(0);

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
        onCountChange?.(data?.count ?? 0);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Something went wrong. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadCars();
    return () => controller.abort();
  }, [JSON.stringify(filters), page]);

  const totalPages = Math.max(1, Math.ceil(count / pageSize));

  const gridClasses = `
    grid gap-6 mt-6
    grid-cols-1
    sm:grid-cols-2
    md:grid-cols-2
    ${filtersOpen ? "lg:grid-cols-2 xl:grid-cols-3" : "lg:grid-cols-3 xl:grid-cols-4"}
  `;

  if (loading) {
    return (
      <div className={gridClasses}>
        {Array.from({ length: pageSize }).map((_, i) => (
          <div key={i} className="h-64 rounded-lg bg-gray-200 animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 mt-6">{error}</p>;
  }

  if (!cars.length) {
    return (
      <p className="text-center text-gray-500 mt-6 text-lg">
        No cars match your filters.
      </p>
    );
  }

  return (
    <>
      <div className={`${gridClasses} min-w-0`}>
        {cars.map((car) => (
          <Card key={car.id} car={car} />
        ))}
      </div>

      <div className="mt-8">
        <CarPagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </>
  );
};

export default Listings;
