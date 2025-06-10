// components/auth/LoginForm.jsx
import { motion } from "framer-motion";

const formVariants = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, delay: 0.2 } },
  exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.3 } },
};

export default function LoginForm() {
  return (
    <motion.div
      className="space-y-6"
      variants={formVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <h2 className="text-2xl font-bold text-center text-[var(--text)]">
        Welcome Back
      </h2>

      <form className="space-y-4">
        <div>
          <label className="text-sm font-medium block mb-1" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            className="w-full px-4 py-2 border rounded-md bg-transparent text-[var(--text)] border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
          />
        </div>

        <div>
          <label className="text-sm font-medium block mb-1" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            className="w-full px-4 py-2 border rounded-md bg-transparent text-[var(--text)] border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 mt-2 rounded-md font-semibold bg-[var(--accent)] text-white hover:opacity-90 transition"
        >
          Log In
        </button>
      </form>
    </motion.div>
  );
}