import React from 'react';
import ImageGallery from './ImageGallery';
import DealerInfo from './DealerInfo';
import VehicleDetails from './VehicleDetails';
import InsuranceQuote from './InsuranceQuote';
import FinanceOffer from './FinanceOffer';
import SimilarListings from './SimilarListings';  // <-- imported new component

export default function CarDetailsHero({ car, dealer, similarListings }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 lg:py-16 mt-20">

      {/* Car Title */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-color)] tracking-tight">
          {car.year} {car.make} {car.model}
        </h1>
        {car.trim && (
          <p className="text-lg text-[var(--muted-text)] mt-1">
            {car.trim}
          </p>
        )}
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-x-8 gap-y-16">

        {/* Left Section - 65% */}
        <div className="xl:col-span-8 flex flex-col gap-10">

          <ImageGallery
            mainImage={car.mainImage}
            images={car.images}
            make={car.make}
            model={car.model}
          />

          {/* Dealer Info for Mobile */}
          <div className="block xl:hidden">
            <DealerInfo dealer={dealer} />
          </div>

          {/* Pricing Section */}
          <div>
            <p className="text-sm text-[var(--muted-text)] mb-1">
              Deals<span className="text-[var(--accent-color)] font-bold">&</span>Wheels Cash Offer
            </p>
            <p className="text-3xl md:text-4xl font-bold text-[var(--accent-color)] mb-3">
              KES {car.price.toLocaleString()}
            </p>
            <p className="text-sm text-[var(--muted-text)] mb-8">
              This special offer is for a limited time.
            </p>
            <hr className="border-[var(--border-color)]" />
          </div>

          {/* Finance Offer */}
          <FinanceOffer price={car.price} />

          {/* Vehicle Details */}
          <VehicleDetails car={car} />

          {/* Insurance Quote */}
          <InsuranceQuote />
        </div>

        {/* Right Sticky Dealer Info - 35% */}
        <div className="xl:col-span-4 hidden xl:flex flex-col gap-6">
          <div className="sticky top-30 bg-[var(--surface-color)] rounded-2xl p-6 shadow-lg border border-[var(--border-color)]">
            <DealerInfo dealer={dealer} />
          </div>
        </div>

      </div>

      {/* Divider before Similar Listings */}
      <hr className="my-16 border-[var(--border-color)]" />

      {/* Similar Listings */}
      <SimilarListings listings={similarListings} />

      {/* Divider after Similar Listings */}
      <hr className="mt-16 border-[var(--border-color)]" />
    </div>
  );
}
