import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

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

const ImagePanel = ({ imageUrl }) => (
  <motion.div
    initial={{ opacity: 0, x: -40 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 1 }}
    className="w-full md:w-1/2 min-h-[50vh] md:min-h-screen bg-cover bg-center"
    style={{ backgroundImage: `url('${imageUrl}')` }}
  >
    <div className="h-full w-full bg-black/30 md:bg-black/40 flex flex-col items-center justify-center">
      <h1 className="text-white text-4xl md:text-6xl font-bold text-center px-4 drop-shadow-lg">
        Find Your Perfect Ride
      </h1>
      <p className="mt-4 text-white text-lg md:text-xl font-light drop-shadow">
        with <span className="font-semibold tracking-wide">Deals<span className="text-[var(--accent-color)]">&</span>Wheels</span>
      </p>
    </div>
  </motion.div>
);

const ContentPanel = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [imageUrl, setImageUrl] = useState('/quiz-background.jpg');

  const questions = [
    {
      question: "What’s your budget range?",
      options: ["Below $5k", "$5k–$10k", "$10k–$20k", "$20k+"],
      imageUrl: "/buying-car.jpg",
    },
    {
      question: "How do you plan to use the car?",
      options: ["Daily commute", "Long-distance travel", "Business use", "Off-road", "Family"],
      imageUrl: "/handshake.jpg",
    },
    {
      question: "Preferred fuel type?",
      options: ["Petrol", "Diesel", "Hybrid", "Electric", "No preference"],
      imageUrl: "/buying-car.jpg",
    },
    {
      question: "Transmission type?",
      options: ["Automatic", "Manual", "No preference"],
      imageUrl: "/handshake.jpg",
    },
    {
      question: "How many seats do you need?",
      options: ["2", "4", "5", "7+"],
      imageUrl: "/seats.jpg",
    },
    {
      question: "Do you care more about performance or fuel efficiency?",
      options: ["Performance", "Fuel Efficiency", "Balance"],
      imageUrl: "/performance.jpg",
    },
    {
      question: "Do you prefer a specific body type?",
      options: ["Sedan", "Hatchback", "SUV", "Truck", "Van", "Coupe"],
      imageUrl: "/body-type.jpg",
    },
    {
      question: "How important is brand reputation to you?",
      options: ["Very", "Somewhat", "Not really"],
      imageUrl: "/brand-reputation.jpg",
    },
    {
      question: "Do you want a newer model or open to older ones?",
      options: ["New only (2020+)", "Open to older models"],
      imageUrl: "/model-age.jpg",
    },
    {
      question: "Any features you must have?",
      options: ["Air Conditioning", "Bluetooth", "Rear Camera", "Navigation", "Doesn’t matter"],
      imageUrl: "/features.jpg",
    },
  ];

  const handleNext = (answer) => {
    setAnswers([...answers, answer]);

    // Update the current step and image for the next question
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
      setImageUrl(questions[currentStep + 1].imageUrl);
    }
  };

  const progressPercentage = ((currentStep + 1) / questions.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      className="w-full md:w-1/2 bg-[var(--bg-color)] text-[var(--text-color)] flex flex-col justify-center px-6 py-12 gap-8"
    >
      <ResponsiveLayoutWrapper>
        <BackButton />
        <HeadlineText />
        <QuestionPrompt question={questions[currentStep].question} />
        <OptionsList
          options={questions[currentStep].options}
          onOptionClick={handleNext}
        />
        <ProgressBar percentage={progressPercentage} />
      </ResponsiveLayoutWrapper>
    </motion.div>
  );
};

const HeadlineText = () => (
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5 }}
    className="text-2xl md:text-3xl font-semibold leading-snug"
  >
    Answer a few questions to help us find your perfect ride.
  </motion.h2>
);

const QuestionPrompt = ({ question }) => (
  <motion.p
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8 }}
    className="text-lg text-[var(--muted-text)]"
  >
    {question}
  </motion.p>
);

const OptionsList = ({ options, onOptionClick }) => (
  <div className="mt-6 flex flex-col gap-4">
    {options.map((option, index) => (
      <motion.button
        key={index}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => onOptionClick(option)}
        className="px-6 py-3 rounded-2xl font-medium bg-[var(--accent-color)] text-white hover:bg-[var(--accent-hover)] transition ease-in-out duration-200"
      >
        {option}
      </motion.button>
    ))}
  </div>
);

const ProgressBar = ({ percentage }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1 }}
    className="mt-4"
  >
    <div className="relative pt-1">
      <div className="flex mb-2 items-center justify-between">
        <div>
          <span className="font-semibold text-xs uppercase text-[var(--muted-text)]">
            Progress
          </span>
        </div>
        <div>
          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[var(--muted-text)]">
            {percentage}% Complete
          </span>
        </div>
      </div>
      <div className="flex mb-2">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-[var(--accent-color)] h-2.5 rounded-full"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
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

const CarQuizPage = () => <HeroSection />;

export default CarQuizPage;