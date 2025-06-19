import Navbar from "../components/Weblayout/Navbar";
import WhyDealsAndWheels from "../components/Weblayout/WhyDealsAndWheels";
import Footer from "../components/Weblayout/Footer";
import ReviewDetails from "../components/ReviewsDetails/ReviewDetails";

const ReviewsDetails = () => {
    return (
        <div>
            <Navbar />
            <ReviewDetails />
            <WhyDealsAndWheels />
            <Footer />
        </div>
    )
}

export default ReviewsDetails;