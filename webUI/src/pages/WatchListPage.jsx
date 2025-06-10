import React from "react";
import Navbar from "../components/Weblayout/Navbar";
import WatchList from "../components/WatchList/WatchList";
import WhyDealsAndWheels from "../components/Weblayout/WhyDealsAndWheels";
import Footer from "../components/Weblayout/Footer";


const WatchListPage = () => {
    return (
        <div>
            <Navbar />
            <WatchList />
            <WhyDealsAndWheels />
            <Footer />
        </div>
    )
}

export default WatchListPage;