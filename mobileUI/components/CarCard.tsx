import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import { Car } from "@/constants/mockCars";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  car: Car;
}

export default function CarCard({ car }: Props) {
  const theme = useColorScheme() || "light";
  const colorTheme = Colors[theme];
  const isDark = theme === "dark";

  return (
    <View
      style={{
        width: 300,
        backgroundColor: colorTheme.surface,
        borderRadius: 12, // Less rounded corners
        overflow: "hidden",
        marginRight: 16,
        shadowColor: "#000",
        shadowOpacity: isDark ? 0.04 : 0.08,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        elevation: 8,
      }}
    >
      {/* Image */}
      <Image
        source={typeof car.image === "string" ? { uri: car.image } : car.image}
        style={{
          width: "100%",
          height: 180,
          resizeMode: "cover",
        }}
      />

      {/* Info Section */}
      <View style={{ padding: 16 }}>
        {/* Title */}
        <Text
          numberOfLines={1}
          style={{
            fontSize: 18,
            fontWeight: "800",
            color: colorTheme.text,
            marginBottom: 4,
          }}
        >
          {car.name} {car.year}
        </Text>

        {/* Price */}
        <Text
          style={{
            fontSize: 16,
            fontWeight: "700",
            color: colorTheme.accent,
            marginBottom: 12,
          }}
        >
          {car.price}
        </Text>

        {/* Info Grid */}
        <View style={{ rowGap: 6 }}>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <InfoItem icon="speedometer-outline" label={car.mileage} color={colorTheme.icon} />
            <InfoItem icon="settings-outline" label={car.transmission} color={colorTheme.icon} />
            <InfoItem icon="flame-outline" label={car.fuelType} color={colorTheme.icon} />
          </View>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <InfoItem icon="location-outline" label={car.location} color={colorTheme.icon} />
          </View>
        </View>

        {/* Divider */}
        <View
          style={{
            height: 1,
            backgroundColor: isDark ? "#333" : "#E1E1E1",
            marginTop: 16,
            marginBottom: 12,
            borderRadius: 999,
          }}
        />

        {/* View Details Link */}
        <Pressable
          onPress={() => {
            console.log("Navigate to car details:", car.id);
          }}
          style={{ alignItems: "flex-end" }}
        >
          <Text
            style={{
              fontSize: 13,
              fontWeight: "600",
              color: colorTheme.accent,
            }}
          >
            View Details
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

// Reusable Info Row
function InfoItem({
  icon,
  label,
  color,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  color: string;
}) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Ionicons name={icon} size={14} color={color} />
      <Text
        style={{
          fontSize: 13,
          fontWeight: "500",
          color,
          marginLeft: 6,
        }}
      >
        {label}
      </Text>
    </View>
  );
}