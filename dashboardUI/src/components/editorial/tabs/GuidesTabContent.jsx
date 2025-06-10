import GuidesSummaryCards from "../guides/CarGuideSummaryCards";
import GuideAnalyticsDashboard from "../guides/CarGuideAnalyticsDashboard";
import GuideEngagementCharts from "../guides/charts/CarGuideEngagementCharts";
import GuideSocialCommunityAnalytics from "../guides/CarGuideSocialCommunityAnalytics";
import GuideEditorForm from "../guides/editor/CarGuideEditorForm";
import GuideMonetizationCharts from "../guides/charts/CarGuideMonetizationCharts";

export default function GuidesTabContent() {
  return (
    <>
      <GuidesSummaryCards />
      <GuideAnalyticsDashboard />
      <GuideEngagementCharts />
      <GuideSocialCommunityAnalytics />
      <GuideEditorForm />
      <GuideMonetizationCharts />
    </>
  );
}