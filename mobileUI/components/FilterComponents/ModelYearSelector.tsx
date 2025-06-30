import { Colors } from "@/constants/Colors";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import React from "react";
import { Text, View, useColorScheme } from "react-native";

interface Props {
  yearRange: [number, number];
  onChangeYear: (range: [number, number]) => void;
}

export default function ModelYearSelector({ yearRange, onChangeYear }: Props) {
  const theme = useColorScheme() || "light";
  const colorTheme = Colors[theme];

  return (
    <View className="mb-9">
      {/* Label */}
      <Text
        style={{ color: colorTheme.text }}
        className="text-lg font-semibold mb-2"
      >
        Model Year
      </Text>

      {/* Combined range display */}
      <Text
        style={{ color: colorTheme.muted }}
        className="text-sm font-medium mb-2.5"
      >
        {yearRange[0]} – {yearRange[1]}
      </Text>

      {/* Slider */}
      <View className="items-center">
        <MultiSlider
          values={yearRange}
          sliderLength={280}
          min={2000}
          max={new Date().getFullYear()}
          step={1}
          onValuesChange={(vals) => onChangeYear([vals[0], vals[1]])}
          selectedStyle={{ backgroundColor: colorTheme.accent }}
          unselectedStyle={{ backgroundColor: colorTheme.border }}
          markerStyle={{
            backgroundColor: colorTheme.accent,
            height: 24,
            width: 24,
            borderRadius: 12,
            borderColor: colorTheme.surface,
            borderWidth: 2,
            // Adjust this to center the track within the marker
            marginTop: 6, // (Marker Height - Track Height) / 2 = (24 - 6) / 2 = 9. So, move marker up by 9.
          }}
          trackStyle={{ height: 6, borderRadius: 3 }}
          containerStyle={{ marginTop: 3 }}
        />
      </View>
    </View>
  );
}