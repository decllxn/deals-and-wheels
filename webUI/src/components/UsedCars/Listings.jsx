import React from 'react';
import Card from './Card';
import { Link } from 'react-router-dom';

// Dummy placeholder data
const cars = [
  { id: 1, make: 'Toyota', model: 'Corolla', year: 2020, price: 15000, mileage: 40000, location: 'Nairobi', image: '/landcruiser.jpg' },
  { id: 2, make: 'BMW', model: 'X5', year: 2018, price: 30000, mileage: 60000, location: 'Mombasa', image: '/testcar.jpg' },
  { id: 3, make: 'Honda', model: 'Civic', year: 2022, price: 20000, mileage: 10000, location: 'Kisumu', image: '/f40.jpg' },
  { id: 4, make: 'Mercedes', model: 'C-Class', year: 2021, price: 35000, mileage: 20000, location: 'Nairobi', image: 'https://via.placeholder.com/300x200' },
  { id: 5, make: 'Ford', model: 'Focus', year: 2019, price: 17000, mileage: 50000, location: 'Eldoret', image: 'https://via.placeholder.com/300x200' },
  { id: 6, make: 'Audi', model: 'A4', year: 2020, price: 25000, mileage: 30000, location: 'Nakuru', image: 'https://via.placeholder.com/300x200' }
];

// Slug function
const createCarSlug = (car) => {
  const slugify = str => str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  return `${slugify(car.make)}-${slugify(car.model)}-${car.year}-${car.id}`;
};

const Listings = ({ filtersOpen }) => {
  return (
    <div className={`grid gap-6 
      ${filtersOpen 
        ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3' 
        : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4'
      }`}
    >
      {cars.map(car => {
        const slug = createCarSlug(car);
        return (
          <Link key={car.id} to={`/used-cars/${slug}`}>
            <Card car={car} />
          </Link>
        );
      })}
    </div>
  );
};

export default Listings;
