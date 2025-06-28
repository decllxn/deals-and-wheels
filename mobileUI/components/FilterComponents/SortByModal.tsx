import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    Modal,
    Pressable,
    ScrollView,
    Text,
    View,
    useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface SortByModalProps {
  visible: boolean;
  selected: string;
  onSelect: (value: string) => void;
  onClose: () => void;
}

const SORT_OPTIONS = [
  "Relevance",
  "Price: Highest to lowest",
  "Price: Lowest to highest",
  "Model Year: Newest to oldest",
  "Mileage: Lowest to Highest",
];

export default function SortByModal({
  visible,
  selected,
  onSelect,
  onClose,
}: SortByModalProps) {
  const theme = useColorScheme() || "light";
  const colorTheme = Colors[theme];

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
      style={{
        zIndex: 9999,
      }}
    >
      <SafeAreaView
        edges={["bottom", "left", "right"]}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.3)",
          zIndex: 9999
        }}
      >
        <View
          style={{
            backgroundColor: colorTheme.surface,
            borderRadius: 14,
            paddingVertical: 20,
            paddingHorizontal: 20,
            width: "85%",
            maxHeight: "70%",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 8,
            elevation: 10,
          }}
        >
          {/* Header */}
          <View className="flex-row items-center justify-between mb-4">
            <Text style={{ fontSize: 18, fontWeight: "bold", color: colorTheme.text }}>
              Sort By
            </Text>
            <Pressable onPress={onClose}>
              <Ionicons name="close" size={22} color={colorTheme.text} />
            </Pressable>
          </View>

          {/* Options */}
          <ScrollView showsVerticalScrollIndicator={false}>
            {SORT_OPTIONS.map((option) => (
              <Pressable
                key={option}
                onPress={() => {
                  onSelect(option);
                  onClose();
                }}
                style={{
                  paddingVertical: 12,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name={
                    selected === option
                      ? "radio-button-on"
                      : "radio-button-off"
                  }
                  size={20}
                  color={
                    selected === option
                      ? colorTheme.accent
                      : colorTheme.border
                  }
                  style={{ marginRight: 10 }}
                />
                <Text style={{ color: colorTheme.text, fontSize: 16 }}>
                  {option}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
}