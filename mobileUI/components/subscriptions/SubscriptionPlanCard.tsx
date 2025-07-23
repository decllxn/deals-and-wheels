import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  Image,
  Pressable,
  Text,
  useColorScheme,
  View,
} from "react-native";

export type PlanType = {
  name: string;
  price: string;
  listings: number | string;
  benefits: string[];
  message: string;
  badge?: string;
};

const badgeImages: Record<string, any> = {
  Starter: require("@/assets/images/starter-badge.png"),
  Bronze: require("@/assets/images/bronze-badge.png"),
  Silver: require("@/assets/images/silver-badge.png"),
  Gold: require("@/assets/images/gold-badge.png"),
  Diamond: require("@/assets/images/diamond-badge.png"),
  Platinum: require("@/assets/images/platinum-badge.png"),
  Partner: require("@/assets/images/partner-badge.png"),
};

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function SubscriptionPlanCard({ plan }: { plan: PlanType }) {
  const scheme = useColorScheme() || "light";
  const theme = Colors[scheme];

  const handlePress = () => {
    if (plan.name === "Partner") {
      alert("Please contact us for this plan.");
    } else {
      alert(`You selected the ${plan.name} plan.`);
    }
  };

  return (
    <View
      style={{
        width: screenWidth * 0.9,
        height: screenHeight * 0.8,
        borderRadius: 28,
        backgroundColor: theme.background,
        padding: 28,
        marginHorizontal: 12,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 16,
        elevation: 5,
        justifyContent: "space-between",
      }}
    >
      {/* Top Section: Badge + Plan Name */}
      <View style={{ alignItems: "center", marginBottom: 12 }}>
        <Image
          source={badgeImages[plan.name]}
          style={{
            width: 50,
            height: 50,
            resizeMode: "contain",
            marginBottom: 10,
          }}
        />
        <Text style={{ fontSize: 24, fontWeight: "700", color: theme.text }}>
          {plan.name}
        </Text>
      </View>

      {/* Message + Listings */}
      <View style={{ marginBottom: 12 }}>
        <Text
          style={{
            fontSize: 16,
            fontStyle: "italic",
            color: theme.muted,
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          {plan.message}
        </Text>

        <Text style={{ fontSize: 15, color: theme.muted, textAlign: "center" }}>
          Listings allowance:{" "}
          <Text style={{ fontWeight: "500", color: theme.text }}>
            {plan.listings}
          </Text>
        </Text>
      </View>

      {/* Divider */}
      <View
        style={{
          height: 1,
          backgroundColor: `${theme.muted}30`,
          marginVertical: 16,
        }}
      />

      {/* Benefits */}
      <View style={{ flexGrow: 1, marginBottom: 24 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: theme.text,
            marginBottom: 10,
          }}
        >
          Included Benefits:
        </Text>

        {plan.benefits.map((benefit, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Ionicons
              name="checkmark-circle-outline"
              size={20}
              color={theme.accent}
              style={{ marginRight: 10 }}
            />
            <Text style={{ fontSize: 15, color: theme.text, flexShrink: 1 }}>
              {benefit}
            </Text>
          </View>
        ))}
      </View>

      {/* Price + Button */}
      <View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
            color: theme.accent,
            marginBottom: 50,
          }}
        >
          {plan.price}
        </Text>

        <Pressable
          onPress={handlePress}
          style={{
            backgroundColor: theme.accent,
            paddingVertical: 16,
            borderRadius: 999,
            alignItems: "center",
          }}
          android_ripple={{ color: "#1E40AF" }}
        >
          <Text style={{ color: "#fff", fontSize: 17, fontWeight: "600" }}>
            {plan.name === "Partner" ? "Contact Us" : "Choose Plan"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
