import React, { useEffect, useState } from "react";
import AccordionSection from "./AccordionSection";

const MakeFilter = ({ filters, setFilters }) => {
  const [makes, setMakes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const res = await fetch(
          "http://127.0.0.1:8000/vehicles/listings/?category=make&q="
        );
        if (!res.ok) throw new Error("Failed to fetch makes");
        const data = await res.json();

        // Extract unique makes from results
        const uniqueMakes = [
          ...new Set(data.results.map((item) => item.make).filter(Boolean)),
        ].sort();

        setMakes(uniqueMakes);
      } catch (error) {
        console.error("Error fetching makes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMakes();
  }, []);

  const selectedMake = filters.make || null;

  return (
    <AccordionSection title="Make">
      <div className="h-64 overflow-y-auto flex flex-col space-y-3">
        {loading ? (
          <p className="text-sm text-[var(--muted-text)]">Loading makes...</p>
        ) : makes.length > 0 ? (
          makes.map((make) => (
            <div
              key={make}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  make,
                  model: undefined, // reset model when make changes
                }))
              }
              className={`flex items-center p-2 rounded cursor-pointer transition ${
                selectedMake === make
                  ? "bg-[var(--border-color)]"
                  : "hover:bg-[var(--surface-color)]"
              }`}
            >
              <img
                src={`/Brand_logos/${make.toLowerCase()}.png`}
                alt={make}
                className="w-6 h-6 mr-3 object-contain"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
              <span className="capitalize">{make}</span>
            </div>
          ))
        ) : (
          <p className="text-sm text-[var(--muted-text)]">No makes found</p>
        )}
      </div>
    </AccordionSection>
  );
};

export default MakeFilter;