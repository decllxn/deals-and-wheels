import React from "react";
import CarDetailsHero from "./CarDetailsHero";

const car = {
  mainImage: "/f40.jpg",
  images: [
    "/f40.jpg",
    "/f40.jpg",
    "/f40.jpg",
    "/landcruiser.jpg",
    "/testcar.jpg",
    "/f40.jpg",
  ],
  make: "BMW",
  model: "M3 Competition",
  year: 2022,
  price: 12900999,
  mileage: 15200,
  transmission: "Automatic",
  engine: "3.0L Twin-Turbo I6",
  fuelType: "Petrol",
  driveType: "RWD",
  location: "Nairobi, Kenya",
};

const dealer = {
  name: "Prestige Motors Kenya",
  location: "Nairobi CBD",
  phone: "+254712345678"
};

const UsedCarDetails = () => {
  return (
    <div>
      <CarDetailsHero 
        car={car} 
        dealer={dealer} 
        similarListings={[
          {
            id: 1,
            image: "/f40.jpg",
            year: 2021,
            make: "Mercedes",
            model: "C300 AMG",
            trim: "Premium Plus",
            price: 8500000,
            mileage: 22000,
            location: "Nairobi, Kenya",
            fuel_type: "Petrol",
            transmission: "Automatic",
          },
          {
            id: 2,
            image: "/landcruiser.jpg",
            year: 2020,
            make: "Toyota",
            model: "Land Cruiser",
            trim: "VX-R",
            price: 16500000,
            mileage: 34000,
            location: "Mombasa, Kenya",
            fuel_type: "Diesel",
            transmission: "Automatic",
          },
          {
            id: 3,
            image: "/f40.jpg",
            year: 2022,
            make: "Audi",
            model: "RS5",
            trim: "Sportback",
            price: 12500000,
            mileage: 18000,
            location: "Nairobi, Kenya",
            fuel_type: "Petrol",
            transmission: "Automatic",
          },
          {
            id: 4,
            image: "/landcruiser.jpg",
            year: 2019,
            make: "Toyota",
            model: "Land Cruiser Prado",
            trim: "TX-L",
            price: 9300000,
            mileage: 28000,
            location: "Nakuru, Kenya",
            fuel_type: "Diesel",
            transmission: "Automatic",
          },
          {
            id: 5,
            image: "/f40.jpg",
            year: 2021,
            make: "BMW",
            model: "X5 M",
            trim: "Competition",
            price: 14000000,
            mileage: 19500,
            location: "Nairobi, Kenya",
            fuel_type: "Petrol",
            transmission: "Automatic",
          },
          {
            id: 6,
            image: "/landcruiser.jpg",
            year: 2018,
            make: "Toyota",
            model: "Land Cruiser V8",
            trim: "ZX",
            price: 15000000,
            mileage: 40000,
            location: "Nairobi, Kenya",
            fuel_type: "Diesel",
            transmission: "Automatic",
          },
          {
            id: 7,
            image: "/f40.jpg",
            year: 2022,
            make: "Porsche",
            model: "Cayenne Turbo",
            trim: "S Coupe",
            price: 22000000,
            mileage: 12000,
            location: "Mombasa, Kenya",
            fuel_type: "Petrol",
            transmission: "Automatic",
          },
          {
            id: 8,
            image: "/landcruiser.jpg",
            year: 2020,
            make: "Toyota",
            model: "Land Cruiser VX",
            trim: "Executive",
            price: 17000000,
            mileage: 31000,
            location: "Nairobi, Kenya",
            fuel_type: "Diesel",
            transmission: "Automatic",
          }
        ]}
      />
    </div>
  );
};

export default UsedCarDetails;