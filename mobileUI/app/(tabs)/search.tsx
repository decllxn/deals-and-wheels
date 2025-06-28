import FeaturedListings from "@/components/FeaturedListings";
import QuickFilters from "@/components/QuickFilters";
import SearchBar from "@/components/SearchBar";
import { Colors } from "@/constants/Colors";
import { ScrollView, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function SearchScreen() {
  const theme = useColorScheme() || "light";
  const colorTheme = Colors[theme];

  return (
    <SafeAreaView
      edges={["top"]}
      className="flex-1"
      style={{ backgroundColor: colorTheme.background }}
    >
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: colorTheme.background,
        }}
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
      >
        <View className="px-4 pt-2">
          <SearchBar />
        </View>
        <QuickFilters />
        <FeaturedListings />
      </ScrollView>
    </SafeAreaView>
  );
}