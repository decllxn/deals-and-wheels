#!/bin/bash
set -e

echo "🚀 Starting Zamara React Project Restructure..."

# === 1. Create new directory structure ===
mkdir -p src/{app/{routes,providers,layout},assets/{images,icons,fonts},components/{ui,layout,feedback,data-display,form},features/{auth/{components,hooks,services,pages},dashboard/{components,pages},payments/{components,services,pages},dealers/{components,pages},vehicles/{components,pages}},hooks,lib/{api,utils,constants,config,types},pages/{Home,About,Pricing,NotFound},styles/theme,tests/__mocks__}

# === 2. Move or copy existing known files ===
# Core app files
mv src/App.jsx src/app/App.jsx 2>/dev/null || true
mv src/main.jsx src/main.jsx 2>/dev/null || true

# Contexts -> providers
mv src/context/AuthContext.jsx src/app/providers/AuthProvider.jsx 2>/dev/null || true
mv src/context/ThemeContext.jsx src/app/providers/ThemeProvider.jsx 2>/dev/null || true
mv src/context/ChatContext.jsx src/app/providers/ChatProvider.jsx 2>/dev/null || true

# APIs -> lib/api
mv src/api src/lib/api 2>/dev/null || true
mv src/api.js src/lib/api/api.js 2>/dev/null || true
mv src/api2.js src/lib/api/api2.js 2>/dev/null || true

# Constants and utils
mv src/constants src/lib/constants 2>/dev/null || true
mv src/constants.js src/lib/constants/index.js 2>/dev/null || true
mv src/utils src/lib/utils 2>/dev/null || true

# CSS -> styles
mv src/css src/styles/css 2>/dev/null || true
mv src/main.css src/styles/globals.css 2>/dev/null || true
mv src/theme.css src/styles/theme/theme.css 2>/dev/null || true

# === 3. Preserve existing assets ===
mkdir -p src/assets
# Nothing to move if already under src/assets

# === 4. Add placeholders for new shared UI components ===
touch src/components/ui/{Button.jsx,Input.jsx,Card.jsx,Modal.jsx,index.js}
touch src/components/layout/{Header.jsx,Sidebar.jsx,Footer.jsx,index.js}
touch src/components/feedback/{Toast.jsx,Alert.jsx,index.js}
touch src/components/data-display/{Table.jsx,Chart.jsx,index.js}
touch src/components/form/{TextField.jsx,Select.jsx,Checkbox.jsx,index.js}

# === 5. Add base files for routes and layouts ===
cat > src/app/routes/index.jsx << 'EOF'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routeConfig from "./routeConfig";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Add your routes here */}
      </Routes>
    </Router>
  );
}
EOF

cat > src/app/routes/routeConfig.js << 'EOF'
export const routes = {
  HOME: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  VEHICLES: "/vehicles",
};
export default routes;
EOF

# === 6. Add placeholders for layout files ===
touch src/app/layout/{DashboardLayout.jsx,AuthLayout.jsx,index.js}

# === 7. Add theme placeholders ===
touch src/styles/theme/{light.js,dark.js}

# === 8. Add test setup ===
touch src/tests/setupTests.js

# === 9. Add keep files to empty dirs ===
find src -type d -empty -exec touch {}/.keep \;

echo "✅ Restructure completed successfully!"
echo "👉 Review the new src/ folder before deleting old files."