// components/sell/AddListingCTA.tsx
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View, useColorScheme } from "react-native";

export default function AddListingCTA() {
  const scheme = useColorScheme() || "light";
  const theme = Colors[scheme];
  const router = useRouter();

  return (
    <View className="px-5 mt-2 mb-8">
      <Pressable
        onPress={() => router.push("/sell/create")}
        className="flex-row items-center justify-center rounded-2xl py-4"
        style={{
          backgroundColor: theme.accent,
          shadowColor: scheme === "dark" ? "#000" : "#ccc",
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 3,
        }}
      >
        <Ionicons name="add-circle-outline" size={22} color="#fff" />
        <Text className="ml-2 text-white font-semibold text-[16px]">
          Add New Listing
        </Text>
      </Pressable>
    </View>
  );
}
