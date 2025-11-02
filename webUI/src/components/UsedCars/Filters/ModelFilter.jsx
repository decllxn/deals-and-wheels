import React, { useEffect, useState } from "react";
import AccordionSection from "./AccordionSection";

const ModelFilter = ({ filters, setFilters }) => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);

  const selectedMake = filters.make || null;
  const selectedModel = filters.model || null;

  useEffect(() => {
    if (!selectedMake) return;

    const fetchModels = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/vehicles/listings/suggestions/?category=model&q=&make=${selectedMake}`
        );
        if (!res.ok) throw new Error("Failed to fetch models");
        const data = await res.json();

        setModels(data.models || []);
      } catch (error) {
        console.error("Error fetching models:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, [selectedMake]);

  return (
    <AccordionSection title="Model">
      {!selectedMake ? (
        <p className="text-sm text-[var(--muted-text)]">Select a make first</p>
      ) : loading ? (
        <p className="text-sm text-[var(--muted-text)]">Loading models...</p>
      ) : models.length > 0 ? (
        <div className="h-48 overflow-y-auto flex flex-col space-y-2">
          {models.map((model) => (
            <div
              key={model}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  model,
                }))
              }
              className={`p-2 rounded cursor-pointer transition ${
                selectedModel === model
                  ? "bg-[var(--border-color)]"
                  : "hover:bg-[var(--surface-color)]"
              }`}
            >
              {model}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-[var(--muted-text)]">No models found</p>
      )}
    </AccordionSection>
  );
};

export default ModelFilter;