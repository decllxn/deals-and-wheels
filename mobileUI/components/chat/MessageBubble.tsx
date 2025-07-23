import { Colors } from "@/constants/Colors";
import React from "react";
import { Text, View, useColorScheme } from "react-native";

interface Props {
  message: string;
  isSentByMe?: boolean;
  timestamp?: string;
}

export default function MessageBubble({ message, isSentByMe = false, timestamp }: Props) {
  const theme = useColorScheme() || "light";
  const colorTheme = Colors[theme];

  return (
    <View
      style={{
        alignItems: isSentByMe ? "flex-end" : "flex-start",
        marginBottom: 12,
      }}
    >
      <View
        style={{
          backgroundColor: colorTheme.accent,
          paddingVertical: 10,
          paddingHorizontal: 14,
          borderRadius: 16,
          borderTopLeftRadius: isSentByMe ? 16 : 0,
          borderTopRightRadius: isSentByMe ? 0 : 16,
          maxWidth: "80%",
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 15,
          }}
        >
          {message}
        </Text>
      </View>
      {timestamp && (
        <Text
          style={{
            fontSize: 11,
            color: colorTheme.muted,
            marginTop: 4,
            marginHorizontal: 4,
          }}
        >
          {timestamp}
        </Text>
      )}
    </View>
  );
}
