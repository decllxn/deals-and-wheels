import SearchFilterBar from "../../webUI/src/components/Home/SearchFilterBar";
import CarListingGrid from "../../webUI/src/components/Home/CarListingGrid";


const Auctions = () => {
    return (
        <div className="mt-35">
            <SearchFilterBar />
            <CarListingGrid />
        </div>
    )
}

export default Auctions;