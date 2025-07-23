import { Colors } from "@/constants/Colors";
import React from "react";
import { Text, useColorScheme, View } from "react-native";

export default function HeaderTitle({ title }: { title: string }) {
  const theme = useColorScheme() || "light";
  const colorTheme = Colors[theme];

  return (
    <View style={{ marginBottom: 12 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "800",
          color: colorTheme.text,
        }}
      >
        {title}
      </Text>
    </View>
  );
}