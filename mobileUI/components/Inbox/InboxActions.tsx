import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Keyboard,
  Pressable,
  Text,
  TextInput,
  View,
  useColorScheme,
} from "react-native";

interface Props {
  onSearchPress?: () => void;
  onSettingsPress?: () => void;
}

const SCREEN_WIDTH = Dimensions.get("window").width;
const SEARCH_ICON_WIDTH = 42;
const CANCEL_BUTTON_WIDTH = 80;
const MAX_WIDTH = SCREEN_WIDTH - CANCEL_BUTTON_WIDTH - 40;

export default function InboxActions({ onSearchPress, onSettingsPress }: Props) {
  const theme = useColorScheme() || "light";
  const colorTheme = Colors[theme];

  const [searchOpen, setSearchOpen] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const widthAnim = useRef(new Animated.Value(SEARCH_ICON_WIDTH)).current;
  const inputOpacity = useRef(new Animated.Value(0)).current;
  const cancelOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
      Animated.timing(cancelOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });

    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      Animated.timing(cancelOpacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start(() => setKeyboardVisible(false));
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const openSearch = () => {
    if (searchOpen) return;
    setSearchOpen(true);

    Animated.parallel([
      Animated.timing(widthAnim, {
        toValue: MAX_WIDTH,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(inputOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start(() => {
      inputRef.current?.focus();
      onSearchPress?.();
    });
  };

  const closeSearch = () => {
    Keyboard.dismiss();
    Animated.parallel([
      Animated.timing(widthAnim, {
        toValue: SEARCH_ICON_WIDTH,
        duration: 250,
        useNativeDriver: false,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(inputOpacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setSearchOpen(false);
    });
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      {/* Animated Search Container */}
      <Animated.View
        style={{
          height: 42,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: searchOpen ? "flex-start" : "center",
          backgroundColor: colorTheme.surface,
          borderRadius: 21,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: colorTheme.border,
          paddingHorizontal: 8,
          width: widthAnim,
        }}
      >
        {/* Search Icon (always visible) */}
        <View
          style={{
            width: 42,
            height: 42,
            borderRadius: 21,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pressable onPress={openSearch}>
            <Ionicons name="search-outline" size={20} color={colorTheme.icon} />
          </Pressable>
        </View>

        {/* Input Field (fades in) */}
        {searchOpen && (
          <Animated.View
            style={{
              flex: 1,
              opacity: inputOpacity,
              marginLeft: 6,
              justifyContent: "center",
            }}
          >
            <TextInput
              ref={inputRef}
              placeholder="Search all messages"
              placeholderTextColor={colorTheme.muted}
              style={{
                fontSize: 14,
                color: colorTheme.text,
                padding: 0,
                height: 42,
              }}
              returnKeyType="search"
              onSubmitEditing={() => Keyboard.dismiss()}
            />
          </Animated.View>
        )}
      </Animated.View>

      {/* Cancel Button (fades in-place) */}
      <Animated.View
        style={{
          marginLeft: 12,
          opacity: cancelOpacity,
        }}
        pointerEvents={searchOpen ? "auto" : "none"}
      >
        <Pressable onPress={closeSearch}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
              color: colorTheme.accent,
              paddingHorizontal: 6,
            }}
          >
            Cancel
          </Text>
        </Pressable>
      </Animated.View>

      {/* Settings Icon */}
      {!searchOpen && (
        <Pressable onPress={onSettingsPress} style={{ marginLeft: -65 }}>
          <Ionicons name="settings-outline" size={22} color={colorTheme.icon} />
        </Pressable>
      )}
    </View>
  );
}