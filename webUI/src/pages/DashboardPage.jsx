import Navbar from  "../components/Weblayout/Navbar";
import WhyDealsAndWheels from "../components/Weblayout/WhyDealsAndWheels";
import Dashboard from "../components/ForDealers/DealerDashboard/Dashboard";
import Footer from "../components/Weblayout/Footer";

const DashboardPage = () => {
    return (
        <div>
            <Navbar />
            <Dashboard />
            <WhyDealsAndWheels />
            <Footer />
        </div>
    )
}

export default DashboardPage;