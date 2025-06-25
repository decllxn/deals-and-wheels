import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { Colors } from "@/constants/Colors";

// Manual imports of logos
import toyotaLogo from "@/assets/images/Brand_logos/toyota.png";
import nissanLogo from "@/assets/images/Brand_logos/nissan.png";
import mazdaLogo from "@/assets/images/Brand_logos/mazda.png";
import subaruLogo from "@/assets/images/Brand_logos/subaru.png";
import mercedesLogo from "@/assets/images/Brand_logos/mercedes.png";
import bmwLogo from "@/assets/images/Brand_logos/bmw.png";
import audiLogo from "@/assets/images/Brand_logos/audi.png";
import volkswagenLogo from "@/assets/images/Brand_logos/volkswagen.png";
import hondaLogo from "@/assets/images/Brand_logos/honda.png";
import mitsubishiLogo from "@/assets/images/Brand_logos/mitsubishi.png";

// Paired brand names with images
const brandData = [
  { name: "Toyota", logo: toyotaLogo },
  { name: "Nissan", logo: nissanLogo },
  { name: "Mazda", logo: mazdaLogo },
  { name: "Subaru", logo: subaruLogo },
  { name: "Mercedes", logo: mercedesLogo },
  { name: "BMW", logo: bmwLogo },
  { name: "Audi", logo: audiLogo },
  { name: "Volkswagen", logo: volkswagenLogo },
  { name: "Honda", logo: hondaLogo },
  { name: "Mitsubishi", logo: mitsubishiLogo },
];

export default function BrowseByBrand() {
  const theme = useColorScheme() || "light";
  const colorTheme = Colors[theme];

  return (
    <View className="px-4 pb-10" style={{ backgroundColor: colorTheme.background }}>
      {/* Section Title */}
      <Text className="text-xl font-bold mb-4" style={{ color: colorTheme.text }}>
        Browse by Car Brand
      </Text>

      {/* Edge-to-edge ScrollView */}
      <View className="-mx-4">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: 20,
            paddingHorizontal: 16,
          }}
        >
          {brandData.map(({ name, logo }) => (
            <TouchableOpacity
              key={name}
              className="items-center justify-center"
              onPress={() => {
                // handle brand tap here
              }}
            >
              <Image
                source={logo}
                style={{ width: 80, height: 80, resizeMode: "contain" }}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Double Accent Lines - Thicker and Shifted */}
      <View className="mt-10 items-center space-y-6">
        {/* Top line - shifted left */}
        <View
          style={{
            width: "40%",
            height: 6,
            backgroundColor: colorTheme.accent,
            borderRadius: 3,
            opacity: 0.8,
            alignSelf: "center",
            marginLeft: -50,
          }}
        />

        {/* Bottom line - shifted right */}
        <View
          style={{
            width: "40%",
            height: 6,
            backgroundColor: colorTheme.accent,
            borderRadius: 3,
            opacity: 0.4,
            alignSelf: "center",
            marginRight: -50,
            marginTop: 20,
            marginBottom: 20,
          }}
        />
      </View>
    </View>
  );
}