import GlossarySummaryCards from "../glossary/GlossarySummaryCards";
import GlossaryAnalyticsDashboard from "../glossary/GlossaryAnalyticsDashboard";
import GlossaryEngagementCharts from "../glossary/charts/GlossaryEngagementCharts";
import GlossarySocialCommunityAnalytics from "../glossary/GlossarySocialCommunityAnalytics";
import GlossaryEditorForm from "../glossary/editor/GlossaryEditorForm";
import GlossaryMonetizationCharts from "../glossary/charts/GlossaryMonetizationCharts";

export default function GlossaryTabContent() {
  return (
    <>
      <GlossarySummaryCards />
      <GlossaryAnalyticsDashboard />
      <GlossaryEngagementCharts />
      <GlossarySocialCommunityAnalytics />
      <GlossaryEditorForm />
      <GlossaryMonetizationCharts />
    </>
  );
}