import React from "react";
import Navbar from "../components/Weblayout/Navbar";
import About from "../components/About/About";
import WhyDealsAndWheels from "../components/Weblayout/WhyDealsAndWheels";
import Footer from "../components/Weblayout/Footer";


const AboutPage = () => {
    return (
        <div>
            <Navbar />
            <About />
            <WhyDealsAndWheels />
            <Footer />
        </div>
    )
}

export default AboutPage;