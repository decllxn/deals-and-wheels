import { Navbar } from "@components/layout";
import Dashboard from "../../components/ForDealers/DealerDashboard/Dashboard";
import { Footer } from "@components/layout";

const DashboardPage = () => {
    return (
        <div>
            <Navbar />
            <Dashboard />
            <Footer />
        </div>
    )
}

export default DashboardPage;