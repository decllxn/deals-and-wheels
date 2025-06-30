import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
  useColorScheme,
} from "react-native";
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";

import EcoFriendlySelector from "@/components/FilterComponents/EcoFriendlySelector";
import FeatureSelector from "@/components/FilterComponents/FeatureSelector";
import PriceRangeSlider from "@/components/FilterComponents/PriceRangeSlider";
import SortByModal from "@/components/FilterComponents/SortByModal";
import VehicleAttributes from "@/components/FilterComponents/VehicleAttributes";
import VehicleTypeSelector from "@/components/FilterComponents/VehicleTypeSelector";
import { Colors } from "@/constants/Colors";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function FiltersModal({ visible, onClose }: Props) {
  const theme = useColorScheme() || "light";
  const colorTheme = Colors[theme];

  const [sortOption, setSortOption] = useState("Relevance");
  const [sortByModalVisible, setSortByModalVisible] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([500000, 5000000]);
  const [vehicleType, setVehicleType] = useState<string | null>(null);
  const [ecoType, setEcoType] = useState<string | null>(null);
  const [makes, setMakes] = useState<string[]>([]);
  const [yearRange, setYearRange] = useState<[number, number]>([2010, new Date().getFullYear()]);
  const [transmission, setTransmission] = useState<string | null>(null);
  const [features, setFeatures] = useState<string[]>([]); // ✅ new state

  const handleApply = () => {
    console.log("Filters:", {
      sortOption,
      priceRange,
      vehicleType,
      ecoType,
      makes,
      yearRange,
      transmission,
      features, // ✅ include in filters
    });
    onClose();
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      backdropOpacity={0}
      coverScreen
      statusBarTranslucent
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={350}
      animationOutTiming={250}
      style={{ margin: 0, justifyContent: "flex-end", zIndex: 9000 }}
    >
      <SafeAreaView
        edges={["bottom", "left", "right", "top"]}
        style={{
          flex: 1,
          backgroundColor: colorTheme.surface,
          paddingTop: 10,
          paddingHorizontal: 20,
          paddingBottom: 32,
        }}
      >
        {/* Header */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 16 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: colorTheme.text }}>
            All Filters
          </Text>
          <Pressable onPress={onClose}>
            <Ionicons name="close" size={24} color={colorTheme.text} />
          </Pressable>
        </View>

        {/* Filter Content */}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          <View style={{ gap: 24 }}>
            
            {/* Sort By */}
            <Pressable
              onPress={() => setSortByModalVisible(true)}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 4,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "500", color: colorTheme.text }}>
                Sort By
              </Text>
              <Text style={{ fontSize: 16, fontWeight: "600", color: colorTheme.accent }}>
                {sortOption}
              </Text>
            </Pressable>

            <View style={{ height: 1, backgroundColor: colorTheme.border, opacity: 0.6 }} />

            {/* Price Range */}
            <PriceRangeSlider
              min={500000}
              max={5000000}
              values={priceRange}
              onChange={setPriceRange}
            />

            <View style={{ height: 1, backgroundColor: colorTheme.border, opacity: 0.6 }} />

            {/* Vehicle Type */}
            <VehicleTypeSelector
              selected={vehicleType}
              onSelect={setVehicleType}
            />

            <View style={{ height: 1, backgroundColor: colorTheme.border, opacity: 0.6 }} />

            {/* Eco Friendly */}
            <EcoFriendlySelector
              selected={ecoType}
              onChange={setEcoType}
            />

            <View style={{ height: 1, backgroundColor: colorTheme.border, opacity: 0.6 }} />

            {/* Vehicle Attributes */}
            <VehicleAttributes
              makes={makes}
              onChangeMakes={setMakes}
              yearRange={yearRange}
              onChangeYear={setYearRange}
              transmission={transmission}
              onChangeTrans={setTransmission}
            />

            <View style={{ height: 1, backgroundColor: colorTheme.border, opacity: 0.6 }} />

            {/* ✅ Feature Selector */}
            <FeatureSelector selected={features} onChange={setFeatures} />
          </View>
        </ScrollView>

        {/* Apply Filters Button */}
        <Pressable
          onPress={handleApply}
          style={{
            position: "absolute",
            bottom: Platform.OS === "ios" ? 32 : 20,
            left: 20,
            right: 20,
            backgroundColor: colorTheme.accent,
            paddingVertical: 14,
            borderRadius: 12,
            alignItems: "center",
            marginBottom: 6,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}>
            Apply Filters
          </Text>
        </Pressable>

        {/* Sort Modal */}
        <SortByModal
          visible={sortByModalVisible}
          selected={sortOption}
          onSelect={setSortOption}
          onClose={() => setSortByModalVisible(false)}
        />
      </SafeAreaView>
    </Modal>
  );
}