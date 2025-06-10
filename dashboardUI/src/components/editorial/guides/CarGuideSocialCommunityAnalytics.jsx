import { BarChart, Bar, Cell, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const guideSharesData = [
  { platform: 'Facebook', shares: 210 },
  { platform: 'X (Twitter)', shares: 180 },
  { platform: 'Pinterest', shares: 150 },
  { platform: 'LinkedIn', shares: 100 },
];

const guideSentimentData = [
  { name: 'Positive', value: 75 },
  { name: 'Neutral', value: 15 },
  { name: 'Negative', value: 10 },
];

const mostDiscussedGuidesData = [
  { guide: 'Best SUVs for Families', discussions: 150 },
  { guide: 'Top Fuel-Efficient Cars', discussions: 120 },
  { guide: 'How to Negotiate Car Price', discussions: 110 },
  { guide: 'Selling Your Car Privately', discussions: 90 },
  { guide: 'Guide to Car Financing', discussions: 85 },
];

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.4, ease: 'easeInOut' },
  }),
};

const sharedCardStyle = {
    backgroundColor: "var(--card)",
    borderColor: "var(--border)",
};

const CarGuideSocialSharesChart = ({ i }) => {
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
          <h3 className="text-md font-semibold mb-3" style={{ color: 'var(--text)' }}>
            Guide Shares by Platform
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={guideSharesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="platform" fontSize={12} stroke="currentColor" tickLine={false} axisLine={false} />
              <YAxis fontSize={12} stroke="currentColor" tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text)',
                  border: '1px solid var(--border)',
                  borderRadius: 6,
                }}
                itemStyle={{ color: 'var(--text)' }}
              />
              <Bar dataKey="shares" fill="var(--accent)">
                {guideSharesData.map((entry, index) => (
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

const CarGuideSentimentAnalysisChart = ({ i }) => {
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
          <h3 className="text-md font-semibold mb-3" style={{ color: 'var(--text)' }}>
            Guide Feedback Sentiment
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart layout="vertical" data={guideSentimentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis type="number" stroke="currentColor" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis dataKey="name" type="category" stroke="currentColor" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text)',
                  border: '1px solid var(--border)',
                  borderRadius: 6,
                }}
                itemStyle={{ color: 'var(--text)' }}
              />
              <Bar dataKey="value">
                <Cell fill="#16a34a" />
                <Cell fill="#facc15" />
                <Cell fill="#ef4444" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

const MostDiscussedCarGuidesList = ({ i }) => {
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
          <h3 className="text-md font-semibold mb-4" style={{ color: 'var(--text)' }}>
            Most Discussed Car Guides
          </h3>
          <ul className="space-y-2">
            {mostDiscussedGuidesData.map((item, idx) => (
              <li
                key={idx}
                className="flex justify-between text-sm"
                style={{ color: 'var(--text-muted)' }}
              >
                <span className="truncate">{item.guide}</span>
                <span className="font-semibold text-[13px]" style={{ color: 'var(--text)' }}>
                  {item.discussions}  discussions
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

const CarGuideSocialCommunityAnalytics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8 mb-8">
      <CarGuideSocialSharesChart i={0} />
      <CarGuideSentimentAnalysisChart i={1} />
      <MostDiscussedCarGuidesList i={2} />
    </div>
  );
};

export default CarGuideSocialCommunityAnalytics;