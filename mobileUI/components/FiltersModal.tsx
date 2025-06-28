// components/FiltersModal.tsx
import PriceRangeSlider from "@/components/FilterComponents/PriceRangeSlider";
import { Colors } from "@/constants/Colors";
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

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function FiltersModal({ visible, onClose }: Props) {
  const theme = useColorScheme() || "light";
  const colorTheme = Colors[theme];

  const [sortOption, setSortOption] = useState("Relevance");
  const [priceRange, setPriceRange] = useState<[number, number]>([
    500000, 5000000,
  ]);

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      backdropOpacity={0}
      coverScreen
      statusBarTranslucent
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={350}
      animationOutTiming={250}
      style={{
        margin: 0,
        justifyContent: "flex-end",
        zIndex: 9999,
      }}
    >
      <SafeAreaView
        edges={["bottom", "left", "right", "top"]}
        style={{
          flex: 1,
          backgroundColor: colorTheme.surface,
          paddingTop: 48,
          paddingHorizontal: 20,
          paddingBottom: 32,
          zIndex: 9999,
        }}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between mb-4">
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: colorTheme.text,
            }}
          >
            All Filters
          </Text>
          <Pressable onPress={onClose}>
            <Ionicons name="close" size={24} color={colorTheme.text} />
          </Pressable>
        </View>

        {/* Filter Content */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <View className="space-y-8">
            <PriceRangeSlider
              min={500000}
              max={5000000}
              values={priceRange}
              onChange={setPriceRange}
            />
          </View>
        </ScrollView>

        {/* Apply Button */}
        <Pressable
          onPress={() => {
            // Handle filter submission here
            console.log("Filters:", {
              sortOption,
              priceRange,
            });
            onClose();
          }}
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
          <Text
            style={{
              color: "#fff",
              fontWeight: "600",
              fontSize: 16,
            }}
          >
            Apply Filters
          </Text>
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
}