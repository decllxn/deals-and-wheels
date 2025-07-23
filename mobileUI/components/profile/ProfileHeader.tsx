// components/profile/ProfileHeader.tsx
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

interface Props {
  name: string;
  email: string;
  avatarUrl: string;
  onEdit: () => void;
}

export default function ProfileHeader({ name, email, avatarUrl, onEdit }: Props) {
  const scheme = useColorScheme() || "light";
  const theme = Colors[scheme];

  return (
    <View className="px-6 pt-6">
      <View
        className="rounded-3xl shadow-md p-6 items-center"
        style={{
          backgroundColor: theme.surface,
          shadowColor: scheme === "dark" ? "#000" : "#ccc",
        }}
      >
        <Image
          source={{ uri: avatarUrl }}
          className="w-24 h-24 rounded-full bg-gray-300"
          resizeMode="cover"
        />

        <Text
          className="text-xl font-bold mt-4"
          style={{ color: theme.text }}
        >
          {name || "Unnamed User"}
        </Text>

        <Text
          className="text-sm mt-1"
          style={{ color: theme.muted }}
        >
          {email || "No email provided"}
        </Text>

        <TouchableOpacity
          onPress={onEdit}
          className="mt-4 flex-row items-center"
          accessibilityLabel="Edit profile"
        >
          <Ionicons name="pencil" size={16} color={theme.accent} />
          <Text
            className="ml-1 text-sm font-medium"
            style={{ color: theme.accent }}
          >
            Edit Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}