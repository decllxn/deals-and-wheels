// screens/SubscriptionPlans.tsx
import SubscriptionPlanCard from "@/components/subscriptions/SubscriptionPlanCard";
import { Colors } from "@/constants/Colors";
import { DEALER_PLANS } from "@/constants/dealerPlans";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Pressable,
  ScrollView,
  Text,
  useColorScheme,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SubscriptionPlans() {
  const scheme = useColorScheme() || "light";
  const theme = Colors[scheme];
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.background }}
      edges={["top", "bottom", "left", "right"]}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingTop: 10,
          paddingBottom: 16,
          backgroundColor: theme.background,
        }}
      >
        <Pressable
          onPress={handleBackPress}
          android_ripple={{ color: "#ccc", borderless: true }}
          style={{ padding: 8, marginRight: 10 }}
        >
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </Pressable>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: theme.text,
          }}
        >
          Choose a Subscription Plan
        </Text>
      </View>

      {/* Horizontal ScrollView */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 40,
        }}
      >
        {DEALER_PLANS.map((plan, index) => (
          <View key={index} style={{ marginRight: 20 }}>
            <SubscriptionPlanCard plan={plan} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
