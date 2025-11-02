// components/SearchInput.tsx
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import React from "react";
import {
  Platform,
  TextInput,
  TextInputProps,
  useColorScheme,
  View,
} from "react-native";

interface SearchInputProps extends TextInputProps {}

export default function PageInput({ ...props }: SearchInputProps) {
  const theme = useColorScheme() || "light";
  const colorTheme = Colors[theme];
  const isDark = theme === "dark";

  return (
    <View
      className="flex-row items-center rounded-xl"
      style={{
        backgroundColor: isDark ? "#1e1e1e" : "#f2f2f2",
        height: 50,
        paddingHorizontal: 10,
        shadowColor: "#000",
        shadowOpacity: isDark ? 0.05 : 0.08,
        shadowRadius: 4,
        elevation: Platform.OS === "android" ? 2 : 0,
        borderWidth: isDark ? 1 : 0,
        borderColor: isDark ? "#333" : "transparent",
      }}
    >
      <Ionicons name="search" size={18} color={colorTheme.icon} />
      <TextInput
        placeholder="Search cars, models, dealers..."
        placeholderTextColor={props.placeholderTextColor || colorTheme.muted}
        className="ml-2 flex-1 text-[15px]"
        style={{
          color: colorTheme.text,
          fontWeight: "500",
          paddingVertical: 0,
        }}
        {...props}
      />
    </View>
  );
}
