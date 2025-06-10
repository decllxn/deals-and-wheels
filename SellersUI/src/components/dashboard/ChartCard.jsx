// components/ChartCard.js
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1 } }),
};

const ChartCard = ({ index, className = '', title, children }) => (
  <motion.div
    custom={index}
    variants={cardVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    className={`bg-[var(--card)] rounded-2xl shadow-md p-4 w-full ${className}`}
  >
    {title && <h3 className="text-lg font-semibold text-[var(--text)] mb-2">{title}</h3>}
    {children}
  </motion.div>
);

export default ChartCard;