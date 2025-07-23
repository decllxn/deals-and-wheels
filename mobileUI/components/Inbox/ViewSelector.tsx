import { Colors } from "@/constants/Colors";
import React from "react";
import { Pressable, Text, useColorScheme, View } from "react-native";

interface Props {
  active: "messages" | "notifications";
  onChange: (val: "messages" | "notifications") => void;
}

export default function ViewSelector({ active, onChange }: Props) {
  const theme = useColorScheme() || "light";
  const colorTheme = Colors[theme];

  const tabs: ("messages" | "notifications")[] = ["messages", "notifications"];

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: colorTheme.surface,
        padding: 6,
        borderRadius: 12,
        marginBottom: 20,
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab === active;
        return (
          <Pressable
            key={tab}
            onPress={() => onChange(tab)}
            style={{
              flex: 1,
              paddingVertical: 10,
              borderRadius: 8,
              backgroundColor: isActive
                ? colorTheme.accent + "25"
                : "transparent",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: isActive ? colorTheme.accent : colorTheme.muted,
                fontWeight: "600",
                fontSize: 13,
              }}
            >
              {tab === "messages" ? "Messages" : "Notifications"}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}