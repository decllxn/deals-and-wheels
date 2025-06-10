import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ResponsiveLayoutWrapper = ({ children }) => (
  <div className="px-4 md:px-12 lg:px-20 xl:px-32 w-full max-w-screen-xl mx-auto">
    {children}
  </div>
);

const HeroSection = () => (
  <section className="min-h-screen flex flex-col md:flex-row">
    <ImagePanel />
    <ContentPanel />
  </section>
);

const ImagePanel = () => (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      className="w-full md:w-1/2 min-h-[50vh] md:min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('/buying-car.jpg')" }}
    >
      {/* Darker overlay */}
      <div className="absolute inset-0 bg-black/50 md:bg-black/40 z-0" />
  
      {/* Text content */}
      <div className="relative z-10 h-full w-full flex flex-col items-center justify-center px-4 py-12 md:py-0">
        <h1 className="text-white text-4xl md:text-6xl font-bold text-center drop-shadow-lg">
          Find Your Perfect Ride
        </h1>
        <p className="mt-4 text-white text-lg md:text-xl font-light drop-shadow">
          with <span className="font-semibold tracking-wide">Deals<span className="text-[var(--accent-color)]">&</span>Wheels</span>
        </p>
      </div>
    </motion.div>
);

const ContentPanel = () => (
  <motion.div
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 1 }}
    className="w-full md:w-1/2 bg-[var(--bg-color)] text-[var(--text-color)] flex flex-col justify-center px-6 py-12 gap-8"
  >
    <ResponsiveLayoutWrapper>
      <BackButton />
      <HeadlineText />
      <QuestionPrompt />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="flex gap-4 mt-6 flex-wrap"
      >
        <PrimaryButton text="Yes, I know exactly what I want" onClick={() => console.log('Navigate to car list')} />
        <Link to="/car-finder">
          <SecondaryButton text="I'm not sure what I want" onClick={() => console.log('Navigate to car quiz')} />     
        </Link>
      </motion.div>
      <TrustBadgeGroup />
    </ResponsiveLayoutWrapper>
  </motion.div>
);

const HeadlineText = () => (
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5 }}
    className="text-2xl md:text-3xl font-semibold leading-snug"
  >
    You’re in the right place to buy your next car — <span className="text-[var(--accent-color)]">fast</span>, <span className="text-[var(--accent-color)]">safe</span>, and <span className="text-[var(--accent-color)]">trusted</span>.
  </motion.h2>
);

const QuestionPrompt = () => (
  <motion.p
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8 }}
    className="text-lg text-[var(--muted-text)] mt-5"
  >
    Do you already know what car you want?
  </motion.p>
);

const PrimaryButton = ({ text, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    className="px-6 py-3 rounded-2xl font-medium bg-[var(--accent-color)] text-white hover:bg-[var(--accent-hover)] transition"
  >
    {text}
  </motion.button>
);

const SecondaryButton = ({ text, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    className="px-6 py-3 rounded-2xl font-medium border border-[var(--border-color)] bg-[var(--surface-color)] text-[var(--text-color)] hover:bg-[var(--highlight-color)] transition"
  >
    {text}
  </motion.button>
);

const TrustBadgeGroup = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.5 }}
    className="mt-10 flex flex-wrap gap-4 items-center text-[var(--muted-text)] text-sm"
  >
    <span>✔ Trusted by 10,000+ buyers</span>
    <span>✔ 100% Verified Listings</span>
    <span>✔ Active in East & Central Africa</span>
  </motion.div>
);

const BackButton = () => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    onClick={() => window.location.href = '/'}
    className="flex items-center gap-2 text-[var(--accent-color)] hover:text-[var(--accent-hover)] mb-6"
  >
    <ArrowLeft size={18} />
    <span>Back to Home</span>
  </motion.button>
);

const BuyCarPage = () => <HeroSection />;

export default BuyCarPage;