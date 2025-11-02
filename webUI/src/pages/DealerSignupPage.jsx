import Navbar from "../components/Weblayout/Navbar";
import DealerSignUp from "../components/ForDealers/DealerRegistration/DealerSignUp";
import WhyDealsAndWheels from "../components/Weblayout/WhyDealsAndWheels";
import Footer from "../components/Weblayout/Footer";

const DealerSignupPage = () => {
    return (
        <div>
            <Navbar />
            <DealerSignUp />
            <WhyDealsAndWheels />
            <Footer />
        </div>
    )
}

export default DealerSignupPage;