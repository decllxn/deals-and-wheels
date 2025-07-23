import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    Pressable,
    Text,
    View,
    useColorScheme,
} from "react-native";

interface LinkItem {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
}

export default function AccountLinks() {
  const router = useRouter();
  const scheme = useColorScheme() || "light";
  const theme = Colors[scheme];

  const links: LinkItem[] = [
    {
      title: "Account Settings",
      icon: "settings-outline",
      route: "/account/settings",
    },
    {
      title: "How Deals&Wheels Works",
      icon: "information-circle-outline",
      route: "/about",
    },
    {
      title: "Get Help",
      icon: "help-circle-outline",
      route: "/support",
    },
    {
      title: "Privacy & Terms",
      icon: "document-text-outline",
      route: "/legal",
    },
  ];

  return (
    <View className="mt-8 px-5">
      <View className="space-y-1">
        {links.map((link, index) => (
          <Pressable
            key={index}
            onPress={() => router.push(link.route)}
            className="flex-row items-center justify-between py-4"
          >
            <View className="flex-row items-center gap-4">
              <Ionicons name={link.icon} size={22} color={theme.accent} />

              {link.title === "How Deals&Wheels Works" ? (
                <Text className="text-[16px] font-medium" style={{ color: theme.text }}>
                  How Deals
                  <Text style={{ color: theme.accent }}>&</Text>
                  Wheels Works
                </Text>
              ) : (
                <Text className="text-[16px] font-medium" style={{ color: theme.text }}>
                  {link.title}
                </Text>
              )}
            </View>

            <Ionicons name="chevron-forward" size={20} color={theme.icon} />
          </Pressable>
        ))}
      </View>

      {/* Single horizontal divider */}
      <View
        className="mt-6 mx-1"
        style={{
          height: 1,
          backgroundColor: theme.border,
        }}
      />
    </View>
  );
}