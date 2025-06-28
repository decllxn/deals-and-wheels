// components/FilterComponents/PriceRangeSlider.tsx
import { Colors } from "@/constants/Colors";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import React from "react";
import { Text, useColorScheme, View } from "react-native";

interface Props {
  min: number;
  max: number;
  values: [number, number];
  onChange: (range: [number, number]) => void;
}

export default function PriceRangeSlider({ min, max, values, onChange }: Props) {
  const theme = useColorScheme() || "light";
  const colorTheme = Colors[theme];

  return (
    <View style={{ marginBottom: 36 }}>
      {/* Label */}
      <Text
        style={{
          color: colorTheme.text,
          fontSize: 18,
          fontWeight: "600",
          marginBottom: 8,
        }}
      >
        Price Range
      </Text>

      {/* Combined range display */}
      <Text
        style={{
          color: colorTheme.muted,
          fontSize: 14,
          fontWeight: "500",
          marginBottom: 10,
        }}
      >
        KES {values[0].toLocaleString()} – KES {values[1].toLocaleString()}
      </Text>

      {/* Slider */}
      <View style={{ alignItems: "center" }}>
        <MultiSlider
          values={values}
          sliderLength={280}
          min={min}
          max={max}
          step={50000}
          onValuesChange={(val) => onChange([val[0], val[1]])}
          selectedStyle={{ backgroundColor: colorTheme.accent }}
          unselectedStyle={{ backgroundColor: colorTheme.border }}
          markerStyle={{
            backgroundColor: colorTheme.accent,
            height: 24,
            width: 24,
            borderRadius: 12,
            borderColor: colorTheme.surface,
            borderWidth: 2,
          }}
          trackStyle={{ height: 6, borderRadius: 3 }}
          containerStyle={{ marginTop: 3 }}
        />
      </View>
    </View>
  );
}