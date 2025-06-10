import React, { useState, useEffect } from "react";
import CarImageGallery from "./CarImageGallery";
import CarAuctionDetails from "./CarAuctionDetails";
import CarSpecifications from "./CarSpecifications";
import SidebarListings from "./SidebarListings";
import DataShowcase from "./DataShowcase";
import CarWalkaroundVideo from "./CarWalkaroundVideo";
import CarHeader from "./CarHeader";
import StickyBidBar from "./StickyBidBar";
import CommentSection from "./CommentSection";
import VehicleAuctionInfo from "./VehicleAuctionInfo";

const CarDetails = () => {
  const [auction, setAuction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [featuredListings, setFeaturedListings] = useState([]);
  const [endingSoonListings, setEndingSoonListings] = useState([]);
  const [newListings, setNewListings] = useState([]);
  const [sidebarLoading, setSidebarLoading] = useState(true);
  const [sidebarError, setSidebarError] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1024); // Adjust breakpoint as needed

  useEffect(() => {
    const fetchAuctionDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const auctionId = 2;
        const response = await fetch(`http://127.0.0.1:8000/auctions/auctions/${auctionId}/`);
        if (!response.ok) throw new Error(`Failed to fetch auction details: ${response.status}`);
        const data = await response.json();
        setAuction(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching auction details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAuctionDetails();
  }, []);

  useEffect(() => {
    const fetchSidebarListings = async () => {
      setSidebarLoading(true);
      setSidebarError(null);
      try {
        const featuredResponse = await fetch('http://127.0.0.1:8000/auctions/auctions/?is_featured=true&limit=4');
        if (!featuredResponse.ok) throw new Error(`Failed to fetch featured auctions: ${featuredResponse.status}`);
        const featuredData = await featuredResponse.json();
        setFeaturedListings(featuredData.results || featuredData);

        const endingSoonResponse = await fetch('http://127.0.0.1:8000/auctions/auctions/?ordering=auction_deadline&limit=4');
        if (!endingSoonResponse.ok) throw new Error(`Failed to fetch ending soon auctions: ${endingSoonResponse.status}`);
        const endingSoonData = await endingSoonResponse.json();
        setEndingSoonListings(endingSoonData.results || endingSoonData);

        const newResponse = await fetch('http://127.0.0.1:8000/auctions/auctions/?ordering=-created_at&limit=4');
        if (!newResponse.ok) throw new Error(`Failed to fetch new listings: ${newResponse.status}`);
        const newData = await newResponse.json();
        setNewListings(newData.results || newData);
      } catch (err) {
        setSidebarError(err.message);
        console.error("Error fetching sidebar listings:", err);
      } finally {
        setSidebarLoading(false);
      }
    };

    fetchSidebarListings();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024); // Adjust breakpoint as needed
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAddComment = (newComment) => {
    setComments([...comments, { ...newComment, id: Date.now(), timestamp: new Date() }]);
  };

  if (loading) return <div className="container mx-auto px-4 py-10 mt-10">Loading car details...</div>;
  if (error) return <div className="container mx-auto px-4 py-10 mt-10">Error loading car details: {error}</div>;
  if (!auction) return <div className="container mx-auto px-4 py-10 mt-10">Car details not found.</div>;

  return (
    <div className="container mx-auto px-4 py-10 mt-10">
      <CarHeader auction={auction} />
      {auction.images && <CarImageGallery images={auction.images} />}
      <div className={`grid grid-cols-1 ${isSmallScreen ? '' : 'lg:grid-cols-5'} gap-10`}>
        <div className={`${isSmallScreen ? '' : 'lg:col-span-3'}`}>
          <CarAuctionDetails auction={auction} />
          {!isSmallScreen && (
            <StickyBidBar
              auction={auction}
              comments={comments.length}
            />
          )}
          <CarSpecifications
            details={{
              Make: auction.make,
              Model: auction.model,
              Transmission: auction.transmission,
              Engine: auction.engine,
              Fuel: auction.fuel_type,
              Mileage: `${auction.mileage.toLocaleString()} km`,
            }}
          />
          <DataShowcase
            title="Car Overview"
            sections={[
              { title: "Description", content: [auction.description] },
              { title: "Equipment", content: auction.equipment.length > 0 ? auction.equipment : ["No specific equipment listed."] },
              { title: "Modifications", content: auction.modifications.length > 0 ? auction.modifications : ["No modifications listed."] },
              { title: "Known Flaws", content: auction.known_flaws.length > 0 ? auction.known_flaws : ["No known flaws listed."] },
            ]}
          />
          <div>
            {auction.videos && auction.videos.length > 0 && (
              <CarWalkaroundVideo videoUrl={auction.videos[0].url} />
            )}
          </div>
          <CommentSection comments={comments} onAddComment={handleAddComment} />
          <VehicleAuctionInfo auction={auction}/>
        </div>
        {!isSmallScreen && (
          <div className="lg:col-span-2">
            {sidebarLoading ? (
              <div className="bg-[#1f1f1f] text-white p-5 rounded-xl mb-5 mt-10 shadow-lg border border-gray-800">
                Loading sidebar listings...
              </div>
            ) : sidebarError ? (
              <div className="bg-[#1f1f1f] text-white p-5 rounded-xl mb-5 mt-10 shadow-lg border border-gray-800">
                Error loading sidebar listings: {sidebarError}
              </div>
            ) : (
              <SidebarListings
                featuredListings={featuredListings}
                endingSoonListings={endingSoonListings}
                newListings={newListings}
              />
            )}
          </div>
        )}
        {isSmallScreen && (
          <StickyBidBar
            auction={auction}
            comments={comments.length}
          />
        )}
      </div>
    </div>
  );
};

export default CarDetails;