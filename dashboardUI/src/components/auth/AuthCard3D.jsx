// components/auth/AuthCard3D.jsx
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import AuthBackground from "./AuthBackground";

const cardVariants = {
  login: {
    rotateY: 0,
    transition: { duration: 0.8, ease: [0.4, 0.0, 0.2, 1] },
  },
  signup: {
    rotateY: 180,
    transition: { duration: 0.8, ease: [0.4, 0.0, 0.2, 1] },
  },
};

const faceStyles = {
  position: "absolute",
  width: "100%",
  height: "100%",
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
};

export default function AuthCard3D() {
  const [authMode, setAuthMode] = useState("login");

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [8, -8]);
  const rotateY = useTransform(x, [-50, 50], [-8, 8]);

  const toggleMode = () =>
    setAuthMode((prev) => (prev === "login" ? "signup" : "login"));

  return (
    <AuthBackground>
      <motion.div
        className="relative w-[380px] h-[500px] rounded-xl overflow-hidden"
        style={{
          rotateY,
          rotateX,
          transformStyle: "preserve-3d",
          backgroundColor: "#f9f9f9",
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.3), 0 10px 20px rgba(0,0,0,0.15)",
        }}
        variants={cardVariants}
        animate={authMode}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onMouseMove={(e) => {
          const bounds = e.currentTarget.getBoundingClientRect();
          const offsetX = e.clientX - bounds.left - bounds.width / 2;
          const offsetY = e.clientY - bounds.top - bounds.height / 2;
          x.set(offsetX);
          y.set(offsetY);
        }}
        onMouseLeave={() => {
          x.set(0);
          y.set(0);
        }}
      >
        {/* Front - Login */}
        <motion.div className="rounded-xl p-8 text-[#1F2937]" style={faceStyles}>
          <LoginForm />
          <div className="text-center mt-6 text-sm text-[#6B7280]">
            Don’t have an account?{" "}
            <button
              onClick={toggleMode}
              className="text-[#FF6B6B] hover:underline font-medium transition-colors"
            >
              Sign up
            </button>
          </div>
        </motion.div>

        {/* Back - Signup */}
        <motion.div
          className="rounded-xl p-8 text-[#1F2937]"
          style={{ ...faceStyles, transform: "rotateY(180deg)" }}
        >
          <SignupForm />
          <div className="text-center mt-6 text-sm text-[#6B7280]">
            Already have an account?{" "}
            <button
              onClick={toggleMode}
              className="text-[#FF6B6B] hover:underline font-medium transition-colors"
            >
              Log in
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AuthBackground>
  );
}