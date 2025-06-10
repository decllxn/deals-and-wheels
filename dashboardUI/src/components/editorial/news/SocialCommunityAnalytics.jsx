import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
    BarChart,
    Bar,
    Cell,
  } from "recharts";
  import { motion } from "framer-motion";
  
  const sharesData = [
    { platform: "Facebook", shares: 210 },
    { platform: "X (Twitter)", shares: 185 },
    { platform: "LinkedIn", shares: 95 },
    { platform: "Reddit", shares: 140 },
  ];
  
  const sentimentData = [
    { name: "Positive", value: 62 },
    { name: "Neutral", value: 24 },
    { name: "Negative", value: 14 },
  ];
  
  const commentsData = [
    { article: "EVs 2025", comments: 84 },
    { article: "SUV Guide", comments: 66 },
    { article: "Luxury Brands", comments: 58 },
    { article: "Car Mods", comments: 47 },
    { article: "EV vs Hybrid", comments: 41 },
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
  
  const SocialSharesChart = ({ i }) => {
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
              Social Shares by Platform
            </h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={sharesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="platform" fontSize={12} stroke="currentColor" />
                <YAxis fontSize={12} stroke="currentColor" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--bg-secondary)",
                    color: "var(--text)",
                    border: "1px solid var(--border)",
                    borderRadius: 6,
                  }}
                />
                <Bar dataKey="shares" fill="var(--accent)">
                  {sharesData.map((entry, index) => (
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
  
  const SentimentAnalysisChart = ({ i }) => {
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
              Comment Sentiment Breakdown
            </h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart layout="vertical" data={sentimentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis type="number" stroke="currentColor" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="currentColor" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--bg-secondary)",
                    color: "var(--text)",
                    border: "1px solid var(--border)",
                    borderRadius: 6,
                  }}
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
  
  const MostCommentedArticlesList = ({ i }) => {
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
              Most Commented Articles
            </h3>
            <ul className="space-y-2">
              {commentsData.map((item, idx) => (
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
  
  const SocialCommunityAnalytics = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8 mb-8">
        <SocialSharesChart i={0} />
        <SentimentAnalysisChart i={1} />
        <MostCommentedArticlesList i={2} />
      </div>
    );
  };
  
  export default SocialCommunityAnalytics;  