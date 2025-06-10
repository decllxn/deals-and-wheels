import React from "react";
import Navbar from "../components/Weblayout/Navbar";
import SellCar from "../components/Sell/SellCar";
import WhyDealsAndWheels from "../components/Weblayout/WhyDealsAndWheels";
import Footer from "../components/Weblayout/Footer";


const SellACar = () => {
    return (
        <div>
            <Navbar />
            <SellCar />
            <WhyDealsAndWheels />
            <Footer />
        </div>
    )
}

export default SellACar