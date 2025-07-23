import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

interface Props {
  onSend: (message: string) => void;
}

export default function MessageInput({ onSend }: Props) {
  const theme = useColorScheme() || "light";
  const colorTheme = Colors[theme];
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 12,
        backgroundColor: colorTheme.background,
        borderTopWidth: 0.75,
        borderTopColor: `${colorTheme.muted}30`,
      }}
    >
      <TextInput
        placeholder="Type a message..."
        placeholderTextColor={colorTheme.muted}
        value={text}
        onChangeText={setText}
        style={{
          flex: 1,
          fontSize: 15,
          paddingVertical: 10,
          paddingHorizontal: 14,
          backgroundColor: colorTheme.surface,
          borderRadius: 14,
          color: colorTheme.text,
          borderWidth: 1,
          borderColor: `${colorTheme.muted}40`,
        }}
        multiline
      />
      <TouchableOpacity
        onPress={handleSend}
        style={{
          marginLeft: 10,
          backgroundColor: colorTheme.accent,
          borderRadius: 20,
          padding: 10,
        }}
      >
        <Ionicons name="send" size={18} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}