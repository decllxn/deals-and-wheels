import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { registerUser, loginUser } from "../../api";

const AuthModal = ({ showAuthModal, setShowAuthModal, isSignUp, setIsSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        await registerUser(email, password, confirmPassword);
        alert("Account created successfully! You can now sign in.");
        setIsSignUp(false);
      } else {
        const data = await loginUser(email, password);
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        alert("Login successful!");
        setShowAuthModal(false);
      }
    } catch (err) {
      setError(err.detail || "An error occurred. Please try again.");
    }

    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/social/google/");
      if (!response.ok) throw new Error("Google login initiation failed.");
      const data = await response.json();

      const googleAuthWindow = window.open(data.authorization_url, "_blank", "width=600,height=600");

      const pollGoogleAuth = setInterval(async () => {
        try {
          if (googleAuthWindow.closed) {
            clearInterval(pollGoogleAuth);
            const loginCheckResponse = await fetch("/api/social/google/login_check/");
            if (loginCheckResponse.ok) {
              const loginData = await loginCheckResponse.json();
              localStorage.setItem("accessToken", loginData.access);
              localStorage.setItem("refreshToken", loginData.refresh);
              alert("Google login successful!");
              setShowAuthModal(false);
            } else {
              setError("Google login failed.");
            }
          }
        } catch {
          setError("Google login failed.");
          clearInterval(pollGoogleAuth);
        }
      }, 500);
    } catch (err) {
      setError(err.message || "Google login failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <AnimatePresence>
      {showAuthModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="p-8 rounded-2xl shadow-2xl max-w-sm w-full relative backdrop-blur-lg"
            style={{
              backgroundColor: "var(--surface-color)",
              color: "var(--text-color)",
              border: "1px solid var(--border-color)",
            }}
          >
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-2xl"
              style={{ color: "var(--muted-text)" }}
            >
              ✖
            </button>

            <div className="text-center">
              <h2 className="text-3xl font-bold mb-3">{isSignUp ? "Create an Account" : "Welcome Back!"}</h2>
              <p style={{ color: "var(--muted-text)" }}>
                {isSignUp ? "Join us and start bidding!" : "Sign in to continue."}
              </p>
            </div>

            {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

            <form className="flex flex-col space-y-4 mt-6" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                className="px-4 py-3 rounded-lg focus:outline-none"
                style={{
                  backgroundColor: "var(--bg-color)",
                  color: "var(--text-color)",
                  border: "1px solid var(--border-color)",
                  outlineColor: "var(--accent-color)",
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="px-4 py-3 rounded-lg focus:outline-none"
                style={{
                  backgroundColor: "var(--bg-color)",
                  color: "var(--text-color)",
                  border: "1px solid var(--border-color)",
                  outlineColor: "var(--accent-color)",
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {isSignUp && (
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="px-4 py-3 rounded-lg focus:outline-none"
                  style={{
                    backgroundColor: "var(--bg-color)",
                    color: "var(--text-color)",
                    border: "1px solid var(--border-color)",
                    outlineColor: "var(--accent-color)",
                  }}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              )}
              <button
                type="submit"
                className="px-5 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg"
                style={{
                  backgroundColor: "var(--accent-color)",
                  color: "#fff",
                }}
                disabled={loading}
              >
                {loading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
              </button>
            </form>

            <div className="flex items-center my-6">
              <div className="flex-grow" style={{ borderTop: "1px solid var(--border-color)" }}></div>
              <span className="px-3" style={{ color: "var(--muted-text)" }}>
                or
              </span>
              <div className="flex-grow" style={{ borderTop: "1px solid var(--border-color)" }}></div>
            </div>

            <div className="flex flex-col space-y-3">
              <button
                className="flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg"
                style={{ backgroundColor: "#fff", color: "#000" }}
                onClick={handleGoogleLogin}
                disabled={loading}
              >
                <i className="ri-google-fill text-xl mr-2"></i> Continue with Google
              </button>
              <button
                className="flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg"
                style={{ backgroundColor: "#1877F2", color: "#fff" }}
                onClick={() => alert("Facebook login not implemented yet.")}
                disabled={loading}
              >
                <i className="ri-facebook-fill text-xl mr-2"></i> Continue with Facebook
              </button>
              <button
                className="flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg"
                style={{ backgroundColor: "#000", color: "#fff" }}
                onClick={() => alert("X login not implemented yet.")}
                disabled={loading}
              >
                <i className="ri-twitter-x-fill text-xl mr-2"></i> Continue with X
              </button>
            </div>

            <div className="text-center mt-6 text-sm">
              {isSignUp ? (
                <p>
                  Already have an account?{" "}
                  <button
                    onClick={() => setIsSignUp(false)}
                    style={{ color: "var(--accent-color)" }}
                    className="hover:underline"
                  >
                    Sign In
                  </button>
                </p>
              ) : (
                <p>
                  New here?{" "}
                  <button
                    onClick={() => setIsSignUp(true)}
                    style={{ color: "var(--accent-color)" }}
                    className="hover:underline"
                  >
                    Create an Account
                  </button>
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;