// components/FilterComponents/EcoFriendlySelector.tsx

import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View, useColorScheme } from "react-native";

interface Props {
  selected: string | null;
  onChange: (type: string | null) => void;
}

export default function EcoFriendlySelector({ selected, onChange }: Props) {
  const theme = useColorScheme() || "light";
  const colorTheme = Colors[theme];

  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={{ color: colorTheme.text, fontWeight: "700", fontSize: 16, marginBottom: 12 }}>
        Eco Friendly
      </Text>

      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
        {/* Any */}
        <Pressable
          onPress={() => onChange(null)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 10,
            paddingHorizontal: 14,
            borderRadius: 12,
            borderWidth: 1.5,
            borderColor: selected === null ? colorTheme.accent : colorTheme.border,
            backgroundColor: selected === null ? colorTheme.accent + "20" : colorTheme.surface,
          }}
        >
          <Ionicons
            name="car-outline"
            size={18}
            color={selected === null ? colorTheme.accent : colorTheme.text}
            style={{ marginRight: 8 }}
          />
          <Text
            style={{
              fontSize: 14,
              fontWeight: "500",
              color: selected === null ? colorTheme.accent : colorTheme.text,
            }}
          >
            Any
          </Text>
        </Pressable>

        {/* Electric */}
        <Pressable
          onPress={() => onChange("Electric")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 10,
            paddingHorizontal: 14,
            borderRadius: 12,
            borderWidth: 1.5,
            borderColor: selected === "Electric" ? colorTheme.accent : colorTheme.border,
            backgroundColor: selected === "Electric" ? colorTheme.accent + "20" : colorTheme.surface,
          }}
        >
          <Ionicons
            name="battery-charging-outline"
            size={18}
            color={selected === "Electric" ? colorTheme.accent : colorTheme.text}
            style={{ marginRight: 8 }}
          />
          <Text
            style={{
              fontSize: 14,
              fontWeight: "500",
              color: selected === "Electric" ? colorTheme.accent : colorTheme.text,
            }}
          >
            Electric
          </Text>
        </Pressable>

        {/* Hybrid */}
        <Pressable
          onPress={() => onChange("Hybrid")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 10,
            paddingHorizontal: 14,
            borderRadius: 12,
            borderWidth: 1.5,
            borderColor: selected === "Hybrid" ? colorTheme.accent : colorTheme.border,
            backgroundColor: selected === "Hybrid" ? colorTheme.accent + "20" : colorTheme.surface,
          }}
        >
          <Ionicons
            name="leaf-outline"
            size={18}
            color={selected === "Hybrid" ? colorTheme.accent : colorTheme.text}
            style={{ marginRight: 8 }}
          />
          <Text
            style={{
              fontSize: 14,
              fontWeight: "500",
              color: selected === "Hybrid" ? colorTheme.accent : colorTheme.text,
            }}
          >
            Hybrid
          </Text>
        </Pressable>
      </View>
    </View>
  );
}