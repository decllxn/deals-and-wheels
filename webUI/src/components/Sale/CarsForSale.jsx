import React from "react";
import CarsForSaleFilter from "../Home/CarsForSaleFilter";
import ListingGrid from "../Home/ListingGrid";


const CarsForSale = () => {
    return (
        <div>
            <CarsForSaleFilter />
            <ListingGrid />
        </div>
    )
}

export default CarsForSale;