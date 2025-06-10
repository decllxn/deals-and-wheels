import React from "react";
import Navbar from "../../components/Weblayout/Navbar";
import WhyDealsAndWheels from "../../components/Weblayout/WhyDealsAndWheels";
import Footer from "../../components/Weblayout/Footer";
import ManufacturerList from "../../components/manufacturer/ManufacturerList";


const ManufacturerListPage = () => {
    return (
        <>
          <Navbar />
          <ManufacturerList />
          <WhyDealsAndWheels />
          <Footer />
        </>
    )
}

export default ManufacturerListPage;