import React from "react";
import Navbar from "../components/Weblayout/Navbar";
import Settings from "../components/UserSettings/Settings";
import WhyDealsAndWheels from "../components/Weblayout/WhyDealsAndWheels";
import Footer from "../components/Weblayout/Footer";


const SettingsPage = () => {
    return (
        <div>
            <Navbar />
            <Settings />
            <WhyDealsAndWheels />
            <Footer />
        </div>
    )
}

export default SettingsPage;