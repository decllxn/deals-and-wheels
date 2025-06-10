import React from "react";
import Editorial from "../components/Editorial/Editorial";
import Navbar from "../components/Weblayout/Navbar";
import WhyDealsAndWheels from "../components/Weblayout/WhyDealsAndWheels";
import Footer from "../components/Weblayout/Footer";


const EditorialPage = () => {
    return (
        <div>
            <Navbar />
            <Editorial />
            <WhyDealsAndWheels />
            <Footer />
        </div>
    )
}

export default EditorialPage;