import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    Platform,
    Pressable,
    Text,
    View,
    useColorScheme,
} from "react-native";
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import PriceRangeSlider from "../FilterComponents/PriceRangeSlider";

interface Props {
  visible: boolean;
  onClose: () => void;
  values?: [number, number];
  onChange?: (range: [number, number]) => void;
}

export default function PriceFilterModal({
  visible,
  onClose,
  values = [500000, 5000000],
  onChange = () => {},
}: Props) {
  const theme = useColorScheme() || "light";
  const colorTheme = Colors[theme];

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      backdropOpacity={0.3}
      onBackButtonPress={onClose}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={{
        margin: 0,
        justifyContent: "flex-end",
        zIndex: 9999,
      }}
    >
      <SafeAreaView
        edges={["bottom", "left", "right"]}
        style={{
          backgroundColor: colorTheme.surface,
          paddingTop: 20,
          paddingHorizontal: 20,
          paddingBottom: Platform.OS === "ios" ? 32 : 20,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          minHeight: 300,
        }}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "700", color: colorTheme.text }}>
            Price Filter
          </Text>
          <Pressable onPress={onClose}>
            <Ionicons name="close" size={24} color={colorTheme.text} />
          </Pressable>
        </View>

        {/* Price Range Slider */}
        <PriceRangeSlider
          min={500000}
          max={5000000}
          values={values}
          onChange={onChange}
        />

        {/* Done Button */}
        <Pressable
          onPress={onClose}
          style={{
            marginTop: 10,
            backgroundColor: colorTheme.accent,
            paddingVertical: 12,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "600", fontSize: 15 }}>
            Done
          </Text>
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
}