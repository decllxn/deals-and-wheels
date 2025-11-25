import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function useDealerEditListingForm(car, onClose) {
  const { access } = useAuth();

  const [formData, setFormData] = useState({
    title: car.title || "",
    make: car.make || "",
    model: car.model || "",
    year: car.year || "",
    price: car.price || "",
    mileage: car.mileage || "",
    transmission: car.transmission || "",
    drivetrain: car.drivetrain || "",
    fuel_type: car.fuel_type || "",
    body_style: car.body_style || "",
    exterior_color: car.exterior_color || "",
    interior_color: car.interior_color || "",
    vin: car.vin || "",
    engine: car.engine || "",
    title_status: car.title_status || "",
    seller_type: car.seller_type || "Dealer",
    condition: car.condition || "Used",
    location: car.location || "",
    description: car.description || "",
    is_featured: car.is_featured || false,
    is_sold: car.is_sold || false,
    has_warranty: car.has_warranty || false,
    images: car.images || [],
    features: car.features || [],
    equipment: car.equipment || [],
    modifications: car.modifications || [],
    known_flaws: car.known_flaws || [],
    videos: car.videos || [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (files && files[0]) {
      // Replace image at index with the new File
      const newImages = [...formData.images];
      newImages[parseInt(name)] = files[0];
      setFormData({ ...formData, images: newImages });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleListChange = (listName, index, value) => {
    const newList = [...formData[listName]];
    newList[index] = value;
    setFormData({ ...formData, [listName]: newList });
  };

  const handleAddItem = (listName) => {
    const newItem = listName === "images" ? null : "";
    setFormData({ ...formData, [listName]: [...formData[listName], newItem] });
  };

  const handleRemoveItem = (listName, index) => {
    const newList = [...formData[listName]];
    newList.splice(index, 1);
    setFormData({ ...formData, [listName]: newList });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key === "images") {
          formData.images.forEach((img) => {
            if (img instanceof File) {
              data.append("images", img);
            }
          });
        } else if (Array.isArray(formData[key])) {
          data.append(key, JSON.stringify(formData[key]));
        } else if (formData[key] !== null && formData[key] !== undefined) {
          data.append(key, formData[key]);
        }
      });

      await axios.patch(
        `http://127.0.0.1:8000/vehicles/listings/${car.slug}/`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${access}`,
          },
        }
      );

      onClose();
    } catch (err) {
      console.error("Failed to update listing:", err.response || err);
    }
  };

  return {
    formData,
    setFormData,
    handleChange,
    handleListChange,
    handleAddItem,
    handleRemoveItem,
    handleSubmit,
  };
}