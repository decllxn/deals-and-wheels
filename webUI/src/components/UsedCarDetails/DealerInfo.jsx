import React from 'react';
import { Phone, MessageSquare, Star, MapPin, Car } from 'lucide-react';

export default function DealerInfo({ dealer }) {
  return (
    <div className="flex flex-col items-center text-center gap-5">

      <div className="w-24 h-24 rounded-full overflow-hidden border border-[var(--border-color)] flex-shrink-0">
        <img src={dealer.logo || 'https://via.placeholder.com/96'} alt={dealer.name} className="object-cover w-full h-full" />
      </div>

      <div>
        <h3 className="text-2xl font-bold text-[var(--text-color)] mb-1">{dealer.name}</h3>
        <p className="text-sm text-[var(--muted-text)] flex items-center justify-center gap-1">
          <MapPin className="w-4 h-4 text-[var(--muted-text)]" /> {dealer.location}
        </p>
        <p className="flex items-center justify-center text-sm text-yellow-500 gap-1 mt-2">
          <Star className="w-4 h-4 fill-yellow-500 stroke-yellow-500" /> {dealer.rating || 'N/A'} ({dealer.reviews || 0} reviews)
        </p>
      </div>

      <div className="flex flex-col gap-3 w-full">
        <button className="flex items-center justify-center gap-2 w-full py-3 text-md font-semibold rounded-xl text-white bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] transition-all shadow-md">
          <Phone className="w-5 h-5" /> Call Dealer
        </button>
        <button className="flex items-center justify-center gap-2 w-full py-3 text-md font-semibold rounded-xl border border-[var(--border-color)] text-[var(--text-color)] bg-transparent hover:bg-[var(--highlight-color)] transition-all">
          <MessageSquare className="w-5 h-5" /> Chat with Dealer
        </button>
      </div>

      <div className="text-sm text-[var(--muted-text)] border-t border-[var(--border-color)] pt-5 w-full">
        <p className="mb-2 flex items-center justify-center gap-2">
          <Star className="w-4 h-4 text-green-500" /> Verified Dealer
        </p>
        <p className="mb-3 flex items-center justify-center gap-2">
          <Car className="w-4 h-4 text-[var(--muted-text)]" /> {dealer.totalCars || 0} Cars Available
        </p>
        <button className="mt-2 text-[var(--accent-color)] hover:underline font-medium text-base">
          View Dealer Profile →
        </button>
      </div>

    </div>
  );
}