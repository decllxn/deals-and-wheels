import { motion } from "framer-motion";

const AuthVisualPanel = ({ isSignUp }) => {
  return (
    <motion.div
      className="hidden md:flex flex-col justify-center items-center w-1/2 p-10 text-center relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, var(--accent-color), var(--accent-hover))",
        color: "#fff",
      }}
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

      {/* Floating Illustration */}
      <motion.img
        src="/authentication.png"
        alt="Authentication Illustration"
        className="w-48 mb-6 drop-shadow-2xl relative z-10"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Text */}
      <h2 className="text-4xl font-extrabold mb-3 relative z-10 drop-shadow-lg">
        {isSignUp ? "Join Deals & Wheels" : "Welcome Back!"}
      </h2>

      <p className="max-w-sm text-sm opacity-90 relative z-10 leading-relaxed">
        {isSignUp
          ? "Create your account and start your journey with trusted car dealers."
          : "Sign in to manage your listings and connect with verified buyers."}
      </p>

      {/* Decorative gradient circles */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl" />
      <div className="absolute -top-12 -left-12 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
    </motion.div>
  );
};

export default AuthVisualPanel;