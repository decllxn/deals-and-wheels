import { Navbar } from "@components/layout";
import { Footer } from "@components/layout";
import ReviewDetails from "../../components/ReviewsDetails/ReviewDetails";

const ReviewsDetails = () => {
    return (
        <div>
            <Navbar />
            <ReviewDetails />
            <Footer />
        </div>
    )
}

export default ReviewsDetails;