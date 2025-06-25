import { Colors } from "@/constants/Colors";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, Text, useColorScheme, View } from "react-native";

// SVGs
import AISvg from "@/assets/images/AI.svg";
import BuyersSvg from "@/assets/images/buisness.svg";
import DealersSvg from "@/assets/images/dealers.svg";
import SellersSvg from "@/assets/images/seller.svg";

const features = [
  {
    icon: BuyersSvg,
    title: "For Buyers",
    description:
      "Browse verified vehicles, bid or buy instantly, and access nationwide inventory in one place.",
  },
  {
    icon: SellersSvg,
    title: "For Sellers",
    description:
      "List your car for free and receive competitive offers from trusted Kenyan dealers — fast and fair.",
  },
  {
    icon: DealersSvg,
    title: "For Dealers",
    description:
      "Use our smart dealer portal to bid on private listings, expand your reach, and close deals remotely.",
  },
  {
    icon: AISvg,
    title: "Smart AI",
    description:
      "Access price estimates, car history summaries, and auto-listing suggestions — powered by AI.",
  },
];

export default function WhyDealsAndWheels() {
  const theme = useColorScheme() || "light";
  const colorTheme = Colors[theme];
  const scrollRef = useRef<ScrollView>(null);
  const cardWidth = 320 + 16; // card width + marginRight
  const [scrollIndex, setScrollIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % features.length;
        scrollRef.current?.scrollTo({
          x: nextIndex * cardWidth,
          animated: true,
        });
        return nextIndex;
      });
    }, 4000); // scroll every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <View className="mt-10">
      {/* Section Title */}
      <View className="px-4 mb-6 relative">
        <Text
          className="text-2xl font-bold"
          style={{ color: colorTheme.text, zIndex: 2 }}
        >
          Why Deals<Text style={{ color: colorTheme.accent }}>&</Text>Wheels?
        </Text>
      </View>

      {/* Cards */}
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
          paddingTop: 4,
        }}
        scrollEventThrottle={16}
      >
        {features.map(({ icon: Icon, title, description }, index) => {
          const [titleWidth, setTitleWidth] = useState(0);

          return (
            <View
              key={index}
              className="rounded-2xl mr-4 px-5 py-4"
              style={{
                width: 320,
                backgroundColor: colorTheme.surface,
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 4 },
                elevation: 5,
              }}
            >
              <View className="flex-row mb-4 items-center">
                <Icon width={144} height={144} />
                <View className="relative ml-4">
                  <View
                    style={{
                      height: 4,
                      backgroundColor: colorTheme.accent,
                      opacity: 0.2,
                      borderRadius: 2,
                      position: "absolute",
                      top: 14,
                      width: titleWidth + 10,
                      zIndex: 1,
                    }}
                  />
                  <Text
                    className="text-xl font-semibold"
                    style={{
                      color: colorTheme.text,
                      zIndex: 2,
                    }}
                    onLayout={(e) =>
                      setTitleWidth(e.nativeEvent.layout.width)
                    }
                    numberOfLines={2}
                  >
                    {title}
                  </Text>
                </View>
              </View>

              <Text
                className="text-base font-medium"
                style={{
                  color: colorTheme.muted,
                  lineHeight: 22,
                }}
              >
                {description}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}