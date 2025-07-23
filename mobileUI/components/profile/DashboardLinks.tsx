import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  Pressable,
  Text,
  useColorScheme,
  View,
} from "react-native";

// @ts-ignore
import FavoritesSvg from "@/assets/images/Favorites.svg";

interface Props {
  savedCount?: number;
  isDealer?: boolean;
}

export default function DashboardLinks({
  savedCount = 0,
  isDealer = true,
}: Props) {
  const router = useRouter();
  const scheme = useColorScheme() || "light";
  const theme = Colors[scheme];

  const cardBase = `flex-1 items-center px-4 py-6 rounded-2xl shadow-md`;

  return (
    <View className="flex-row justify-between px-4 gap-4">
      {/* Dealer Dashboard */}
      {isDealer && (
        <Pressable
          onPress={() => router.push("/dealer/dashboard")}
          className={cardBase}
          style={{
            backgroundColor: theme.surface,
            shadowColor: scheme === "dark" ? "#000" : "#ccc",
          }}
        >
          <Image
            source={require("@/assets/images/Dashboard.png")}
            style={{ width: 180, height: 180 }}
            resizeMode="contain"
          />
          <Text
            className="mt-3 text-[15px] font-semibold text-center"
            style={{ color: theme.text }}
          >
            Dealer Dashboard
          </Text>
        </Pressable>
      )}

      {/* Saved Listings */}
      <Pressable
        onPress={() => router.push("/saved")}
        className={cardBase}
        style={{
          backgroundColor: theme.surface,
          shadowColor: scheme === "dark" ? "#000" : "#ccc",
        }}
      >
        <FavoritesSvg width={180} height={180} />
        <Text
          className="mt-3 text-[15px] font-semibold text-center"
          style={{ color: theme.text }}
        >
          Saved Listings
        </Text>

        {savedCount > 0 && (
          <View className="mt-1 px-2 py-0.5 rounded-full bg-red-500">
            <Text className="text-white text-xs font-bold">
              {savedCount}
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  );
}