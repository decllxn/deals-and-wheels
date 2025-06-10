import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
  fetchListings,
  fetchFeaturedListings,
  fetchNewListings,
  fetchLowestPriceListings,
  fetchHighestPriceListings,
  fetchLowestMileageListings,
} from "../../api2";
import ListingCard from "./ListingCard"; // Assuming you created the CarListingCard component

const CarsForSaleGrid = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { filterType } = useParams();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const loadListings = async () => {
      setLoading(true);
      setError(null);
      let data;

      try {
        switch (filterType) {
          case 'featured':
            data = await fetchFeaturedListings(searchParams.get('page'), searchParams.get('page_size'));
            break;
          case 'new-listings':
            data = await fetchNewListings(searchParams.get('page'), searchParams.get('page_size'));
            break;
          case 'lowest-price':
            data = await fetchLowestPriceListings(searchParams.get('page'), searchParams.get('page_size'));
            break;
          case 'highest-price':
            data = await fetchHighestPriceListings(searchParams.get('page'), searchParams.get('page_size'));
            break;
          case 'lowest-mileage':
            data = await fetchLowestMileageListings(searchParams.get('page'), searchParams.get('page_size'));
            break;
          default:
            const query = searchParams.get("search") || "";
            const params = {};
            searchParams.forEach((value, key) => {
              if (key !== "search") {
                params[key] = value;
              }
            });
            data = await fetchListings(query, params, searchParams.get('page'), searchParams.get('page_size'));
            break;
        }
        setListings(data.results || data);
      } catch (err) {
        setError(err.message || "Failed to fetch listings.");
      } finally {
        setLoading(false);
      }
    };

    loadListings();
  }, [filterType, searchParams]);

  if (loading) {
    return <div className="max-w-[1600px] mx-auto px-6 py-10">Loading cars for sale...</div>;
  }

  if (error) {
    return <div className="max-w-[1600px] mx-auto px-6 py-10 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-10 bg-[var(--bg-color)] text-[var(--text-color)]">
      <h2 className="text-3xl font-bold text-[var(--text-color)] mb-6">
        {filterType
          ? filterType.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
          : 'Cars For Sale'}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
        {listings.length === 0 && !loading && <p>No cars for sale found matching your criteria.</p>}
      </div>
    </div>
  );
};

export default CarsForSaleGrid;