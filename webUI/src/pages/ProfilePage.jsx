import React from "react";
import Navbar from "../components/Weblayout/Navbar";
import Profile from "../components/Profile/Profile";
import WhyDealsAndWheels from "../components/Weblayout/WhyDealsAndWheels";
import Footer from "../components/Weblayout/Footer";


const ProfilePage = () => {
    return (
        <div>
            <Navbar />
            <Profile />
            <WhyDealsAndWheels />
            <Footer />
        </div>
    )
}

export default ProfilePage;