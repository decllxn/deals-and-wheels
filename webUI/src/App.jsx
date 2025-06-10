import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";

// Components
import Preloader from "./components/Weblayout/Preloader.jsx";

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const SellersDashboard = lazy(() => import("./pages/SellersDashBoard"));
const BuyersDashboard = lazy(() => import("./pages/BuyersDashBoard"));
const Blog = lazy(() => import("./pages/BlogHome"));
const BlogDetailPage = lazy(() => import("./pages/BlogDetailPage"));
const SellACar = lazy(() => import("./pages/SellACar"));
const Contact = lazy(() => import("./pages/ContactPage"));
const About = lazy(() => import("./pages/AboutPage"));
const Profile = lazy(() => import("./pages/ProfilePage"));
const Settings = lazy(() => import("./pages/SettingsPage.jsx"));
const Watchlist = lazy(() => import("./pages/WatchListPage.jsx"));
const Editorial = lazy(() => import('./pages/EditorialPage.jsx'));
const BuyCar = lazy(() => import("./pages/BuyCarPage.jsx"));
const CarQuizPage = lazy(() => import("./pages/CarQuizPage.jsx"));
const ManufacturerPage = lazy(() => import("./pages/manufacturer/ManufacturerPage.jsx"));
const ManufacturerListPage = lazy(() => import("./pages/manufacturer/ManufacturerListPage.jsx"));
const UsedCarsPage = lazy(() => import("./pages/UsedCarsPage.jsx"));
const UsedCarDetailsPage = lazy(() => import("./pages/UsedCarDetailsPage.jsx"));


const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<div className="text-center mt-20 text-lg">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sellers-dashboard" element={<SellersDashboard />} />
          <Route path="/buyers-dashboard" element={<BuyersDashboard />} />
          <Route path="/editorial/blogs" element={<Blog />} />
          <Route path="/editorial/blogs/:slug" element={<BlogDetailPage />} />
          <Route path="/sell-a-car" element={<SellACar />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/editorial" element={<Editorial />} />
          <Route path="/buy-a-car" element={<BuyCar />} />
          <Route path="/car-finder" element={<CarQuizPage />} />

          <Route path="/deals" element={<UsedCarsPage />} />
          <Route path="/deals/:slug" element={<UsedCarDetailsPage />} />


          <Route path="/manufacturers/:slug" element={<ManufacturerPage />} />
          <Route path="/manufacturers/" element={<ManufacturerListPage />}/>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
