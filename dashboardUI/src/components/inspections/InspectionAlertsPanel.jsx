import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, EyeOff, CircleOff, CalendarX2 } from "lucide-react";

const alerts = [
  { id: 1, type: "Overdue Inspection", message: "Inspection for Vehicle XYZ is 3 days overdue.", severity: "high" },
  { id: 2, type: "Unassigned Inspection", message: "Inspection for Vehicle ABC is not yet assigned.", severity: "medium" },
  { id: 3, type: "Cancelled Inspection", message: "Inspection for Vehicle PQR was cancelled by the user.", severity: "low" },
  { id: 4, type: "Pending Approval", message: "Inspection report for Vehicle LMN is awaiting your approval.", severity: "medium" },
];

const InspectionAlertsPanelModern = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.2 }}
    className="bg-[--card] rounded-2xl shadow-md p-6 flex flex-col gap-4"
  >
    <h2 className="text-lg font-semibold text-[--text] flex items-center gap-2 mb-4">
      <AlertTriangle className="text-red-500" size={20} /> Inspection Alerts
    </h2>
    <div className="space-y-3">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`p-3 rounded-md border border-[--border] bg-[--bg] flex items-center gap-3 ${
            alert.severity === "high" ? "border-red-300" : alert.severity === "medium" ? "border-yellow-300" : "border-gray-300"
          }`}
        >
          {alert.severity === "high" ? (
            <AlertTriangle className="text-red-500" size={18} />
          ) : alert.severity === "medium" ? (
            <CalendarX2 className="text-yellow-500" size={18} />
          ) : (
            <CircleOff className="text-gray-500" size={18} />
          )}
          <div className="flex-1">
            <p className="text-sm font-semibold text-[--text]">{alert.type}</p>
            <p className="text-xs text-[--text-muted]">{alert.message}</p>
          </div>
        </div>
      ))}
      {alerts.length === 0 && (
        <div className="p-3 rounded-md border border-[--border] bg-[--bg] text-center text-[--text-muted]">
          No inspection alerts at this time.
        </div>
      )}
    </div>
  </motion.div>
);

export default InspectionAlertsPanelModern;