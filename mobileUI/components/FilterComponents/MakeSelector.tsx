import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// --- START: Individual Logo Imports ---
// Adjust these paths based on your actual Brand_logos directory location
import AudiLogo from "../../assets/images/Brand_logos/audi.png";
import BMWLogo from "../../assets/images/Brand_logos/bmw.png";
import ChevroletLogo from "../../assets/images/Brand_logos/chevrolet.png";
import FordLogo from "../../assets/images/Brand_logos/ford.png";
import HondaLogo from "../../assets/images/Brand_logos/honda.png";
import HyundaiLogo from "../../assets/images/Brand_logos/hyundai.png";
import JeepLogo from "../../assets/images/Brand_logos/jeep.png";
import LandRoverLogo from "../../assets/images/Brand_logos/land-rover.png";
import LexusLogo from "../../assets/images/Brand_logos/Lexus.png";
import MazdaLogo from "../../assets/images/Brand_logos/mazda.png";
import MercedesLogo from "../../assets/images/Brand_logos/mercedes.png";
import MitsubishiLogo from "../../assets/images/Brand_logos/mitsubishi.png";
import NissanLogo from "../../assets/images/Brand_logos/nissan.png";
import PorscheLogo from "../../assets/images/Brand_logos/porsche.png";
import SubaruLogo from "../../assets/images/Brand_logos/subaru.png";
import TeslaLogo from "../../assets/images/Brand_logos/tesla.png";
import ToyotaLogo from "../../assets/images/Brand_logos/toyota.png";
import VolkswagenLogo from "../../assets/images/Brand_logos/volkswagen.png";
import VolvoLogo from "../../assets/images/Brand_logos/volvo.png";
// --- END: Individual Logo Imports ---

const POPULAR_MAKES = [
  "Toyota",
  "Nissan",
  "Mitsubishi",
  "Mercedes",
  "BMW",
  "Honda",
  "Hyundai",
  "Ford",
  "Mazda",
  "Volkswagen",
  "Audi",
  "Chevrolet",
  "Subaru",
  "Volvo",
  "Lexus",
  "Porsche",
  "Tesla",
  "Jeep",
  "Land Rover",
];

// Mapping object for logos
const MAKE_LOGOS: { [key: string]: any } = {
  Toyota: ToyotaLogo,
  Nissan: NissanLogo,
  Mitsubishi: MitsubishiLogo,
  Mercedes: MercedesLogo,
  BMW: BMWLogo,
  Honda: HondaLogo,
  Hyundai: HyundaiLogo,
  Ford: FordLogo,
  Mazda: MazdaLogo,
  Volkswagen: VolkswagenLogo,
  Audi: AudiLogo,
  Chevrolet: ChevroletLogo,
  Subaru: SubaruLogo,
  Volvo: VolvoLogo,
  Lexus: LexusLogo,
  Porsche: PorscheLogo,
  Tesla: TeslaLogo,
  Jeep: JeepLogo,
  "Land Rover": LandRoverLogo,
  // Add other makes here if you have logos for them
};

interface Props {
  makes: string[];
  onChangeMakes: (selected: string[]) => void;
}

// Function to get the logo from the pre-imported map
const getMakeLogo = (make: string) => {
  return MAKE_LOGOS[make] || null; // Return the logo or null if not found
};

export default function MakeSelector({ makes, onChangeMakes }: Props) {
  const theme = useColorScheme() || "light";
  const colorTheme = Colors[theme];

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      {/* Trigger */}
      <Pressable onPress={() => setModalVisible(true)} style={{ marginBottom: 24 }}>
        <Text
          style={{ color: colorTheme.text, fontWeight: "700", fontSize: 16, marginBottom: 8 }}
        >
          Make
        </Text>

        {/* Selected Makes as Tags */}
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          {makes.length === 0 ? (
            <Text style={{ color: colorTheme.accent, fontSize: 14 }}>Any</Text>
          ) : (
            makes.map((make) => (
              <View
                key={make}
                style={{
                  backgroundColor: colorTheme.accent + "22",
                  paddingHorizontal: 12, // Increased padding
                  paddingVertical: 6, // Increased padding
                  borderRadius: 20, // Slightly larger border radius
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6, // Increased space between logo and text
                }}
              >
                {getMakeLogo(make) && (
                  <Image
                    source={getMakeLogo(make)}
                    style={{ width: 22, height: 22, resizeMode: "contain" }} // Increased logo size
                  />
                )}
                <Text style={{ color: colorTheme.accent, fontSize: 15, fontWeight: "600" }}>
                  {make}
                </Text>
              </View>
            ))
          )}
        </View>
      </Pressable>

      {/* Modal */}
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView
          edges={["bottom", "left", "right"]}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
        >
          <View
            style={{
              backgroundColor: colorTheme.surface,
              borderRadius: 16,
              paddingVertical: 20,
              paddingHorizontal: 20,
              width: "85%",
              maxHeight: "70%",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.25,
              shadowRadius: 8,
              elevation: 10,
            }}
          >
            {/* Header */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold", color: colorTheme.text }}>
                Select Make(s)
              </Text>
              <Pressable onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color={colorTheme.text} />
              </Pressable>
            </View>

            {/* Scrollable Make List */}
            <ScrollView showsVerticalScrollIndicator={false}>
              {POPULAR_MAKES.map((make) => {
                const selected = makes.includes(make);
                const makeLogo = getMakeLogo(make);
                return (
                  <Pressable
                    key={make}
                    onPress={() =>
                      onChangeMakes(selected ? makes.filter((m) => m !== make) : [...makes, make])
                    }
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingVertical: 14, // Increased vertical padding for items
                    }}
                  >
                    <Ionicons
                      name={selected ? "checkbox" : "square-outline"}
                      size={24} // Increased checkbox size
                      color={selected ? colorTheme.accent : colorTheme.border}
                      style={{ marginRight: 15 }} // Increased right margin
                    />
                    {makeLogo && (
                      <Image
                        source={makeLogo}
                        style={{ width: 24, height: 24, resizeMode: "contain", marginRight: 10 }} // Increased logo size and margin
                      />
                    )}
                    <Text style={{ color: colorTheme.text, fontSize: 17 }}>{make}</Text>{" "}
                    {/* Increased font size */}
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
}