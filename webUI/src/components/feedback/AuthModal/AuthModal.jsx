import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import AuthForm from "./AuthForm";
import AuthVisualPanel from "./AuthVisualPanel";
import { registerUser, loginUser } from "../../../api/authApi";

const AuthModal = ({ showAuthModal, setShowAuthModal, isSignUp, setIsSignUp }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClose = () => {
    setShowAuthModal(false);
    setError("");
  };

  const handleSubmit = async (email, password, confirmPassword) => {
    setLoading(true);
    setError("");

    try {
      let response;

      if (isSignUp) {
        response = await registerUser(email, password, confirmPassword);
        console.log("✅ Registration successful:", response);
        setIsSignUp(false); // Switch to login mode
      } else {
        response = await loginUser(email, password);
        console.log("✅ Login successful:", response);

        // Save tokens locally
        localStorage.setItem("accessToken", response.access);
        localStorage.setItem("refreshToken", response.refresh);

        handleClose();

        // ✅ Refresh page after login to update Navbar/UI
        setTimeout(() => {
          window.location.reload();
        }, 300);
      }
    } catch (err) {
      console.error("❌ Auth error:", err);
      const message =
        typeof err === "string"
          ? err
          : err?.detail || err?.error || "Authentication failed.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {showAuthModal && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center px-4 backdrop-blur-sm"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.55)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            style={{
              backgroundColor: "var(--surface-color)",
              color: "var(--text-color)",
              border: "1px solid var(--border-color)",
            }}
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 30 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full hover:bg-[var(--bg-color)] transition"
              aria-label="Close"
            >
              <X size={22} style={{ color: "var(--text-color)" }} />
            </button>

            <AuthVisualPanel isSignUp={isSignUp} />

            <AuthForm
              isSignUp={isSignUp}
              onSubmit={handleSubmit}
              loading={loading}
              error={error}
              handleClose={handleClose}
              toggleMode={() => {
                setIsSignUp(!isSignUp);
                setError("");
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;