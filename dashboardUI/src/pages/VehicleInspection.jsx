import React from "react";
import AppLayout from "../components/layout/AppLayout";

// Import inspection modules
import InspectionSummaryCards from "../components/inspections/InspectionSummaryCards";
import InspectionRecordsTable from "../components/inspections/InspectionRecordsTable";
import InspectionReportModal from "../components/inspections/InspectionReportModal";
import ScheduleInspectionForm from "../components/inspections/ScheduleInspectionForm";
import InspectionAnalytics from "../components/inspections/InspectionAnalytics";
import InspectionAlertsPanel from "../components/inspections/InspectionAlertsPanel";
import InspectorsManagementPanel from "../components/inspections/InspectorsManagementPanel";

const VehicleInspection = () => {
  return (
    <AppLayout>
      <div className="w-full flex flex-col gap-10 px-4 py-6 md:px-8 xl:px-10">
        {/* Summary KPI Cards */}
        <section>
          <InspectionSummaryCards />
        </section>

        {/* Records & Form Panel */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Side Panel */}
          <div className="flex flex-col gap-6">
            <InspectionAlertsPanel />
            <ScheduleInspectionForm />
          </div>

          {/* Table Panel */}
          <div className="xl:col-span-2">
            <InspectionRecordsTable />
          </div>
        </section>

        {/* Inspection Insights */}
        <section>
          <InspectionAnalytics />
        </section>

        {/* Inspector Management */}
        <section>
          <InspectorsManagementPanel />
        </section>

        {/* Report Viewer Modal - controlled via state inside */}
        <InspectionReportModal />
      </div>
    </AppLayout>
  );
};

export default VehicleInspection;