import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogin } from "../../../api/authApi";

const AuthForm = ({
  isSignUp,
  onSubmit,
  loading,
  error,
  toggleMode,
  handleClose,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ✅ Centralized login success logic (used by both manual + Google)
  const handleLoginSuccess = (response) => {
    console.log("✅ Login successful:", response);

    localStorage.setItem("accessToken", response.access);
    localStorage.setItem("refreshToken", response.refresh);

    if (response.first_name) {
      alert(`Welcome, ${response.first_name}!`);
    }

    if (handleClose) handleClose();

    // Reload UI to reflect logged-in state (e.g. Navbar)
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await onSubmit(email, password, confirmPassword);
      handleLoginSuccess(response);
    } catch (err) {
      console.error("❌ Manual login failed:", err);
    }
  };

  return (
    <div
      className="w-full md:w-1/2 p-10 flex flex-col justify-center"
      style={{
        backgroundColor: "var(--surface-color)",
        color: "var(--text-color)",
        borderLeft: "1px solid var(--border-color)",
      }}
    >
      <h3 className="text-2xl font-bold mb-6 text-center md:text-left">
        {isSignUp ? "Create an Account" : "Sign In"}
      </h3>

      {error && (
        <p className="text-red-500 text-sm mb-4 text-center md:text-left">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all duration-200"
          style={{
            backgroundColor: "var(--bg-color)",
            color: "var(--text-color)",
            borderColor: "var(--border-color)",
          }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all duration-200"
          style={{
            backgroundColor: "var(--bg-color)",
            color: "var(--text-color)",
            borderColor: "var(--border-color)",
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {isSignUp && (
          <input
            type="password"
            placeholder="Confirm Password"
            className="px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all duration-200"
            style={{
              backgroundColor: "var(--bg-color)",
              color: "var(--text-color)",
              borderColor: "var(--border-color)",
            }}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        )}

        <button
          type="submit"
          className="py-3 rounded-xl font-semibold shadow-md transition-all duration-300 hover:brightness-110"
          style={{
            backgroundColor: "var(--accent-color)",
            color: "#fff",
          }}
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : isSignUp
            ? "Sign Up"
            : "Sign In"}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-6 opacity-80">
        <div className="flex-grow border-t border-[var(--border-color)]"></div>
        <span className="px-3 text-sm" style={{ color: "var(--muted-text)" }}>
          or
        </span>
        <div className="flex-grow border-t border-[var(--border-color)]"></div>
      </div>

      {/* ✅ Google Login */}
      <div className="flex items-center justify-center mt-4">
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            const token = credentialResponse.credential;
            try {
              const response = await googleLogin(token);
              handleLoginSuccess(response);
            } catch (error) {
              console.error("❌ Google login failed:", error);
              alert("Google login failed.");
            }
          }}
          onError={() => {
            console.log("❌ Google Login Failed");
          }}
        />
      </div>

      {/* Toggle */}
      <div className="text-center mt-6 text-sm">
        {isSignUp ? (
          <p>
            Already have an account?{" "}
            <button
              onClick={toggleMode}
              style={{ color: "var(--accent-color)" }}
              className="hover:underline font-medium"
            >
              Sign In
            </button>
          </p>
        ) : (
          <p>
            New here?{" "}
            <button
              onClick={toggleMode}
              style={{ color: "var(--accent-color)" }}
              className="hover:underline font-medium"
            >
              Create an Account
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;