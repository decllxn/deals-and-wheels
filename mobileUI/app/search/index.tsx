// mobileUI/app/(tabs)/search.tsx
import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { Colors } from "@/constants/Colors";
import PageInput from "@/components/PageInput";
import useDebounce from "@/hooks/useDebounce";
import { useSearchStore } from "@/store/searchStore";

export default function SearchScreen() {
  const theme = useColorScheme() || "light";
  const colorTheme = Colors[theme];

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);
  const router = useRouter();

  // ✅ grab searchAll from store
  const { searchAll } = useSearchStore();

  useEffect(() => {
    searchAll(debouncedSearch);
  }, [debouncedSearch, searchAll]);

  return (
    <SafeAreaView
      edges={["top"]}
      className="flex-1 px-4"
      style={{ backgroundColor: colorTheme.background }}
    >
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={colorTheme.background}
      />

      {/* Search Input with Cancel button */}
      <View className="flex-row items-center mt-4">
        <View className="w-5/6 pr-2">
          <PageInput
            value={search}
            onChangeText={setSearch}
            autoFocus
            placeholderTextColor={colorTheme.muted}
          />
        </View>
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-1/6 items-center justify-center"
          style={{ height: 40 }}
        >
          <Text
            className="text-base font-medium"
            style={{ color: colorTheme.accent }}
          >
            Cancel
          </Text>
        </TouchableOpacity>
      </View>

      {/* Info Text */}
      {!debouncedSearch && (
        <>
          <Text
            className="text-lg font-semibold mt-6 mb-4"
            style={{ color: colorTheme.muted }}
          >
            🔍 Start typing to search...
          </Text>
          <Text className="text-base" style={{ color: colorTheme.muted }}>
            Popular: Toyota, BMW, Mercedes
          </Text>
        </>
      )}
    </SafeAreaView>
  );
}