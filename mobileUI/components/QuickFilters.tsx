import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import PriceFilterModal from "./FilterModals/PriceFilterModal";
import FiltersModal from "./FiltersModal";

const staticChips = [
  { label: "Price", isDropdown: true },
  { label: "Vehicle Type", isDropdown: true },
  { label: "Make", isDropdown: true },
];

const dynamicFilters = [
  { label: "SUV" },
  { label: "Sedan" },
  { label: "Pickup" },
  { label: "Hatchback" },
  { label: "New" },
  { label: "Used" },
  { label: "Under KES 1M" },
  { label: "1M – 2M" },
  { label: "Over 2M" },
];

export default function QuickFilters() {
  const [selected, setSelected] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [priceModalVisible, setPriceModalVisible] = useState(false); // ✅ new state
  const theme = useColorScheme() || "light";
  const colorTheme = Colors[theme];

  const handleChipPress = (label: string) => {
    setSelected(selected === label ? null : label);
  };

  const handleStaticChipPress = (label: string) => {
    if (label === "Price") {
      setPriceModalVisible(true); // ✅ show modal
    } else {
      handleChipPress(label);
    }
  };

  return (
    <View className="mb-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingLeft: 16,
          paddingRight: 16,
          alignItems: "center",
        }}
      >
        {/* All Filters Button */}
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: colorTheme.border,
            backgroundColor: colorTheme.surface,
            marginRight: 8,
          }}
        >
          <Ionicons
            name="list-outline"
            size={16}
            color={colorTheme.text}
            style={{ marginRight: 6 }}
          />
          <Text style={{ fontSize: 14, fontWeight: "500", color: colorTheme.text }}>
            All Filters
          </Text>
        </TouchableOpacity>

        {/* Static dropdown chips (Price, Vehicle Type, Make) */}
        {staticChips.map(({ label }) => {
          const isActive = selected === label;
          return (
            <TouchableOpacity
              key={label}
              onPress={() => handleStaticChipPress(label)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 8,
                paddingHorizontal: 14,
                paddingVertical: 8,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: isActive ? colorTheme.accent : colorTheme.border,
                backgroundColor: isActive ? colorTheme.accent : colorTheme.surface,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: isActive ? "#fff" : colorTheme.text,
                  marginRight: 6,
                }}
              >
                {label}
              </Text>
              <Ionicons
                name="chevron-down"
                size={16}
                color={isActive ? "#fff" : colorTheme.text}
              />
            </TouchableOpacity>
          );
        })}

        {/* Dynamic Filter Chips */}
        {dynamicFilters.map(({ label }, index) => {
          const isActive = selected === label;
          return (
            <TouchableOpacity
              key={label}
              onPress={() => handleChipPress(label)}
              style={{
                marginRight: index === dynamicFilters.length - 1 ? 0 : 8,
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: isActive ? colorTheme.accent : colorTheme.border,
                backgroundColor: isActive ? colorTheme.accent : colorTheme.surface,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: isActive ? "#fff" : colorTheme.text,
                }}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Modals */}
      <FiltersModal visible={modalVisible} onClose={() => setModalVisible(false)} />
      <PriceFilterModal visible={priceModalVisible} onClose={() => setPriceModalVisible(false)} />
    </View>
  );
}