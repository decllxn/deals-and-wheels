import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Linking, Pressable, Text, useColorScheme, View } from "react-native";

export default function DashboardLink() {
  const scheme = useColorScheme() || "light";
  const theme = Colors[scheme];

  const openDashboard = () => {
    Linking.openURL("https://dashboard.dealsandwheels.co.ke");
  };

  return (
    <Pressable
      onPress={openDashboard}
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.background, // Match app card background
        padding: 16,
        borderRadius: 12,
        justifyContent: "space-between",
        marginTop: 24,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: theme.text,
          }}
        >
          Go to Dealer Dashboard
        </Text>
        <Text
          style={{
            fontSize: 13,
            color: theme.muted,
            marginTop: 2,
          }}
        >
          Manage inventory, leads & more
        </Text>
      </View>
      <Ionicons name="open-outline" size={22} color={theme.text} style={{ marginLeft: 12 }} />
    </Pressable>
  );
}