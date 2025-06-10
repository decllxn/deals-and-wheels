import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Report = lazy (() => import("./pages/Report"));
const Sales = lazy(() => import("./pages/Sales"));
const Auctions = lazy(() => import("./pages/Auctions"));
const Inventory = lazy(() => import("./pages/Inventory"));
const Payments = lazy(() => import("./pages/Payments"));
const Listings = lazy(() => import("./pages/VehicleListings"));
const Spares = lazy(() => import("./pages/Spares"));
const Inspection = lazy(() => import("./pages/VehicleInspection"));
const Editorial = lazy(() => import("./pages/Editorial"));
const Auth = lazy(() => import("./pages/AuthPage"));



const App = () => {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reports" element={<Report />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/auctions" element={<Auctions />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/vehicles" element={<Listings />} />
        <Route path="/spare-parts" element={<Spares />} />
        <Route path="/inspections" element={<Inspection />} />
        <Route path="/editorial" element={<Editorial />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  )
}

export default App;