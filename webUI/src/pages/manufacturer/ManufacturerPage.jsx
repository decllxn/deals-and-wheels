import React from 'react';
import Navbar from '../../components/Weblayout/Navbar';
import Footer from '../../components/Weblayout/Footer';
import WhyDealsAndWheels from '../../components/Weblayout/WhyDealsAndWheels';
import Manufacturer from '../../components/manufacturer/Manufacturer';

const ManufacturerPage = () => {
    return (
        <>
         <Navbar />
         <Manufacturer />
         <WhyDealsAndWheels />
         <Footer />
        </>
    )
}


export default ManufacturerPage;