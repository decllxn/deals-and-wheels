import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useColorScheme,
  Dimensions,
} from "react-native";
import { Colors } from "@/constants/Colors";

const SCREEN_WIDTH = Dimensions.get("window").width;
const IMAGE_WIDTH = SCREEN_WIDTH * 0.75;
const IMAGE_HEIGHT = IMAGE_WIDTH * 0.65;

const INFO_WIDTH = IMAGE_WIDTH * (5 / 6);

export default function FeaturedBlogSection() {
  const theme = useColorScheme() || "light";
  const colorTheme = Colors[theme];

  return (
    <View
      className="px-4 pt-10 pb-14 mt-5"
      style={{ backgroundColor: colorTheme.background }}
    >
      {/* Section Title Over Line */}
      <View className="relative w-full items-center mb-10">
        <View
          style={{
            height: 6,
            backgroundColor: colorTheme.accent,
            opacity: 0.2,
            borderRadius: 3,
            position: "absolute",
            top: 20,
            width: "100%",
            zIndex: 1,
          }}
        />
        <Text
          className="text-2xl font-bold text-center"
          style={{
            color: colorTheme.text,
            zIndex: 2,
          }}
        >
          From the Blog: Insights & Stories
        </Text>
      </View>

      {/* Blog Content Container */}
      <View
        className="relative items-center"
        style={{ minHeight: IMAGE_HEIGHT + 130 }}
      >
        {/* Blog Image - shifted left */}
        <View
          className="rounded-sm overflow-hidden"
          style={{
            width: IMAGE_WIDTH,
            height: IMAGE_HEIGHT,
            marginLeft: -70,
            backgroundColor: `${colorTheme.accent}15`,
          }}
        >
          <Image
            source={require("@/assets/images/blog-preview.jpg")}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>

        {/* Info Box - black overlay with white text */}
        <View
          className="absolute px-6 py-5 rounded-lg"
          style={{
            width: INFO_WIDTH,
            right: 0,
            top: IMAGE_HEIGHT - 20,
            backgroundColor: "#1f1f1f",
            shadowColor: "#000",
            shadowOpacity: 0.07,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 6,
            elevation: 5,
            zIndex: 5,
          }}
        >
          {/* Label */}
          <Text
            className="text-sm font-bold uppercase tracking-widest mb-2"
            style={{ color: "#ffffff", opacity: 0.8 }}
          >
            Featured Blog
          </Text>

          {/* Title */}
          <Text
            className="text-lg font-extrabold mb-4"
            style={{ color: "#ffffff", lineHeight: 26 }}
          >
            Audi is Truly one of a kind
          </Text>

          {/* Read More */}
          <TouchableOpacity onPress={() => {}}>
            <Text
              className="text-base font-semibold"
              style={{
                color: "#ffffff",
                textDecorationLine: "underline",
              }}
            >
              Read More →
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}