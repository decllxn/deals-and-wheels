import React, { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, UserX, Edit, User, CheckCircle, Clock } from "lucide-react";

const inspectorsData = [
  { id: 1, name: "John Doe", status: "Active" },
  { id: 2, name: "Jane Smith", status: "Inactive" },
  { id: 3, name: "Peter Jones", status: "Active" },
];

const InspectorsManagementPanelModern = () => {
  const [inspectors, setInspectors] = useState(inspectorsData);
  const [newInspectorName, setNewInspectorName] = useState("");

  const handleAddInspector = () => {
    if (newInspectorName.trim()) {
      setInspectors((prev) => [...prev, { id: Date.now(), name: newInspectorName.trim(), status: "Active" }]);
      setNewInspectorName("");
    }
  };

  const handleRemoveInspector = (id) => {
    setInspectors((prev) => prev.filter((inspector) => inspector.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="bg-[--card] rounded-2xl shadow-md p-6 flex flex-col gap-4"
    >
      <h2 className="text-lg font-semibold text-[--text] flex items-center gap-2 mb-4">
        <UserPlus className="text-[--accent]" size={20} /> Inspectors Management
      </h2>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="New Inspector Name"
          value={newInspectorName}
          onChange={(e) => setNewInspectorName(e.target.value)}
          className="bg-[--bg] border border-[--border] rounded-md p-2 text-[--text] w-full focus:outline-none"
        />
        <button
          onClick={handleAddInspector}
          className="bg-green-500 hover:bg-green-600 text-white rounded-md py-2 px-3 font-semibold transition-colors"
        >
          <UserPlus className="w-4 h-4" /> Add
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-[--bg-secondary] text-[--text-muted] font-semibold">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inspectors.map((inspector) => (
              <tr key={inspector.id} className="bg-[--bg] hover:bg-[--bg-secondary]">
                <td className="p-3">{inspector.id}</td>
                <td className="p-3 text-[--text]">{inspector.name}</td>
                <td className="p-3 text-[--text]">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
                      inspector.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {inspector.status === "Active" ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    {inspector.status}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <button className="text-blue-500 hover:text-blue-600 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleRemoveInspector(inspector.id)}
                      className="text-red-500 hover:text-red-600 transition-colors"
                    >
                      <UserX className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {inspectors.length === 0 && (
          <div className="p-3 text-center text-[--text-muted]">No inspectors added yet.</div>
        )}
      </div>
    </motion.div>
  );
};

export default InspectorsManagementPanelModern;