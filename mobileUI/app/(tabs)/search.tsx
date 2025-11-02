import QuickFilters from "@/components/QuickFilters";
import SearchBar from "@/components/SearchBar";
import { Colors } from "@/constants/Colors";
import { ScrollView, useColorScheme, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSearchStore } from "@/store/searchStore";
import CarCard from "@/components/CarCard";

import { Car } from "@/types/Car";

export default function SearchScreen() {
  const theme = useColorScheme() || "light";
  const colorTheme = Colors[theme];

  const { results, query } = useSearchStore();

  const hasSearch = query.trim().length > 0;

  // ✅ always safe
  const carsToDisplay: Car[] = hasSearch ? results.cars : [];

  return (
    <SafeAreaView
      edges={["top"]}
      className="flex-1"
      style={{ backgroundColor: colorTheme.background }}
    >
      <ScrollView
        style={{ flex: 1, backgroundColor: colorTheme.background }}
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
      >
        {/* Search input */}
        <View className="px-4 pt-2">
          <SearchBar />
        </View>

        <QuickFilters />

        {/* Vehicles list */}
        <View className="px-4 mt-4">
          {carsToDisplay.length > 0 ? (
            carsToDisplay.map((car) => (
              <View key={car.id ?? car.name} className="mb-4">
                <CarCard car={car} />
              </View>
            ))
          ) : (
            <Text style={{ color: colorTheme.muted, fontSize: 16 }}>
              {hasSearch
                ? "No results found. Try another keyword."
                : "No cars available."}
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
