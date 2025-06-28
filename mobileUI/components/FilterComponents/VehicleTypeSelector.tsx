import { Colors } from "@/constants/Colors";
import React from "react";
import { Dimensions, Image, Pressable, Text, useColorScheme, View } from "react-native";

import ConvertiblePng from "@/assets/images/Convertible.png";
import CoupePng from "@/assets/images/Coupe.png";
import HatchbackPng from "@/assets/images/hatchback.png";
import PickupPng from "@/assets/images/pickup-truck.png";
import SedanPng from "@/assets/images/Sedan.png";
import SuvPng from "@/assets/images/SUV.png";

const VEHICLE_TYPES = [
  { name: "Sedan", icon: SedanPng },
  { name: "Coupe", icon: CoupePng },
  { name: "Pickup", icon: PickupPng },
  { name: "Hatchback", icon: HatchbackPng },
  { name: "SUV", icon: SuvPng },
  { name: "Convertible", icon: ConvertiblePng },
];

interface Props {
  selected: string | null;
  onSelect: (type: string) => void;
}

const SCREEN_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = (SCREEN_WIDTH - 20 * 2 - 12 * 2) / 3; // 3 items per row, 20px screen padding, 12px spacing

export default function VehicleTypeSelector({ selected, onSelect }: Props) {
  const theme = useColorScheme() || "light";
  const colorTheme = Colors[theme];

  return (
    <View style={{ marginTop: 8 }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "600",
          color: colorTheme.text,
          marginBottom: 12,
        }}
      >
        Vehicle Type
      </Text>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {VEHICLE_TYPES.map(({ name, icon }) => {
          const isSelected = selected === name;
          return (
            <Pressable
              key={name}
              onPress={() => onSelect(name)}
              style={{
                width: ITEM_WIDTH,
                alignItems: "center",
                paddingVertical: 12,
                marginBottom: 12,
                borderRadius: 10,
                backgroundColor: isSelected
                  ? colorTheme.accent
                  : colorTheme.card,
              }}
            >
              <Image
                source={icon}
                style={{
                  width: 40,
                  height: 40,
                  marginBottom: 6,
                  tintColor: isSelected ? "#fff" : theme === "dark" ? "#fff" : undefined,
                }}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "500",
                  color: isSelected ? "#fff" : colorTheme.text,
                }}
              >
                {name}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}