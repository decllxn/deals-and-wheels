import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    Dimensions,
    Image,
    Platform,
    Pressable,
    ScrollView,
    Text,
    View,
    useColorScheme,
} from "react-native";
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";

// Logo imports
import AudiPng from "@/assets/images/Brand_logos/audi.png";
import BmwPng from "@/assets/images/Brand_logos/bmw.png";
import FordPng from "@/assets/images/Brand_logos/ford.png";
import HondaPng from "@/assets/images/Brand_logos/honda.png";
import HyundaiPng from "@/assets/images/Brand_logos/hyundai.png";
import KiaPng from "@/assets/images/Brand_logos/kia.png";
import MazdaPng from "@/assets/images/Brand_logos/mazda.png";
import MercedesPng from "@/assets/images/Brand_logos/mercedes.png";
import NissanPng from "@/assets/images/Brand_logos/nissan.png";
import SubaruPng from "@/assets/images/Brand_logos/subaru.png";
import ToyotaPng from "@/assets/images/Brand_logos/toyota.png";
import VolkswagenPng from "@/assets/images/Brand_logos/volkswagen.png";

const MAKES = [
  { name: "Toyota", icon: ToyotaPng },
  { name: "Honda", icon: HondaPng },
  { name: "Nissan", icon: NissanPng },
  { name: "Mazda", icon: MazdaPng },
  { name: "Subaru", icon: SubaruPng },
  { name: "BMW", icon: BmwPng },
  { name: "Mercedes", icon: MercedesPng },
  { name: "Audi", icon: AudiPng },
  { name: "Volkswagen", icon: VolkswagenPng },
  { name: "Ford", icon: FordPng },
  { name: "Hyundai", icon: HyundaiPng },
  { name: "Kia", icon: KiaPng },
];

interface Props {
  visible: boolean;
  onClose: () => void;
  selected?: string[];
  onSelect?: (makes: string[]) => void;
}

const SCREEN_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = (SCREEN_WIDTH - 80) / 3;

export default function MakeFilterModal({
  visible,
  onClose,
  selected = [],
  onSelect = () => {},
}: Props) {
  const theme = useColorScheme() || "light";
  const colorTheme = Colors[theme];

  const handleToggle = (make: string) => {
    const updated = selected.includes(make)
      ? selected.filter((m) => m !== make)
      : [...selected, make];
    onSelect(updated);
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.3}
      style={{
        margin: 0,
        justifyContent: "flex-end",
        zIndex: 9999,
      }}
    >
      <SafeAreaView
        edges={["bottom", "left", "right"]}
        style={{
          backgroundColor: colorTheme.surface,
          paddingTop: 20,
          paddingHorizontal: 20,
          paddingBottom: Platform.OS === "ios" ? 32 : 20,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          minHeight: 360,
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
          <Text style={{ fontSize: 20, fontWeight: "700", color: colorTheme.text }}>
            Select Make
          </Text>
          <Pressable onPress={onClose}>
            <Ionicons name="close" size={24} color={colorTheme.text} />
          </Pressable>
        </View>

        {/* Brand Grid */}
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            {MAKES.map(({ name, icon }) => {
              const isSelected = selected.includes(name);
              return (
                <Pressable
                  key={name}
                  onPress={() => handleToggle(name)}
                  style={{
                    width: ITEM_WIDTH,
                    alignItems: "center",
                    paddingVertical: 14,
                    paddingHorizontal: 8,
                    borderRadius: 16,
                    borderWidth: 1.5,
                    borderColor: isSelected ? colorTheme.accent : colorTheme.border,
                    backgroundColor: isSelected
                      ? colorTheme.accent + "20"
                      : colorTheme.surface,
                  }}
                >
                  <Image
                    source={icon}
                    style={{
                      width: 38,
                      height: 38,
                      marginBottom: 6,
                      // no tintColor – keeps original colors intact
                    }}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "500",
                      textAlign: "center",
                      color: isSelected ? colorTheme.accent : colorTheme.text,
                    }}
                  >
                    {name}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>

        {/* Done Button */}
        <Pressable
          onPress={onClose}
          style={{
            marginTop: 20,
            backgroundColor: colorTheme.accent,
            paddingVertical: 14,
            borderRadius: 12,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
            Done
          </Text>
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
}