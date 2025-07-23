// components/profile/BecomeDealerCard.tsx
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export default function BecomeDealerCard() {
  const router = useRouter();
  const scheme = useColorScheme() || "light";
  const theme = Colors[scheme];

  return (
    <View
      className="mx-5 mt-6 p-5 rounded-2xl shadow-md"
      style={{
        backgroundColor: theme.surface,
        shadowColor: scheme === "dark" ? "#000" : "#ccc",
      }}
    >
      <Text className="text-lg font-bold mb-1" style={{ color: theme.text }}>
        Are you a car dealer?
      </Text>

      <Text className="text-sm mb-4" style={{ color: theme.muted }}>
        Join our marketplace and unlock exclusive tools to showcase and manage your listings.
      </Text>

      <TouchableOpacity
        onPress={() => router.push("/dealer/benefits")}
        className="flex-row items-center justify-center px-4 py-3 rounded-xl"
        style={{ backgroundColor: theme.accent }}
      >
        <Ionicons name="flash-outline" size={18} color="#fff" />
        <Text className="ml-2 text-white font-semibold text-sm">
          See Dealer Benefits
        </Text>
      </TouchableOpacity>
    </View>
  );
}
