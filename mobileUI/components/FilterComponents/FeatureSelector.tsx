import { Colors } from "@/constants/Colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, Pressable, Text, View, useColorScheme } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

// Features with their respective icons and optional custom library
const FEATURES = [
  { name: "Sunroof", icon: "sunny-outline", lib: "Ionicons" },
  { name: "Reverse Camera", icon: "camera-reverse-outline", lib: "Ionicons" },
  { name: "Bluetooth", icon: "bluetooth-outline", lib: "Ionicons" },
  { name: "Alloy Wheels", icon: "disc-outline", lib: "Ionicons" },
  { name: "Fog Lights", icon: "cloudy-night-outline", lib: "Ionicons" },
  { name: "CarPlay", icon: "phone-portrait-outline", lib: "Ionicons" },
  { name: "Keyless Entry", icon: "key-outline", lib: "Ionicons" },
  { name: "Leather Seats", icon: "seat", lib: "MaterialCommunityIcons" }, // ← updated icon and lib
  { name: "Navigation", icon: "navigate-outline", lib: "Ionicons" },
  { name: "7-Seater", icon: "people-outline", lib: "Ionicons" },
];

interface Props {
  selected: string[];
  onChange: (selected: string[]) => void;
}

export default function FeatureSelector({ selected, onChange }: Props) {
  const theme = useColorScheme() || "light";
  const colorTheme = Colors[theme];

  const toggleFeature = (feature: string) => {
    if (selected.includes(feature)) {
      onChange(selected.filter((f) => f !== feature));
    } else {
      onChange([...selected, feature]);
    }
  };

  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={{ color: colorTheme.text, fontWeight: "800", fontSize: 18, marginBottom: 14 }}>
        Features
      </Text>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        {FEATURES.map(({ name, icon, lib }) => {
          const isSelected = selected.includes(name);
          const IconComponent = lib === "MaterialCommunityIcons" ? MaterialCommunityIcons : Ionicons;

          return (
            <Pressable
              key={name}
              onPress={() => toggleFeature(name)}
              style={{
                width: (SCREEN_WIDTH - 80) / 3,
                alignItems: "center",
                paddingVertical: 12,
                paddingHorizontal: 8,
                borderRadius: 16,
                borderWidth: 1.5,
                borderColor: isSelected ? colorTheme.accent : colorTheme.border,
                backgroundColor: isSelected ? colorTheme.accent + "20" : colorTheme.surface,
              }}
            >
              <IconComponent
                name={icon as any}
                size={26}
                color={isSelected ? colorTheme.accent : colorTheme.text}
                style={{ marginBottom: 6 }}
              />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "500",
                  textAlign: "center",
                  color: isSelected ? colorTheme.accent : colorTheme.text,
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