import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
  } from "recharts";
  import { motion } from "framer-motion";
  
  const blogSharesData = [
    { platform: "Facebook", shares: 155 },
    { platform: "X (Twitter)", shares: 130 },
    { platform: "Pinterest", shares: 110 },
    { platform: "LinkedIn", shares: 70 },
  ];
  
  const blogSentimentData = [
    { name: "Positive", value: 70 },
    { name: "Neutral", value: 20 },
    { name: "Negative", value: 10 },
  ];
  
  const blogCommentsData = [
    { article: "Ultimate Guide to...", comments: 120 },
    { article: "5 Tips for...", comments: 95 },
    { article: "Behind the Scenes of...", comments: 78 },
    { article: "Top Trends in...", comments: 62 },
    { article: "A Deep Dive into...", comments: 55 },
  ];
  
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.4, ease: "easeInOut" },
    }),
  };
  
  const sharedCardStyle = {
    backgroundColor: "var(--card)",
    borderColor: "var(--border)",
  };
  
  const BlogSocialSharesChart = ({ i }) => {
    return (
      <motion.div
        custom={i}
        variants={variants}
        initial="hidden"
        animate="visible"
        className="w-full"
      >
        <div className="rounded-lg shadow-md border" style={sharedCardStyle}>
          <div className="p-5">
            <h3 className="text-md font-semibold mb-3" style={{ color: "var(--text)" }}>
              Blog Shares by Platform
            </h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={blogSharesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="platform" fontSize={12} stroke="currentColor" tickLine={false} axisLine={false} />
                <YAxis fontSize={12} stroke="currentColor" tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--bg-secondary)",
                    color: "var(--text)",
                    border: "1px solid var(--border)",
                    borderRadius: 6,
                  }}
                  itemStyle={{ color: 'var(--text)' }}
                />
                <Bar dataKey="shares" fill="var(--accent)">
                  {blogSharesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>
    );
  };
  
  const BlogSentimentAnalysisChart = ({ i }) => {
    return (
      <motion.div
        custom={i}
        variants={variants}
        initial="hidden"
        animate="visible"
        className="w-full"
      >
        <div className="rounded-lg shadow-md border" style={sharedCardStyle}>
          <div className="p-5">
            <h3 className="text-md font-semibold mb-3" style={{ color: "var(--text)" }}>
              Blog Comment Sentiment
            </h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart layout="vertical" data={blogSentimentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis type="number" stroke="currentColor" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" stroke="currentColor" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--bg-secondary)",
                    color: "var(--text)",
                    border: "1px solid var(--border)",
                    borderRadius: 6,
                  }}
                  itemStyle={{ color: 'var(--text)' }}
                />
                <Bar dataKey="value">
                  <Cell fill="#16a34a" /> {/* Positive - green */}
                  <Cell fill="#facc15" /> {/* Neutral - yellow */}
                  <Cell fill="#ef4444" /> {/* Negative - red */}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>
    );
  };
  
  const MostCommentedBlogPostsList = ({ i }) => {
    return (
      <motion.div
        custom={i}
        variants={variants}
        initial="hidden"
        animate="visible"
        className="w-full"
      >
        <div className="rounded-lg shadow-md border" style={sharedCardStyle}>
          <div className="p-5">
            <h3 className="text-md font-semibold mb-4" style={{ color: "var(--text)" }}>
              Most Commented Blog Posts
            </h3>
            <ul className="space-y-2">
              {blogCommentsData.map((item, idx) => (
                <li
                  key={idx}
                  className="flex justify-between text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  <span className="truncate">{item.article}</span>
                  <span className="font-semibold text-[13px]" style={{ color: "var(--text)" }}>
                    {item.comments} comments
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    );
  };
  
  const BlogSocialCommunityAnalytics = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8 mb-8">
        <BlogSocialSharesChart i={0} />
        <BlogSentimentAnalysisChart i={1} />
        <MostCommentedBlogPostsList i={2} />
      </div>
    );
  };
  
  export default BlogSocialCommunityAnalytics;