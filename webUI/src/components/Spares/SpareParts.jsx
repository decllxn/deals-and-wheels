import React, { useState, useEffect } from "react";
import SparePartsFilter from "./SparePartsFilter";
import MakeModelSearch from "./MakeModelSearch";
import ListingGrid from "./ListingGrid";
import ProductBrands from "./ProductsBrands";

const SpareParts = () => {
  const [partsData, setPartsData] = useState([]); // Initialize as empty array

  useEffect(() => {
    // Simulate data fetching (replace with your actual data fetching logic)
    setTimeout(() => {
      const data = [
        {
          id: 1,
          name: "Engine Air Filter",
          description: "High-performance air filter for improved engine efficiency.",
          make: "Toyota",
          model: "Corolla",
          year: 2020,
          price: 29.99,
          imageUrl: "https://via.placeholder.com/300x200",
          onSale: true,
          shippingAvailable: true,
          rating: 4.5,
          reviewCount: 52,
          condition: "New",
          inStock: true,
        },
        {
          id: 2,
          name: "Brake Pads (Set)",
          description: "Premium brake pads for reliable stopping power.",
          make: "Honda",
          model: "Civic",
          year: 2019,
          price: 49.99,
          imageUrl: "https://via.placeholder.com/300x200",
          onSale: false,
          shippingAvailable: true,
          rating: 4.8,
          reviewCount: 98,
          condition: "New",
          inStock: true,
        },
        {
          id: 3,
          name: "Headlight Assembly",
          description: "Replacement headlight assembly for enhanced visibility.",
          make: "Ford",
          model: "F-150",
          year: 2021,
          price: 129.99,
          imageUrl: "https://via.placeholder.com/300x200",
          onSale: false,
          shippingAvailable: false,
          rating: 4.2,
          reviewCount: 32,
          condition: "Used",
          inStock: false,
        },
        {
          id: 4,
          name: "Spark Plugs (Set)",
          description: "High performance spark plugs.",
          make: "BMW",
          model: "3 Series",
          year: 2022,
          price: 79.99,
          imageUrl: "https://via.placeholder.com/300x200",
          onSale: false,
          shippingAvailable: true,
          rating: 4.9,
          reviewCount: 150,
          condition: "New",
          inStock: true,
        },
        {
          id: 5,
          name: "Oil Filter",
          description: "High quality oil filter.",
          make: "Audi",
          model: "A4",
          year: 2020,
          price: 19.99,
          imageUrl: "https://via.placeholder.com/300x200",
          onSale: false,
          shippingAvailable: true,
          rating: 4.6,
          reviewCount: 80,
          condition: "New",
          inStock: true,
        },
        {
          id: 6,
          name: "Transmission Fluid",
          description: "Synthetic transmission fluid.",
          make: "Nissan",
          model: "Altima",
          year: 2021,
          price: 34.99,
          imageUrl: "https://via.placeholder.com/300x200",
          onSale: true,
          shippingAvailable: false,
          rating: 4.3,
          reviewCount: 45,
          condition: "Used",
          inStock: false,
        },
        {
          id: 7,
          name: "Coolant",
          description: "Antifreeze coolant.",
          make: "Mercedes",
          model: "C-Class",
          year: 2022,
          price: 24.99,
          imageUrl: "https://via.placeholder.com/300x200",
          onSale: false,
          shippingAvailable: true,
          rating: 4.7,
          reviewCount: 110,
          condition: "New",
          inStock: true,
        },
        {
          id: 8,
          name: "Battery",
          description: "Long lasting car battery.",
          make: "Toyota",
          model: "Camry",
          year: 2023,
          price: 99.99,
          imageUrl: "https://via.placeholder.com/300x200",
          onSale: false,
          shippingAvailable: true,
          rating: 4.8,
          reviewCount: 180,
          condition: "New",
          inStock: true,
        },
      ];
      setPartsData(data);
    }, 1000); // Simulate 1 second delay
  }, []);

  const brandsData = [
    {
      id: 1,
      name: "Bosch",
      imageUrl: "https://via.placeholder.com/150x50?text=Bosch", // Placeholder image
    },
    {
      id: 2,
      name: "NGK",
      imageUrl: "https://via.placeholder.com/150x50?text=NGK", // Placeholder image
    },
    {
      id: 3,
      name: "Mobil 1",
      imageUrl: "https://via.placeholder.com/150x50?text=Mobil1", // Placeholder image
    },
    {
      id: 4,
      name: "Brembo",
      imageUrl: "https://via.placeholder.com/150x50?text=Brembo", // Placeholder image
    },
      {
      id: 5,
      name: "Michelin",
      imageUrl: "https://via.placeholder.com/150x50?text=Michelin",
    },
      {
      id: 6,
      name: "Castrol",
      imageUrl: "https://via.placeholder.com/150x50?text=Castrol",
      }
  ];
  return (
    <div>
      <SparePartsFilter />
      <MakeModelSearch />
      <ListingGrid parts={partsData} />
      <ProductBrands brands={brandsData} />
    </div>
  );
};

export default SpareParts;