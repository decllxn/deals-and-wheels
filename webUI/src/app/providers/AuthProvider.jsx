import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { jwtDecode } from "jwt-decode"; // ✅ Correct import for latest version
import authApi, {
  loginUser,
  registerUser,
  googleLogin,
  refreshToken,
  fetchCurrentUser,
} from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // actual user object
  const [access, setAccess] = useState(null); // access token
  const [refresh, setRefresh] = useState(null); // refresh token
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  // 🔐 Attach token to axios instance
  const setAuthHeader = (token) => {
    if (token) {
      authApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete authApi.defaults.headers.common["Authorization"];
    }
  };

  // 🧠 Load from localStorage on mount
  useEffect(() => {
    const storedAccess = localStorage.getItem("accessToken");
    const storedRefresh = localStorage.getItem("refreshToken");

    if (storedAccess && storedRefresh) {
      setAccess(storedAccess);
      setRefresh(storedRefresh);
      setAuthHeader(storedAccess);

      // Try fetching current user
      fetchCurrentUser()
        .then((data) => setUser(data))
        .catch(() => {
          // If tokens invalid, try refreshing
          (async () => {
            try {
              const r = await refreshToken(storedRefresh);
              const newAccess = r.access || r.token || null;
              if (newAccess) {
                localStorage.setItem("accessToken", newAccess);
                setAccess(newAccess);
                setAuthHeader(newAccess);
                const u = await fetchCurrentUser();
                setUser(u);
              } else {
                handleLogout();
              }
            } catch {
              handleLogout();
            }
          })();
        })
        .finally(() => setInitializing(false));
    } else {
      setInitializing(false);
    }
  }, []);

  // ♻️ Automatically refresh access token before expiry
  useEffect(() => {
    if (!access || !refresh) return;
    let timerId;
    try {
      const { exp } = jwtDecode(access);
      const ttl = exp * 1000 - Date.now();
      const refreshAt = Math.max(ttl - 40_000, 10_000); // refresh 40s early
      timerId = setTimeout(async () => {
        try {
          const r = await refreshToken(refresh);
          const newAccess = r.access || r.token || null;
          if (newAccess) {
            localStorage.setItem("accessToken", newAccess);
            setAccess(newAccess);
            setAuthHeader(newAccess);
          } else {
            handleLogout();
          }
        } catch {
          handleLogout();
        }
      }, refreshAt);
    } catch (e) {
      // token decode failed — ignore
    }
    return () => clearTimeout(timerId);
  }, [access, refresh]);

  // 📝 Register
  const handleRegister = async (email, password, confirmPassword) => {
    setLoading(true);
    try {
      const resp = await registerUser(email, password, confirmPassword);
      setLoading(false);
      return resp; // Let UI decide next steps
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  // 🔑 Login with email/password
  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      const tokens = await loginUser(email, password);
      if (!tokens?.access || !tokens?.refresh)
        throw new Error("Invalid tokens from server");

      localStorage.setItem("accessToken", tokens.access);
      localStorage.setItem("refreshToken", tokens.refresh);
      setAccess(tokens.access);
      setRefresh(tokens.refresh);
      setAuthHeader(tokens.access);

      const u = await fetchCurrentUser();
      setUser(u);
      setLoading(false);
      return { user: u, tokens };
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  // 🟢 Google login
  const handleGoogleLogin = async (googleToken) => {
    setLoading(true);
    try {
      const resp = await googleLogin(googleToken);
      if (!resp?.access || !resp?.refresh)
        throw new Error("Invalid tokens from Google login");

      localStorage.setItem("accessToken", resp.access);
      localStorage.setItem("refreshToken", resp.refresh);
      setAccess(resp.access);
      setRefresh(resp.refresh);
      setAuthHeader(resp.access);

      if (resp.email) {
        setUser({
          email: resp.email,
          first_name: resp.first_name,
          last_name: resp.last_name,
        });
      } else {
        const u = await fetchCurrentUser();
        setUser(u);
      }

      setLoading(false);
      return resp;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  // 🚪 Logout
  const handleLogout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setAccess(null);
    setRefresh(null);
    setUser(null);
    setAuthHeader(null);
  }, []);

  const value = {
    user,
    access,
    refresh,
    loading,
    initializing,
    isAuthenticated: !!user,
    register: handleRegister,
    login: handleLogin,
    googleLogin: handleGoogleLogin,
    logout: handleLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!initializing && children}
    </AuthContext.Provider>
  );
};

// ✅ Hook for easy access in components
export const useAuth = () => useContext(AuthContext);