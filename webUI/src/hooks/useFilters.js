// hooks/useFilters.js
import { useState } from "react";

export const useFilters = (onFiltersChange) => {
  const [filters, setFilters] = useState({
    price__gte: "",
    price__lte: "",
    transmission: "",
    drivetrain: "",
    fuel_type: "",
    body_style: "",
    has_warranty: "",
    seller_type: "",
    location: "",
    dealer: "",
    ordering: "-created_at",
    is_featured: "",
  });

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedView, setSelectedView] = useState("Newest Listings");

  const updateFilters = (newFilters) => {
    setFilters((prev) => {
      const merged = { ...prev, ...newFilters };
      const cleaned = Object.fromEntries(
        Object.entries(merged).filter(
          ([, value]) => value !== "" && value !== null && value !== undefined
        )
      );
      onFiltersChange?.(cleaned);
      return merged;
    });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    updateFilters({ [name]: value });
  };

  const handleQuickFilter = (label) => {
    const viewMappings = {
      Featured: { is_featured: true, ordering: "-created_at" },
      "Newest Listings": { ordering: "-created_at" },
      "Lowest Price": { ordering: "price" },
      "Highest Price": { ordering: "-price" },
      "Lowest Mileage": { ordering: "mileage" },
    };

    setSelectedView(label);
    updateFilters(viewMappings[label] || {});
  };

  const resetFilters = () => {
    const reset = {
      price__gte: "",
      price__lte: "",
      transmission: "",
      drivetrain: "",
      fuel_type: "",
      body_style: "",
      has_warranty: "",
      seller_type: "",
      location: "",
      dealer: "",
      ordering: "-created_at",
      is_featured: "",
    };
    setFilters(reset);
    onFiltersChange?.(reset);
    setSelectedView("Newest Listings");
  };

  const toggleAdvancedFilters = () =>
    setShowAdvancedFilters((prev) => !prev);

  return {
    filters,
    setFilters,
    showAdvancedFilters,
    selectedView,
    handleQuickFilter,
    handleFilterChange,
    resetFilters,
    toggleAdvancedFilters,
  };
};