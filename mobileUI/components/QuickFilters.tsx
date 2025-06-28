// components/QuickFilters.tsx
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
import FiltersModal from "./FiltersModal";

const filters = [
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
  const theme = useColorScheme() || "light";
  const colorTheme = Colors[theme];

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
          <Text
            style={{
              fontSize: 14,
              fontWeight: "500",
              color: colorTheme.text,
            }}
          >
            All Filters
          </Text>
        </TouchableOpacity>

        {/* Filter Chips */}
        {filters.map(({ label }, index) => {
          const isActive = selected === label;
          return (
            <TouchableOpacity
              key={label}
              onPress={() => setSelected(isActive ? null : label)}
              style={{
                marginRight: index === filters.length - 1 ? 0 : 8,
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: isActive
                  ? colorTheme.accent
                  : colorTheme.border,
                backgroundColor: isActive
                  ? colorTheme.accent
                  : colorTheme.surface,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: isActive ? "#ffffff" : colorTheme.text,
                }}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Modal Component */}
      <FiltersModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
}