import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";

// 🖼️ Import category PNGs
import SedanPng from "@/assets/images/Sedan.png";
import CoupePng from "@/assets/images/Coupe.png";
import PickupPng from "@/assets/images/pickup-truck.png";
import HatchbackPng from "@/assets/images/hatchback.png";
import SuvPng from "@/assets/images/SUV.png";
import ConvertiblePng from "@/assets/images/Convertible.png"; // ✅ Added

const categories = [
  {
    label: "Sedan",
    image: SedanPng,
    color: "#3B82F6",
  },
  {
    label: "SUV",
    image: SuvPng,
    color: "#F97316",
  },
  {
    label: "Hatchback",
    image: HatchbackPng,
    color: "#10B981",
  },
  {
    label: "Pickup",
    image: PickupPng,
    color: "#EF4444",
  },
  {
    label: "Coupe",
    image: CoupePng,
    color: "#A855F7",
  },
  {
    label: "Convertible",
    image: ConvertiblePng,
    color: "#0EA5E9", // Sky Blue
  },
];

const ITEM_WIDTH = (Dimensions.get("window").width - 48) / 2;

export default function BrowseByCategory() {
  const theme = useColorScheme() || "light";
  const colorTheme = Colors[theme];

  return (
    <View className="px-4 mt-10">
      <Text
        className="text-2xl font-bold mb-4"
        style={{ color: colorTheme.text }}
      >
        Browse by Category
      </Text>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          rowGap: 16,
        }}
      >
        {categories.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            activeOpacity={0.85}
            style={{
              width: ITEM_WIDTH,
              backgroundColor: colorTheme.surface,
              paddingVertical: 24,
              borderRadius: 16,
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#000",
              shadowOpacity: theme === "dark" ? 0.04 : 0.08,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 4 },
              elevation: 4,
            }}
          >
            <View
              style={{
                backgroundColor: item.color + "22",
                padding: 12,
                borderRadius: 999,
                marginBottom: 10,
              }}
            >
              <Image
                source={item.image}
                style={{
                  width: 36,
                  height: 36,
                  resizeMode: "contain",
                }}
              />
            </View>

            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: colorTheme.text,
              }}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}