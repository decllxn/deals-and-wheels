import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { VEHICLES_API } from "../../constants";
import { fetchCarImages } from "../../api";

const CarDetail = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const response = await axios.get(`${VEHICLES_API}${id}/`);
                setCar(response.data);
                const imgData = await fetchCarImages(response.data.id);
                setImages(imgData);
            } catch (error) {
                console.error("Error fetching car details:", error);
            }
        };
        fetchCar();
    }, [id]);

    if (!car) return <p className="text-center text-gray-500">Loading...</p>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-gray-800">{car.make} {car.model} - {car.year}</h2>
            <img src={car.main_image} alt={car.model} className="w-full h-96 object-cover rounded-lg mt-4" />
            <p className="mt-4 text-gray-600">{car.description}</p>
            <p className="mt-2 font-bold text-lg">Price: Ksh {parseFloat(car.discount_price || car.price).toLocaleString()}</p>

            {/* Additional Images */}
            <div className="grid grid-cols-2 gap-4 mt-6">
                {images.map((img) => (
                    <img key={img.id} src={img.image} alt="Car detail" className="w-full h-48 object-cover rounded-lg" />
                ))}
            </div>
        </div>
    );
};

export default CarDetail;