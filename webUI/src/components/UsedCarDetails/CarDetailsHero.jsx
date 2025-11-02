import React, { useEffect, useState } from "react";
import ImageGallery from "./ImageGallery";
import DealerInfo from "./DealerInfo";
import VehicleDetails from "./VehicleDetails";
import InsuranceQuote from "./InsuranceQuote";
import FinanceOffer from "./FinanceOffer";
import SimilarListings from "./SimilarListings";

export default function CarDetailsHero({ car, dealer }) {
  const [similarListings, setSimilarListings] = useState([]);
  const [loadingSimilar, setLoadingSimilar] = useState(true);
  const BASE_URL = "http://127.0.0.1:8000/vehicles/listings";

  const formattedPrice =
    car.price && !isNaN(car.price)
      ? `KES ${car.price.toLocaleString()}`
      : "Price on Request";

  // ✅ Fetch Similar Listings based on car slug
  useEffect(() => {
    if (!car?.slug) return;

    const fetchSimilarListings = async () => {
      setLoadingSimilar(true);
      try {
        const res = await fetch(`${BASE_URL}/${car.slug}/similar-listings/`);
        if (!res.ok) throw new Error("Failed to fetch similar listings");
        const data = await res.json();

        // ✅ Normalize listings for Card component
        const normalized = (data || []).map((item) => ({
          id: item.id,
          slug: item.slug,
          title: item.title,
          make: item.make,
          model: item.model,
          year: item.year,
          price: parseFloat(item.price || 0),
          mileage: item.mileage,
          transmission: item.transmission,
          fuel_type: item.fuel_type,
          location: item.location,
          image:
            item.images && item.images.length > 0
              ? item.images[0].image
              : "/placeholder-car.jpg",
        }));

        setSimilarListings(normalized.slice(0, 8)); // limit to 8
      } catch (err) {
        console.error("Error fetching similar listings:", err);
      } finally {
        setLoadingSimilar(false);
      }
    };

    fetchSimilarListings();
  }, [car?.slug]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 lg:py-16 mt-20">
      {/* ✅ Car Title */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-color)] tracking-tight">
          {car.year} {car.make} {car.model}
        </h1>
        {car.trim && (
          <p className="text-lg text-[var(--muted-text)] mt-1">{car.trim}</p>
        )}
        <p className="text-sm text-[var(--muted-text)] mt-2">
          {car.location || "Location Unknown"}
        </p>
      </div>

      {/* ✅ Main Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-x-8 gap-y-16">
        {/* LEFT SECTION */}
        <div className="xl:col-span-8 flex flex-col gap-10">
          <ImageGallery
            mainImage={car.mainImage}
            images={car.images}
            make={car.make}
            model={car.model}
          />

          {/* Dealer Info (Mobile) */}
          <div className="block xl:hidden">
            {dealer && <DealerInfo dealer={dealer} />}
          </div>

          {/* ✅ Price Section */}
          <div>
            <p className="text-sm text-[var(--muted-text)] mb-1">
              Deals
              <span className="text-[var(--accent-color)] font-bold">&</span>
              Wheels Cash Offer
            </p>
            <p className="text-3xl md:text-4xl font-bold text-[var(--accent-color)] mb-3">
              {formattedPrice}
            </p>
            <p className="text-sm text-[var(--muted-text)] mb-8">
              This special offer is for a limited time only.
            </p>
            <hr className="border-[var(--border-color)]" />
          </div>

          {/* Finance Offer */}
          {car.price > 0 && <FinanceOffer price={car.price} />}

          {/* Vehicle Details */}
          <VehicleDetails car={car} />

          {/* Description */}
          {car.description && (
            <div>
              <h3 className="text-xl font-semibold mb-2">Description</h3>
              <p className="text-[var(--muted-text)] leading-relaxed">
                {car.description}
              </p>
            </div>
          )}

          {/* Insurance Quote */}
          <InsuranceQuote />
        </div>

        {/* RIGHT SECTION */}
        <div className="xl:col-span-4 hidden xl:flex flex-col gap-6">
          <div className="sticky top-30 bg-[var(--surface-color)] rounded-2xl p-6 shadow-lg border border-[var(--border-color)]">
            {dealer && <DealerInfo dealer={dealer} />}
          </div>
        </div>
      </div>

      {/* ✅ Similar Listings Section */}
      <div className="mt-24">
        <h2 className="text-2xl font-bold text-[var(--text-color)] mb-10 text-center">
          Similar Listings You May Like
        </h2>

        {loadingSimilar ? (
          <p className="text-center text-[var(--muted-text)] py-6">
            Loading similar listings...
          </p>
        ) : similarListings.length > 0 ? (
          <SimilarListings listings={similarListings} />
        ) : (
          <p className="text-center text-[var(--muted-text)] py-6">
            No similar listings available right now.
          </p>
        )}
      </div>
    </div>
  );
}