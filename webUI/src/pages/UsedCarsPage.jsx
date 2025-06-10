import React from "react";
import Navbar from "../components/Weblayout/Navbar";
import WhyDealsAndWheels from "../components/Weblayout/WhyDealsAndWheels";
import Footer from "../components/Weblayout/Footer";
import UsedCars from "../components/UsedCars/UsedCars";

const UsedCarsPage = () => {
    return (
        <div>
            <Navbar />
            <UsedCars />
            <WhyDealsAndWheels />
            <Footer />
        </div>
    )
}

export default UsedCarsPage;