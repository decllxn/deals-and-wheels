import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import React from "react";
import {
    Image,
    Pressable,
    ScrollView,
    Text,
    View,
    useColorScheme,
} from "react-native";

const mockChats = [
  {
    id: "1",
    name: "John Motors Ltd",
    avatar: "https://i.pravatar.cc/150?img=12",
    lastMessage: "Hello! Is the Honda Fit still available?",
    timestamp: "2h ago",
  },
  {
    id: "2",
    name: "Alice N.",
    avatar: "https://i.pravatar.cc/150?img=45",
    lastMessage: "I can view the car tomorrow.",
    timestamp: "5h ago",
  },
  {
    id: "3",
    name: "TopCars KE",
    avatar: "https://i.pravatar.cc/150?img=23",
    lastMessage: "Sent you the logbook scan.",
    timestamp: "1d ago",
  },
];

export default function ChatList() {
  const theme = useColorScheme() || "light";
  const colorTheme = Colors[theme];
  const router = useRouter();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {mockChats.map((item) => (
        <Pressable
          key={item.id}
          onPress={() => router.push(`/chat/${item.id}`)}
          style={({ pressed }) => ({
            backgroundColor: pressed
              ? `${colorTheme.accent}10`
              : colorTheme.surface,
            paddingVertical: 22,
            paddingHorizontal: 18,
            marginBottom: 20,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: colorTheme.border,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.06,
            shadowRadius: 5,
            elevation: 3,
          })}
        >
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
            {/* Avatar */}
            <Image
              source={{ uri: item.avatar }}
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
              }}
            />

            {/* Text Content */}
            <View style={{ flex: 1, marginLeft: 18 }}>
              {/* Top Row: Name + Timestamp */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 6,
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 17,
                    fontWeight: "700",
                    color: colorTheme.text,
                    flexShrink: 1,
                    marginRight: 12,
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 13,
                    color: colorTheme.muted,
                  }}
                >
                  {item.timestamp}
                </Text>
              </View>

              {/* Message Preview */}
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  fontSize: 15,
                  fontWeight: "500",
                  color: colorTheme.muted,
                }}
              >
                {item.lastMessage}
              </Text>
            </View>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}