import React from "react";

const ListingsManager = () => {
  const listings = [
    { id: 1, name: "Toyota Supra", status: "Active", views: 120 },
    { id: 2, name: "Mercedes AMG", status: "Sold", views: 250 },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Manage Listings</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Car</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Views</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((car) => (
              <tr key={car.id} className="border-b hover:bg-gray-50">
                <td className="py-2">{car.name}</td>
                <td className="py-2">{car.status}</td>
                <td className="py-2">{car.views}</td>
                <td className="py-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded-md">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListingsManager;