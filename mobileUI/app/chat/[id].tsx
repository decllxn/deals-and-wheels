import MessageBubble from "@/components/chat/MessageBubble";
import MessageInput from "@/components/chat/MessageInput";
import { Colors } from "@/constants/Colors";
import { mockChats } from "@/constants/mockChats";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const theme = useColorScheme() || "light";
  const colorTheme = Colors[theme];
  const scrollRef = useRef<ScrollView>(null);
  const insets = useSafeAreaInsets(); // Provides safe area information

  const chat = mockChats.find((c) => c.id === id);
  const [messages, setMessages] = useState(chat?.messages || []);

  // Removed keyboardOpen state as KeyboardAvoidingView handles most of the behavior.
  // We keep it if you need specific logic based on keyboard visibility for other things.
  // const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    // These listeners are good for scrolling to end, but not strictly needed for the input positioning
    // if KeyboardAvoidingView is set up correctly.
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        // setKeyboardOpen(true); // If you still need this state for other UI elements
        setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        // setKeyboardOpen(false); // If you still need this state for other UI elements
        setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleSendMessage = (message: string) => {
    const newMessage = {
      text: message,
      sentByMe: true,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMessage]);

    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const HEADER_HEIGHT = 64; // Based on your current header's paddingVertical and fontSize, 64px is a good estimate.

  if (!chat) {
    return (
      <SafeAreaView
        edges={["top", "left", "right"]}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colorTheme.background,
        }}
      >
        <Text style={{ color: colorTheme.text }}>Chat not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      edges={["top", "left", "right", "bottom"]}
      style={{ flex: 1, backgroundColor: colorTheme.background }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 12, // This contributes to the header height
          backgroundColor: colorTheme.background,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
          elevation: 2,
          zIndex: 10,
        }}
      >
        <TouchableOpacity onPress={() => router.back()} style={{ paddingRight: 12 }}>
          <Ionicons name="arrow-back" size={24} color={colorTheme.text} />
        </TouchableOpacity>
        <Image
          source={{ uri: chat.avatar }}
          style={{ width: 40, height: 40, borderRadius: 20, marginRight: 12 }}
        />
        <Text style={{ fontSize: 16, fontWeight: "700", color: colorTheme.text }}>
          {chat.name}
        </Text>
      </View>

      {/*
        Main Chat Body: KeyboardAvoidingView now wraps the scrollable content
        AND the input component, letting it manage their positioning.
      */}
      <KeyboardAvoidingView
        style={{ flex: 1 }} // KAV takes up remaining space below header
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        // For iOS, the offset should be the sum of the top SafeAreaView inset
        // and the height of the header.
        keyboardVerticalOffset={Platform.OS === "ios" ? insets.top + HEADER_HEIGHT : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {/*
            This View with flex: 1 ensures the ScrollView fills the available space
            above the input, allowing KAV to push it correctly.
          */}
          <View style={{ flex: 1 }}>
            <ScrollView
              ref={scrollRef}
              style={{ flex: 1 }}
              contentContainerStyle={{
                paddingHorizontal: 16,
                paddingTop: 12,
                // Ensure padding at the bottom for messages so they don't get covered by the input when keyboard is hidden
                paddingBottom: 16, // Adjust if more space needed visually above the input
              }}
              showsVerticalScrollIndicator={false}
              onContentSizeChange={() =>
                scrollRef.current?.scrollToEnd({ animated: true })
              }
              keyboardShouldPersistTaps="handled" // Allows interaction with scrollview without dismissing keyboard
            >
              {messages.map((msg, index) => (
                <MessageBubble
                  key={index}
                  message={msg.text}
                  isSentByMe={msg.sentByMe}
                  timestamp={msg.time}
                />
              ))}
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>

        {/*
          The MessageInput is placed here, directly inside the KeyboardAvoidingView.
          It is wrapped in a SafeAreaView to handle the bottom safe area inset.
          KeyboardAvoidingView will automatically adjust this whole SafeAreaView's position.
        */}
        <View
          style={{
            backgroundColor: colorTheme.background,
            borderTopWidth: 0.75,
            borderTopColor: `${colorTheme.muted}30`,
          }}
        >
          <MessageInput onSend={handleSendMessage} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}