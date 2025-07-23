// components/sell/ListingCard.tsx
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, Text, View, useColorScheme } from "react-native";

type Props = {
  title: string;
  price: string;
  status: string;
  image: any;
};

export default function ListingCard({ title, price, status, image }: Props) {
  const scheme = useColorScheme() || "light";
  const theme = Colors[scheme];

  return (
    <View className="flex-row items-center gap-4 py-4 border-b border-gray-200 dark:border-gray-700 w-full">
      {/* Thumbnail */}
      <Image
        source={image}
        style={{
          width: 100,
          height: 70,
          borderRadius: 12,
        }}
      />

      {/* Details & Actions */}
      <View className="flex-1 flex-row justify-between items-center">
        {/* Info Section */}
        <View className="flex-1 pr-3">
          <Text
            className="text-[16px] font-semibold"
            style={{ color: theme.text }}
            numberOfLines={1}
          >
            {title}
          </Text>
          <Text
            className="text-[14px] font-medium mt-1"
            style={{ color: theme.accent }}
          >
            {price}
          </Text>
          <Text
            className="text-[12px] mt-1"
            style={{ color: theme.muted }}
            numberOfLines={1}
          >
            Status: {status}
          </Text>
        </View>

        {/* Actions (Horizontal Row, no backgrounds) */}
        <View className="flex-row items-center space-x-5 ml-3">
          {[
            { name: "create-outline", color: theme.icon },
            { name: "pause-circle-outline", color: theme.icon },
            { name: "trash-outline", color: "red" },
          ].map((icon, index) => (
            <Pressable
              key={index}
              android_ripple={{ color: "#ccc", borderless: true }}
              className="p-1"
            >
              <Ionicons name={icon.name as any} size={24} color={icon.color} />
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
}