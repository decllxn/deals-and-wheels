import BlogsSummaryCards from "../blogs/BlogsSummaryCards";
import BlogAnalyticsDashboard from "../blogs/BlogAnalyticsDashboard";
import BlogEngagementCharts from "../blogs/charts/BlogEngagementCharts";
import BlogSocialCommunityAnalytics from "../blogs/BlogSocialCommunityAnalytics";
import BlogEditorForm from "../blogs/editor/BlogEditorForm";
import BlogMonetizationCharts from "../blogs/charts/BlogMonetizationCharts";

export default function BlogsTabContent() {
  return (
    <>
      <BlogsSummaryCards />
      <BlogAnalyticsDashboard />
      <BlogEngagementCharts />
      <BlogSocialCommunityAnalytics />
      <BlogEditorForm />
      <BlogMonetizationCharts />
    </>
  );
}