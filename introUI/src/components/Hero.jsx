import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center bg-[var(--color-bg)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 grid md:grid-cols-2 gap-14 items-center">
        
        {/* ----------------------------------
            LEFT: Text Content
        ---------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-[var(--color-text)]">
            Building the Future of <br />
            <span className="text-[var(--color-accent)]">Digital Experiences.</span>
          </h1>

          {/* Tagline */}
          <p className="text-lg md:text-xl text-[var(--color-muted-text)] max-w-lg">
            A refined, intelligent platform designed to elevate how you interact,
            connect, and grow. Something powerful is on the way.
          </p>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="
              inline-block mt-4 px-8 py-4 rounded-xl font-semibold
              bg-[var(--color-accent)]
              text-white shadow-[var(--shadow-soft)]
              hover:bg-[var(--color-accent-hover)]
              transition-colors duration-300
            "
          >
            Join Waitlist
          </motion.button>
        </motion.div>

        {/* ----------------------------------
            RIGHT: Visual (Hero Image or Animation)
        ---------------------------------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex justify-center"
        >
          <div
            className="
              w-full max-w-md h-[360px]
              rounded-2xl overflow-hidden
              bg-[var(--color-surface)]
              border border-[var(--color-border)]
              shadow-[var(--shadow-soft)]
              flex items-center justify-center
            "
          >
            {/* Replace this placeholder with your 3D model, Lottie, or hero image */}
            <div className="text-center px-8 py-6">
              <p className="text-[var(--color-accent)] font-medium text-lg">
                🚀 Coming Soon
              </p>
              <p className="text-[var(--color-muted-text)] text-sm mt-2">
                Your 3D intro or mockup goes here.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}