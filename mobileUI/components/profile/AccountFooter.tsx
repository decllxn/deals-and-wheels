import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    Alert,
    Pressable,
    Text,
    View,
    useColorScheme,
} from "react-native";

export default function AccountFooter() {
  const router = useRouter();
  const scheme = useColorScheme() || "light";
  const theme = Colors[scheme];

  const handleLogout = () => {
    // Replace this with real logout logic
    Alert.alert("Log Out", "You have been logged out.");
  };

  return (
    <View className="px-5 mb-12">
      {/* Actions */}
      <View className="space-y-5 mt-12">
        {/* Legal & Terms */}
        <Pressable
          onPress={() => router.push("/legal")}
          className="flex-row items-center"
        >
          <Ionicons name="document-text-outline" size={22} color={theme.icon} />
          <Text
            className="ml-4 text-base font-medium"
            style={{ color: theme.text }}
          >
            Legal & Terms
          </Text>
        </Pressable>

        {/* Log Out */}
        <Pressable
          onPress={handleLogout}
          className="flex-row items-center mt-2"
        >
          <Ionicons name="log-out-outline" size={22} color={theme.accent} />
          <Text
            className="ml-4 text-base font-medium"
            style={{ color: theme.accent }}
          >
            Log Out
          </Text>
        </Pressable>
      </View>

      {/* Divider */}
      <View
        className="mt-10"
        style={{
          height: 1,
          backgroundColor: theme.border,
        }}
      />

      {/* Version Info */}
      <Text className="mt-6 text-xs">
        <Text style={{ color: theme.muted }}>Deals</Text>
        <Text style={{ color: theme.accent }}>&</Text>
        <Text style={{ color: theme.muted }}>Wheels v1.0.0 • Build 100</Text>
      </Text>

    </View>
  );
}