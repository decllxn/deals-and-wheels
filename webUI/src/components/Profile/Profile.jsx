import React from "react";
import ProfileInfo from "./ProfileInfo";
import BidHistorySection from "./BidHistorySection";
import UserAuctionComments from "./UserAuctionComments";
import UserCarsForSaleComments from "./UserCarsForSaleComments";
import UserCommunities from "./UserCommunities";
import DashboardSection from "./DashboardSection";


const Profile = () => {
    return (
        <div>
            <ProfileInfo />
            <DashboardSection />
            <BidHistorySection />
            <UserAuctionComments />
            <UserCarsForSaleComments />
            <UserCommunities />
        </div>
    )
}

export default Profile