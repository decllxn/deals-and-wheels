import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import React, { useState } from "react";
import { Modal, Pressable, ScrollView, Text, View, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const POPULAR_MAKES = [
  "Toyota", "Nissan", "Mitsubishi", "Mercedes", "BMW",
  "Honda", "Hyundai", "Ford", "Mazda", "Volkswagen",
];

interface Props {
  makes: string[];
  onChangeMakes: (selected: string[]) => void;
  yearRange: [number, number];
  onChangeYear: (range: [number, number]) => void;
  transmission: string | null;
  onChangeTrans: (val: string) => void;
}

export default function VehicleAttributes({
  makes,
  onChangeMakes,
  yearRange,
  onChangeYear,
  transmission,
  onChangeTrans,
}: Props) {
  const theme = useColorScheme() || "light";
  const colorTheme = Colors[theme];

  const [makesModal, setMakesModal] = useState(false);
  const [transModal, setTransModal] = useState(false);

  return (
    <View>
      {/* Makes Selector */}
      <Pressable onPress={() => setMakesModal(true)} style={{ marginBottom: 24 }}>
        <Text style={{ color: colorTheme.text, fontWeight: "600", marginBottom: 8 }}>Make</Text>
        <Text style={{ color: colorTheme.accent }}>{makes.length ? makes.join(", ") : "Any"}</Text>
      </Pressable>

      {/* Year Range */}
      <View style={{ marginBottom: 24 }}>
        <Text style={{ color: colorTheme.text, fontWeight: "600", marginBottom: 8 }}>Model Year</Text>
        <Text style={{ color: colorTheme.muted, marginBottom: 8 }}>
          {yearRange[0]} – {yearRange[1]}
        </Text>
        <MultiSlider
          values={yearRange}
          min={2000}
          max={new Date().getFullYear()}
          step={1}
          onValuesChange={(vals) => onChangeYear([vals[0], vals[1]])}
          selectedStyle={{ backgroundColor: colorTheme.accent }}
          unselectedStyle={{ backgroundColor: colorTheme.border }}
          markerStyle={{ backgroundColor: colorTheme.accent }}
          trackStyle={{ height: 4, borderRadius: 2 }}
          sliderLength={280}
        />
      </View>

      {/* Transmission Selector */}
      <Pressable onPress={() => setTransModal(true)} style={{ marginBottom: 24 }}>
        <Text style={{ color: colorTheme.text, fontWeight: "600", marginBottom: 8 }}>Transmission</Text>
        <Text style={{ color: colorTheme.accent }}>{transmission ?? "Any"}</Text>
      </Pressable>

      {/* Makes Modal */}
      <Modal visible={makesModal} animationType="slide" transparent>
        <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.3)", justifyContent: "center" }}>
          <View style={{
            backgroundColor: colorTheme.surface,
            margin: 20,
            borderRadius: 16,
            padding: 20,
          }}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: colorTheme.text, marginBottom: 12 }}>
              Select Make(s)
            </Text>
            <ScrollView style={{ maxHeight: 250 }}>
              {POPULAR_MAKES.map((make) => {
                const selected = makes.includes(make);
                return (
                  <Pressable
                    key={make}
                    onPress={() => {
                      onChangeMakes(
                        selected
                          ? makes.filter((m) => m !== make)
                          : [...makes, make]
                      );
                    }}
                    style={{ flexDirection: "row", alignItems: "center", paddingVertical: 8 }}
                  >
                    <Ionicons
                      name={selected ? "checkbox" : "square-outline"}
                      size={20}
                      color={selected ? colorTheme.accent : colorTheme.border}
                      style={{ marginRight: 10 }}
                    />
                    <Text style={{ color: colorTheme.text }}>{make}</Text>
                  </Pressable>
                );
              })}
            </ScrollView>
            <Pressable onPress={() => setMakesModal(false)} style={{ marginTop: 16, alignSelf: "flex-end" }}>
              <Text style={{ color: colorTheme.accent, fontWeight: "600" }}>Done</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </Modal>

      {/* Transmission Modal */}
      <Modal visible={transModal} animationType="fade" transparent>
        <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.3)", justifyContent: "center" }}>
          <View style={{
            backgroundColor: colorTheme.surface,
            margin: 40,
            borderRadius: 16,
            padding: 20,
          }}>
            {["Any", "Automatic", "Manual"].map((val) => (
              <Pressable
                key={val}
                onPress={() => {
                  onChangeTrans: (val: string | null) => void
                  setTransModal(false);
                }}
                style={{ flexDirection: "row", alignItems: "center", paddingVertical: 12 }}
              >
                <Ionicons
                  name={transmission === val ? "radio-button-on" : "radio-button-off"}
                  size={20}
                  color={transmission === val ? colorTheme.accent : colorTheme.border}
                  style={{ marginRight: 10 }}
                />
                <Text style={{ color: colorTheme.text }}>{val}</Text>
              </Pressable>
            ))}
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
}