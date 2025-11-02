// src/main.jsx
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App.jsx";
import ThemeProvider from "./context/ThemeContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

import "./main.css";
import "./css/Reviews.css";

// Create a single QueryClient instance for the app
const queryClient = new QueryClient();

// ✅ Your Google OAuth Client ID
const GOOGLE_CLIENT_ID =
  "155406158935-rpgm008ufb727l2lbgru4pqpf40mbsb0.apps.googleusercontent.com";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider>
            <App /> {/* App will handle all routing */}
          </ThemeProvider>
        </AuthProvider>
        {/* Optional Devtools for React Query debugging */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);