import Navbar from "../components/Weblayout/Navbar";
import WhyDealsAndWheels from "../components/Weblayout/WhyDealsAndWheels";
import Footer from "../components/Weblayout/Footer";
import Reviews from "../components/Reviews/Reviews";


const ReviewsPage = () => {
    return (
        <div>
            <Navbar/>
            <Reviews />
            <WhyDealsAndWheels />
            <Footer />
        </div>
    )
}

export default ReviewsPage