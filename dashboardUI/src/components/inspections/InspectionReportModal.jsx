import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ClipboardList,
  Camera,
  FileText,
  Download,
  Printer,
  Star,
} from "lucide-react";

const sampleReport = {
  checklist: [
    { label: "Engine", status: "Pass" },
    { label: "Brakes", status: "Pass" },
    { label: "Suspension", status: "Fail" },
    { label: "Body", status: "Pass" },
    { label: "Lights", status: "Pass" },
  ],
  photos: [
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
  ],
  inspectorNotes:
    "Suspension needs tightening. All other checks are satisfactory. Vehicle safe for short-term usage.",
  rating: 4.2,
};

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  exit: { opacity: 0, y: 60, transition: { duration: 0.2 } },
};

const InspectionReportModal = ({ isOpen = false, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
        >
          <motion.div
            className="bg-[--bg-secondary] text-[--text] w-full max-w-3xl rounded-2xl shadow-xl p-6 relative"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <ClipboardList size={20} /> Inspection Report
              </h3>
              <button onClick={onClose} className="text-[--text-muted] hover:text-[--accent]">
                <X size={20} />
              </button>
            </div>

            {/* Checklist */}
            <div className="mb-6">
              <h4 className="font-semibold text-[--text-muted] mb-2">Checklist</h4>
              <ul className="space-y-2">
                {sampleReport.checklist.map((item, idx) => (
                  <li key={idx} className="flex justify-between border-b border-[--border] py-2">
                    <span>{item.label}</span>
                    <span
                      className={`text-sm font-medium ${
                        item.status === "Pass" ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {item.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Photos */}
            <div className="mb-6">
              <h4 className="font-semibold text-[--text-muted] mb-2 flex items-center gap-2">
                <Camera size={18} /> Inspection Photos
              </h4>
              <div className="flex gap-4 overflow-x-auto">
                {sampleReport.photos.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`Inspection ${idx}`}
                    className="w-28 h-28 object-cover rounded-lg border border-[--border]"
                  />
                ))}
              </div>
            </div>

            {/* Notes & Rating */}
            <div className="mb-6">
              <h4 className="font-semibold text-[--text-muted] mb-2 flex items-center gap-2">
                <FileText size={18} /> Inspector Notes
              </h4>
              <p className="text-sm text-[--text-muted] mb-3">{sampleReport.inspectorNotes}</p>
              <div className="flex items-center gap-2">
                <Star size={16} className="text-yellow-400" />
                <span className="text-sm">{sampleReport.rating} / 5.0</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 mt-6">
              <button className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-[--bg] text-[--text] border border-[--border] hover:bg-[--bg-hover] transition">
                <Download size={16} /> Download PDF
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-[--accent] text-white hover:opacity-90 transition">
                <Printer size={16} /> Print Report
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InspectionReportModal;