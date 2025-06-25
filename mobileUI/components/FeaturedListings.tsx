import React from "react";
import { View, Text, FlatList } from "react-native";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import { mockCars } from "@/constants/mockCars";
import CarCard from "./CarCard";

export default function FeaturedListings() {
  const theme = useColorScheme() || "light";
  const colorTheme = Colors[theme];

  const edgeSpacing = 16;
  const interCardSpacing = 6; // 👈 reduced space between cards

  return (
    <View>
      {/* Section Title */}
      <View style={{ paddingHorizontal: edgeSpacing }}>
        <Text
          className="text-xl font-bold tracking-tight"
          style={{ color: colorTheme.text }}
        >
          Featured Listings
        </Text>
      </View>

      {/* Horizontal Card List */}
      <FlatList
        data={mockCars}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({ item, index }) => {
          const isFirst = index === 0;
          const isLast = index === mockCars.length - 1;

          return (
            <View
              style={{
                marginLeft: isFirst ? edgeSpacing : interCardSpacing / 2,
                marginRight: isLast ? edgeSpacing : interCardSpacing / 2,
              }}
            >
              <CarCard car={item} />
            </View>
          );
        }}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: 24,
        }}
        decelerationRate="fast"
        snapToAlignment="start"
        scrollEventThrottle={16}
      />
    </View>
  );
}