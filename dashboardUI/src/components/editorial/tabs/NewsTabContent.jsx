import NewsArticlesSummaryCards from "../news/NewsArticlesSummaryCards";
import NewsAnalyticsDashboard from "../news/NewsAnalyticsDashboard";
import NewsEngagementCharts from "../news/charts/NewsEngagementCharts";
import SocialCommunityAnalytics from "../news/SocialCommunityAnalytics";
import NewsEditorForm from "../news/editor/NewsEditorForm";
import MonetizationCharts from "../news/charts/MonetizationCharts";

export default function NewsTabContent() {
  return (
    <>
      <NewsArticlesSummaryCards />
      <NewsAnalyticsDashboard />
      <NewsEngagementCharts />
      <SocialCommunityAnalytics />
      <NewsEditorForm />
      <MonetizationCharts />
    </>
  );
}