import { View, Text, ScrollView } from "react-native";
import { useColorScheme } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import SearchBar from "@/components/SearchBar";
import FeaturedListings from "@/components/FeaturedListings";
import WhyDealsAndWheels from "@/components/WhyDealsAndWheels";
import BrowseByCategory from "@/components/BrowseByCategory";
import ConnectBuyersAndSellers from "@/components/ConnectBuyersAndSellers";
import FeaturedBlogSection from "@/components/FeaturedBlogSection";
import BrowseByBrand from "@/components/BrowseByBrand";

export default function Home() {
  const theme = useColorScheme() || "light";
  const colorTheme = Colors[theme];
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      edges={["top"]}
      className="flex-1"
      style={{ backgroundColor: colorTheme.background }}
    >
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 100, // Space for tab bar
        }}
        stickyHeaderIndices={[1]} // Makes search bar sticky
        showsVerticalScrollIndicator={false}
      >
        {/* Tagline Section */}
        <View className="px-4 pt-4">
          <Text className="text-3xl font-extrabold mb-1 flex-row">
            <Text style={{ color: colorTheme.text }}>Deals</Text>
            <Text style={{ color: colorTheme.accent }}>&</Text>
            <Text style={{ color: colorTheme.text }}>Wheels</Text>
          </Text>

          <Text
            className="text-base font-medium"
            style={{ color: colorTheme.muted }}
          >
            Find the perfect car, effortlessly.
          </Text>
        </View>

        {/* Sticky SearchBar */}
        <View
          style={{
            paddingHorizontal: 16,
            paddingTop: 8, // Just enough space, not insets.top
            paddingBottom: 8,
            backgroundColor: colorTheme.background,
            zIndex: 10,
          }}
        >
          <SearchBar />
        </View>

        {/* Scrollable Content */}
        <FeaturedListings />
        <WhyDealsAndWheels />
        <ConnectBuyersAndSellers />
        <BrowseByCategory />
        <FeaturedBlogSection />
        <BrowseByBrand />
      </ScrollView>
    </SafeAreaView>
  );
}