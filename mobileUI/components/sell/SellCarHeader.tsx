// components/sell/SellCarHeader.tsx
import { Colors } from "@/constants/Colors";
import React from "react";
import { Image, Text, useColorScheme, View } from "react-native";

export default function SellCarHeader() {
  const scheme = useColorScheme() || "light";
  const theme = Colors[scheme];

  return (
    <View className="px-5 pt-10 pb-6">
      <View className="flex-row items-center">
        {/* Left: Illustration */}
        <View style={{ flex: 1 }}>
          <Image
            source={require("@/assets/images/Manage.png")}
            style={{ width: "100%", height: 120 }}
            resizeMode="contain"
          />
        </View>

        {/* Right: Text Content */}
        <View style={{ flex: 1 }}>
          {/* Title */}
          <Text
            className="text-[20px] font-extrabold leading-snug"
            style={{ color: theme.text }}
          >
            Manage Your Inventory
          </Text>

          {/* Subtitle */}
          <Text
            className="text-[14px] mt-2 font-medium leading-relaxed"
            style={{ color: theme.muted }}
          >
            Easily list and manage your vehicle inventory on{" "}
            <Text style={{ color: theme.text, fontWeight: "600" }}>
              Deals
            </Text>
            <Text style={{ color: theme.accent, fontWeight: "700" }}>&</Text>
            <Text style={{ color: theme.text, fontWeight: "600" }}>
              Wheels
            </Text>
            .
          </Text>
        </View>
      </View>
    </View>
  );
}