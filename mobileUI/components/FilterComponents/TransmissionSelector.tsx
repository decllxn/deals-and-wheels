// components/FilterComponents/TransmissionSelector.tsx
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Modal,
    Pressable,
    Text,
    View,
    useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  transmission: string | null;
  onChangeTrans: (val: string | null) => void;
}

export default function TransmissionSelector({ transmission, onChangeTrans }: Props) {
  const theme = useColorScheme() || "light";
  const colorTheme = Colors[theme];

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Pressable onPress={() => setModalVisible(true)} style={{ marginBottom: 24 }}>
        <Text style={{ color: colorTheme.text, fontWeight: "600", marginBottom: 8 }}>Transmission</Text>
        <Text style={{ color: colorTheme.accent }}>{transmission ?? "Any"}</Text>
      </Pressable>

      <Modal visible={modalVisible} transparent animationType="fade">
        <SafeAreaView
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
              borderRadius: 14,
              padding: 20,
              width: "85%",
            }}
          >
            {/* Header */}
            <View className="flex-row items-center justify-between mb-4">
              <Text style={{ fontSize: 18, fontWeight: "bold", color: colorTheme.text }}>
                Transmission
              </Text>
              <Pressable onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={22} color={colorTheme.text} />
              </Pressable>
            </View>

            {["Any", "Automatic", "Manual"].map((val) => (
              <Pressable
                key={val}
                onPress={() => {
                  onChangeTrans(val === "Any" ? null : val);
                  setModalVisible(false);
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 12,
                }}
              >
                <Ionicons
                  name={
                    transmission === val || (val === "Any" && transmission === null)
                      ? "radio-button-on"
                      : "radio-button-off"
                  }
                  size={20}
                  color={
                    transmission === val || (val === "Any" && transmission === null)
                      ? colorTheme.accent
                      : colorTheme.border
                  }
                  style={{ marginRight: 10 }}
                />
                <Text style={{ color: colorTheme.text, fontSize: 16 }}>{val}</Text>
              </Pressable>
            ))}
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
}