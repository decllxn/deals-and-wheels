import React from "react";
import DealerListingManager from "./DealerListingManager";
import DealerDashboard from "./DealerDashboard";
import { useAuth } from "../../../context/AuthContext";

const Dashboard = () => {
  const { user, isAuthenticated, loading } = useAuth();

  // Log user info for debugging
  console.log("Logged in user:", user);
  console.log("Is authenticated:", isAuthenticated);

  if (loading) return <p>Loading...</p>;

  if (!isAuthenticated) return <p>Please log in to access the dashboard.</p>;

  // Ensure the user has a dealer profile
  if (!user?.dealer_profile) return <p className="mt-30">Only dealers can access this page.</p>;

  return (
    <div className="space-y-8 mt-45">
      {/* Pass the dealerId to DealerDashboard */}
      <DealerDashboard dealerId={user.dealer_profile.id} />
      <DealerListingManager />
    </div>
  );
};

export default Dashboard;