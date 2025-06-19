import Navbar from "./Navbar";
import Breadcrumbs from "./topbar/Breadcrumbs";
import WhyDealsAndWheels from "./WhyDealsAndWheels";
import Footer from "./Footer";

const PageWrapper = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="relative">
        <Breadcrumbs />
        {children}
        <WhyDealsAndWheels />
      </div>
      <Footer />
    </div>
  );
};

export default PageWrapper;