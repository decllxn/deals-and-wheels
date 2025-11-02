// UsedCarDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CarDetailsHero from "./CarDetailsHero";

export default function UsedCarDetails() {
  const { slug } = useParams();
  const [car, setCar] = useState(null);
  const [dealer, setDealer] = useState(null);
  const [loading, setLoading] = useState(true);
  const BASE_URL = "http://127.0.0.1:8000/vehicles/listings";

  useEffect(() => {
    if (!slug) return;

    const fetchCarDetails = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/${slug}/`);
        if (!res.ok) throw new Error("Failed to fetch car details");
        const data = await res.json();

        // ✅ Normalize image list
        const images = Array.isArray(data.images)
          ? data.images.map((img) => img.image)
          : [];
        const mainImage = images.length > 0 ? images[0] : "/placeholder-car.jpg";

        // ✅ Normalize price
        const price = data.price ? parseFloat(data.price) : 0;

        // ✅ Construct normalized car object
        const normalizedCar = {
          ...data,
          images,
          mainImage,
          price,
        };
        setCar(normalizedCar);

        // ✅ Normalize dealer/seller info
        const dealerInfo = data.dealer
          ? {
              name: data.dealer.name || "Authorized Dealer",
              location: data.dealer.location || data.location || "Unknown",
              phone: data.dealer.phone || "+254700000000",
              email: data.dealer.email || "",
            }
          : {
              name: data.seller || "Private Seller",
              location: data.location || "Unknown",
              phone: "N/A",
              email: data.seller,
            };
        setDealer(dealerInfo);
      } catch (error) {
        console.error("Error fetching car details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [slug]);

  if (loading)
    return (
      <div className="text-center py-10 text-lg font-medium">
        Loading car details...
      </div>
    );

  if (!car)
    return (
      <div className="text-center py-10 text-lg font-medium">
        Car not found.
      </div>
    );

  return (
    <div className="pb-20">
      <CarDetailsHero car={car} dealer={dealer} />
    </div>
  );
}