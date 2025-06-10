import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Report = lazy (() => import("./pages/Report"));

const App = () => {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reports" element={<Report />} />
      </Routes>
    </Router>
  )
}

export default App;