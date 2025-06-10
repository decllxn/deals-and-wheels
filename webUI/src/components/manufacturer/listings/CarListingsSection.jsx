import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CarListingsFilterBar } from "./CarListingsFilterBar";
import { CarListingsGrid } from "./CarListingsGrid";
import { CarListingsViewSelector } from "./CarListingsViewSelector";

export function CarListingsSection() {
  const { slug } = useParams();
  const [allCars, setAllCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [selectedType, setSelectedType] = useState("All");
  const [activeView, setActiveView] = useState("New");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [manufacturerName, setManufacturerName] = useState("");

  // Fetch manufacturer name
  useEffect(() => {
    async function fetchManufacturer() {
      try {
        const res = await fetch(`http://127.0.0.1:8000/manufacturers/api/${slug}/`);
        if (!res.ok) throw new Error("Failed to fetch manufacturer info");
        const data = await res.json();
        setManufacturerName(data.name || "");
      } catch (err) {
        setManufacturerName(slug.charAt(0).toUpperCase() + slug.slice(1)); // fallback
      }
    }

    fetchManufacturer();
  }, [slug]);

  // Fetch car listings
  useEffect(() => {
    async function fetchCars() {
      try {
        setLoading(true);
        const res = await fetch(`http://127.0.0.1:8000/manufacturers/api/${slug}/listings/`);
        if (!res.ok) throw new Error("Failed to load listings");
        const data = await res.json();
        setAllCars(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, [slug]);

  // Apply filters
  useEffect(() => {
    let cars = [...allCars];

    if (selectedType !== "All") {
      cars = cars.filter((car) => car.type === selectedType);
    }

    if (activeView === "New") {
      cars = cars.filter((car) => car.condition === "new");
    } else if (activeView === "Used") {
      cars = cars.filter((car) => car.condition === "used");
    }

    setFilteredCars(cars);
  }, [allCars, selectedType, activeView]);

  return (
    <section className="w-full bg-[var(--page-bg)] py-14">
      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--text-color)] capitalize">
            Browse Available {manufacturerName}
          </h2>
          <CarListingsViewSelector activeView={activeView} setActiveView={setActiveView} />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center md:justify-start gap-3">
          <CarListingsFilterBar
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
        </div>

        {/* Listings */}
        <div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl h-[340px] bg-[var(--surface-color)] shadow-md"
                />
              ))}
            </div>
          ) : error ? (
            <p className="text-center text-red-600 text-lg">{error}</p>
          ) : (
            <CarListingsGrid cars={filteredCars} />
          )}
        </div>
      </div>
    </section>
  );
}
