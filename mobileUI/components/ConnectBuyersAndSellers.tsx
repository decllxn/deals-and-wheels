import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import BuyersAndSellersSvg from "@/assets/images/Buyers-and-sellers.svg";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function ConnectBuyersAndSellers() {
  const theme = useColorScheme() || "light";
  const colorTheme = Colors[theme];

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colorTheme.background },
      ]}
    >
      {/* Header */}
      <Text style={[styles.headerText, { color: colorTheme.text }]}>
        At Deals
        <Text style={{ color: colorTheme.accent }}>&</Text>
        Wheels we…
      </Text>

      {/* Illustration */}
      <BuyersAndSellersSvg
        width={SCREEN_WIDTH * 0.7}
        height={SCREEN_WIDTH * 0.45}
        style={styles.illustration}
      />

      {/* Title */}
      <Text style={[styles.title, { color: colorTheme.text }]}>
        Bring Buyers & Sellers Together
      </Text>

      {/* Subtitle */}
      <Text style={[styles.subtitle, { color: colorTheme.muted }]}>
        Discover your next car with ease. We connect verified sellers with
        eager buyers all across Kenya — fast, fair, and secure.
      </Text>

      {/* Button */}
      <TouchableOpacity
        activeOpacity={0.9}
        style={[styles.button, { backgroundColor: colorTheme.accent }]}
      >
        <Text style={styles.buttonText}>Browse 1,034 Cars</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    alignItems: "flex-start",
    flexGrow: 1,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
  },
  illustration: {
    alignSelf: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    alignSelf: "center",
    marginTop: 28,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 20,
    marginTop: 8,
    paddingHorizontal: 10,
    alignSelf: "center",
  },
  button: {
    marginTop: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
});