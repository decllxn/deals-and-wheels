import React from "react";
import Navbar from "../components/Weblayout/Navbar";
import UsedCarDetails from "../components/UsedCarDetails/UsedCarDetails";
import WhyDealsandWheels from "../components/Weblayout/WhyDealsAndWheels";
import Footer from "../components/Weblayout/Footer";

const UsedCarDetailsPage = () => {
    return (
        <div>
            <Navbar />
            <UsedCarDetails />
            <WhyDealsandWheels />
            <Footer />
        </div>
    )
}

export default UsedCarDetailsPage;