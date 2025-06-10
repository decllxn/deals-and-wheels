import React from "react";
import { AlertTriangle, FlagIcon, Edit3 } from 'lucide-react';

const ExportAutomationTools = () => (
  <div className="bg-[var(--bg)] rounded-3xl p-6 shadow-lg">
    <div className="flex items-center mb-6">
      <div className="text-4xl text-[var(--accent)] mr-4">🔄</div>
      <div>
        <h2 className="text-2xl font-semibold text-[var(--text)]">
          Export & Automation Tools
        </h2>
        <p className="text-sm text-[var(--text-muted)]">
          Streamline your workflow with these tools.
        </p>
      </div>
    </div>

    <div className="space-y-4">
      <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-start transition-colors duration-200">
        Export Listings Report (CSV)
      </button>
      <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-start transition-colors duration-200">
        Export Listings Report (PDF)
      </button>
      <button className="w-full py-3 px-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg flex items-center justify-start transition-colors duration-200">
        <AlertTriangle className="w-5 h-5 mr-2" />
        Notify Dealers of Inactive Listings
      </button>
      <button className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center justify-start transition-colors duration-200">
        <FlagIcon className="w-5 h-5 mr-2" />
        Auto-Flag Issues
      </button>
      <button className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-start transition-colors duration-200">
        <Edit3 className="w-5 h-5 mr-2" />
        Bulk-Edit Listings
      </button>
    </div>
  </div>
);

export default ExportAutomationTools;
