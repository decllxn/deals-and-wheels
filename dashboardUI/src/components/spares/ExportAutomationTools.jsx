import React from "react";
import { Download, Flag, Edit3, Bell, UploadCloud } from "lucide-react";

const ExportAutomationToolsModern = () => (
  <div className="bg-[--bg-secondary] rounded-2xl shadow-md p-6 flex flex-col">
    <div className="flex items-center mb-6">
      <UploadCloud className="text-[--accent] mr-4" size={32} />
      <div>
        <h2 className="text-xl font-semibold text-[--text]">Automation Tools</h2>
        <p className="text-sm text-[--text-muted]">Streamline your workflows.</p>
      </div>
    </div>
    <div className="space-y-3">
      <button className="w-full py-3 px-4 bg-[--accent] hover:bg-[--accent-darker] text-white rounded-lg flex items-center justify-center gap-2 transition-colors">
        <Download className="w-5 h-5" /> Export Listings (CSV)
      </button>
      <button className="w-full py-3 px-4 bg-[--accent] hover:bg-[--accent-darker] text-white rounded-lg flex items-center justify-center gap-2 transition-colors">
        <Download className="w-5 h-5" /> Export Listings (PDF)
      </button>
      <button className="w-full py-3 px-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg flex items-center justify-center gap-2 transition-colors">
        <Bell className="w-5 h-5" /> Notify Inactive Listings
      </button>
      <button className="w-full py-3 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center justify-center gap-2 transition-colors">
        <Flag className="w-5 h-5" /> Flag Potential Issues
      </button>
      <button className="w-full py-3 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center justify-center gap-2 transition-colors">
        <Edit3 className="w-5 h-5" /> Bulk Edit Listings
      </button>
    </div>
  </div>
);

export default ExportAutomationToolsModern;