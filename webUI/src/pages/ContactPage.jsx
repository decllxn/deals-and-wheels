import React from "react";
import Navbar from "../components/Weblayout/Navbar";
import Contact from "../components/Contact/Contact";
import WhyDealsAndWheels from "../components/Weblayout/WhyDealsAndWheels";
import Footer from "../components/Weblayout/Footer";


const ContactPage = () => {
    return (
        <div>
            <Navbar />
            <Contact />
            <WhyDealsAndWheels />
            <Footer />
        </div>
    )
}

export default ContactPage;