import { Navbar } from "@components/layout";
import { Footer } from "@components/layout";
import Reviews from "../../components/Reviews/Reviews";


const ReviewsPage = () => {
    return (
        <div>
            <Navbar/>
            <Reviews />
            <Footer />
        </div>
    )
}

export default ReviewsPage