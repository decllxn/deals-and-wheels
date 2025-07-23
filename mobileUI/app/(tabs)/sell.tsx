import DashboardLink from "@/components/common/DashboardLink";
import AddListingCTA from "@/components/sell/AddListingCTA";
import ListingOverview from "@/components/sell/ListingsOverview";
import PlanStatusBar from "@/components/sell/PlanStatusBar";
import SellCarHeader from "@/components/sell/SellCarHeader";
import { Colors } from "@/constants/Colors";
import React from "react";
import { ScrollView, Text, View, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Sell() {
  const scheme = useColorScheme() || "light";
  const theme = Colors[scheme];

  return (
    <SafeAreaView
      edges={["top", "bottom", "left", "right"]}
      style={{ flex: 1, backgroundColor: theme.background }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 60,
        }}
      >
        {/* Page Title */}
        <View className="px-5 pt-6 pb-2">
          <Text className="text-[22px] font-bold" style={{ color: theme.text }}>
            Sell Your Car
          </Text>
        </View>

        {/* Header Illustration + Subtext */}
        <SellCarHeader />

         <View className="px-5 mt-4">
          <DashboardLink />
        </View>


        {/* Subscription Plan Status */}
        <View className="px-5 mt-3">
          <PlanStatusBar />
        </View>

        {/* Dashboard Portal Link */}
       
        {/* Add New Listing Call-to-Action */}
        <View className="px-5 mt-6">
          <AddListingCTA />
        </View>

        {/* Active Listings Overview */}
        <View className="px-5">
          <ListingOverview />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
