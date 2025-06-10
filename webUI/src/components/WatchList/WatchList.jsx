import React from "react";
import AuctionsWatchlist from "./AuctionsWatchlist";
import CarsForSaleWatchlist from "./CarsForSaleWatchlist";
import SortingFiltering from "./SortingFiltering"
import CarsForSaleSortingFiltering from "./CarsForSaleSortingFiltering";
import FeaturedCarListings from "./FeaturedCarListings";


const WatchList = () => {
    return (
        <div className="mt-20">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center mb-4 ml-5">
                Watchlist
            </h2>
            <SortingFiltering />
            <AuctionsWatchlist />
            <CarsForSaleSortingFiltering />
            <CarsForSaleWatchlist />
            <FeaturedCarListings />
        </div>
    )
}

export default WatchList;