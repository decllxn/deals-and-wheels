// components/sell/ListingOverview.tsx
import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import {
    Pressable,
    ScrollView,
    Text,
    useColorScheme,
    View,
} from "react-native";
import ListingCard from "./ListingsCard";

const TABS = ["Active", "Drafts", "Archived"];

const mockListings = [
  {
    id: 1,
    title: "Toyota Corolla 2020",
    price: "KES 1,200,000",
    status: "Active",
    image: require("@/assets/images/landcruiser.jpg"),
  },
  {
    id: 2,
    title: "Mazda Demio 2015",
    price: "KES 780,000",
    status: "Paused",
    image: require("@/assets/images/landcruiser.jpg"),
  },
];

export default function ListingOverview() {
  const scheme = useColorScheme() || "light";
  const theme = Colors[scheme];
  const [activeTab, setActiveTab] = useState("Active");

  return (
    <View className="flex-1 px-5 bg-transparent">
      {/* Tab Switcher */}
      <View className="flex-row justify-center px-2">
        <View className="flex-row bg-transparent mb-3rounded-full p-1 space-x-2">
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <Pressable
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 20,
                  borderRadius: 999,
                  backgroundColor: isActive ? theme.accent : "transparent",
                }}
              >
                <Text
                  className="text-[14px] font-semibold"
                  style={{
                    color: isActive ? "#fff" : theme.text,
                  }}
                >
                  {tab}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Listings (Vertical Scroll, full width cards) */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="space-y-6">
          {mockListings
            .filter((listing) => {
              if (activeTab === "Active") return listing.status === "Active";
              if (activeTab === "Drafts") return listing.status === "Paused";
              if (activeTab === "Archived") return false; // no archived mock data
              return true;
            })
            .map((listing) => (
              <ListingCard
                key={listing.id}
                title={listing.title}
                price={listing.price}
                status={listing.status}
                image={listing.image}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}