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
import MakeFilterModal from "./FilterModals/MakeFilterModal";
import PriceFilterModal from "./FilterModals/PriceFilterModal";
import VehicleTypeFilterModal from "./FilterModals/VehicleTypeFilterModal";
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
  const theme = useColorScheme() || "light";
  const colorTheme = Colors[theme];

  // Modal visibility states
  const [modalVisible, setModalVisible] = useState(false);
  const [priceModalVisible, setPriceModalVisible] = useState(false);
  const [vehicleTypeVisible, setVehicleTypeVisible] = useState(false);
  const [makeModalVisible, setMakeModalVisible] = useState(false);

  // Filter values
  const [selectedChip, setSelectedChip] = useState<string | null>(null);
  const [selectedVehicleType, setSelectedVehicleType] = useState<string | null>(null);
  const [selectedMake, setSelectedMake] = useState<string[]>([]);

  const handleChipPress = (label: string) => {
    setSelectedChip(selectedChip === label ? null : label);
  };

  const handleStaticChipPress = (label: string) => {
    switch (label) {
      case "Price":
        setPriceModalVisible(true);
        break;
      case "Vehicle Type":
        setVehicleTypeVisible(true);
        break;
      case "Make":
        setMakeModalVisible(true);
        break;
      default:
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

        {/* Static Chips */}
        {staticChips.map(({ label }) => {
          let isActive = selectedChip === label;

          // Keep chip highlighted if there are selections
          if (label === "Make" && selectedMake.length > 0) {
            isActive = true;
          }
          if (label === "Vehicle Type" && selectedVehicleType) {
            isActive = true;
          }

          const labelDisplay =
            label === "Make" && selectedMake.length > 0
              ? `Make (${selectedMake.length})`
              : label;

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
                {labelDisplay}
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
          const isActive = selectedChip === label;
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
      <PriceFilterModal
        visible={priceModalVisible}
        onClose={() => setPriceModalVisible(false)}
      />
      <VehicleTypeFilterModal
        visible={vehicleTypeVisible}
        onClose={() => setVehicleTypeVisible(false)}
        selected={selectedVehicleType}
        onSelect={(type) => {
          setSelectedVehicleType(type);
          setSelectedChip("Vehicle Type");
        }}
      />
      <MakeFilterModal
        visible={makeModalVisible}
        onClose={() => setMakeModalVisible(false)}
        selected={selectedMake}
        onSelect={(makes) => {
          setSelectedMake(makes);
          setSelectedChip("Make");
        }}
      />
    </View>
  );
}