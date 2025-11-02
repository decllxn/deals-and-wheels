// components/SearchBar.tsx
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Platform,
  TextInput,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from "react-native";

export default function SearchBar() {
  const theme = useColorScheme() || "light";
  const colorTheme = Colors[theme];
  const isDark = theme === "dark";
  const router = useRouter();

  return (
    <TouchableWithoutFeedback onPress={() => router.push("/search")}>
      <View
        className="flex-row items-center mb-6 px-4 py-3 rounded-2xl"
        style={{
          backgroundColor: isDark ? "#1e1e1e" : "#f9f9f9",
          shadowColor: isDark ? "#000" : "#000",
          shadowOpacity: isDark ? 0.05 : 0.1,
          shadowRadius: 8,
          elevation: Platform.OS === "android" ? 3 : 0,
          borderWidth: isDark ? 1 : 0,
          borderColor: isDark ? "#333" : "transparent",
        }}
      >
        <Ionicons name="search" size={22} color={colorTheme.icon} />
        <TextInput
          editable={false} // disables typing in this component
          pointerEvents="none" // allows parent press to work
          placeholder="Search cars, models, dealers..."
          placeholderTextColor={colorTheme.muted}
          className="ml-3 flex-1 text-[16px]"
          style={{
            color: colorTheme.text,
            fontWeight: "500",
            paddingVertical: Platform.OS === "android" ? 2 : 6,
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}