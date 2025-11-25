import { Navbar } from "@components/layout";
import { Footer } from "@components/layout";
import UsedCars from "../../components/UsedCars/UsedCars";

const ListingsPage = () => {
    return (
       <div>
        <Navbar />
        <UsedCars />
        <Footer />
       </div>
    )
}

export default ListingsPage;