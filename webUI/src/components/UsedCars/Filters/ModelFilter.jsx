import React, { useEffect, useState } from "react";
import AccordionSection from "./AccordionSection";

const ModelFilter = ({ filters, setFilters }) => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);

  const selectedMake = filters.make || null;
  const selectedModel = filters.model || null;

  useEffect(() => {
    if (!selectedMake) {
      setModels([]); // reset models if make is cleared
      return;
    }

    const fetchModels = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/vehicles/listings/?category=model&q=&make=${encodeURIComponent(selectedMake)}`
        );
        if (!res.ok) throw new Error("Failed to fetch models");
        const data = await res.json();

        // Extract unique models from results
        const uniqueModels = [
          ...new Set(data.results.map((item) => item.model).filter(Boolean))
        ].sort();

        setModels(uniqueModels);
      } catch (error) {
        console.error("Error fetching models:", error);
        setModels([]); // clear models on error
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, [selectedMake]);

  return (
    <AccordionSection title="Model">
      <div className="h-64 overflow-y-auto flex flex-col space-y-3">
        {!selectedMake ? (
          <p className="text-sm text-[var(--muted-text)]">Select a make first</p>
        ) : loading ? (
          <p className="text-sm text-[var(--muted-text)]">Loading models...</p>
        ) : models.length > 0 ? (
          models.map((model) => (
            <div
              key={model}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  model,
                }))
              }
              className={`flex items-center p-2 rounded cursor-pointer transition ${
                selectedModel === model
                  ? "bg-[var(--border-color)]"
                  : "hover:bg-[var(--surface-color)]"
              }`}
            >
              {/* Optional: model icon if available */}
              <img
                src={`/Model_logos/${selectedMake.toLowerCase()}/${model.toLowerCase()}.png`}
                alt={model}
                className="w-6 h-6 mr-3 object-contain"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
              <span className="capitalize">{model}</span>
            </div>
          ))
        ) : (
          <p className="text-sm text-[var(--muted-text)]">No models found</p>
        )}
      </div>
    </AccordionSection>
  );
};

export default ModelFilter;