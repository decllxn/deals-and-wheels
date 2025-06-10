import React from "react";
import Navbar from "../components/Weblayout/Navbar";
import CarsForSale from "../components/Sale/CarsForSale";
import WhyDealsAndWheels from "../components/Weblayout/WhyDealsAndWheels";
import Footer from "../components/Weblayout/Footer";

const CarsForSalePage = () => {
    return (
        <div>
            <Navbar />
            <CarsForSale />
            <WhyDealsAndWheels />
            <Footer />
        </div>
    )
}

export default CarsForSalePage;