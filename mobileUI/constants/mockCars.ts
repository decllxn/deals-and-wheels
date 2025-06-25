// /constants/mockCars.ts

export interface Car {
  id: string;
  name: string;
  price: string;
  image: string | number;
  year: number;
  mileage: string;
  location: string;
  transmission: string;
  fuelType: string;
}

export const mockCars: Car[] = [
  {
    id: "1",
    name: "Mazda Demio",
    price: "KSh 870,000",
    image: require("../assets/images/landcruiser.jpg"),
    year: 2015,
    mileage: "65,000 km",
    location: "Nairobi",
    transmission: "Automatic",
    fuelType: "Petrol",
  },
  {
    id: "2",
    name: "Toyota Premio",
    price: "KSh 1,250,000",
    image: "https://source.unsplash.com/600x400/?toyota,premio",
    year: 2014,
    mileage: "85,000 km",
    location: "Mombasa",
    transmission: "Automatic",
    fuelType: "Petrol",
  },
  {
    id: "3",
    name: "Subaru Impreza",
    price: "KSh 1,300,000",
    image: "https://source.unsplash.com/600x400/?subaru,car",
    year: 2016,
    mileage: "72,000 km",
    location: "Nakuru",
    transmission: "Manual",
    fuelType: "Petrol",
  },
  {
    id: "4",
    name: "Honda Fit",
    price: "KSh 780,000",
    image: "https://source.unsplash.com/600x400/?honda,fit",
    year: 2013,
    mileage: "90,000 km",
    location: "Thika",
    transmission: "Automatic",
    fuelType: "Hybrid",
  },
  {
    id: "5",
    name: "Nissan Note",
    price: "KSh 690,000",
    image: "https://source.unsplash.com/600x400/?nissan,note",
    year: 2015,
    mileage: "68,000 km",
    location: "Eldoret",
    transmission: "Automatic",
    fuelType: "Petrol",
  },
  {
    id: "6",
    name: "Volkswagen Golf",
    price: "KSh 1,150,000",
    image: "https://source.unsplash.com/600x400/?vw,golf",
    year: 2017,
    mileage: "58,000 km",
    location: "Kisumu",
    transmission: "Automatic",
    fuelType: "Diesel",
  },
];