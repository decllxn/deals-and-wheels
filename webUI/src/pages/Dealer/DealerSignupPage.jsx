import { Navbar } from "@components/layout";
import DealerSignUp from "../../components/ForDealers/DealerRegistration/DealerSignUp";
import { Footer } from "@components/layout";

const DealerSignupPage = () => {
    return (
        <div>
            <Navbar />
            <DealerSignUp />
            <Footer />
        </div>
    )
}

export default DealerSignupPage;