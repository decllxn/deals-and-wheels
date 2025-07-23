// app/profile/edit.tsx
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function EditProfileScreen() {
  const router = useRouter();

  // Dummy initial values — replace with context or API
  const [name, setName] = useState("Declan Munene");
  const [email, setEmail] = useState("declan@example.com");

  const handleSave = () => {
    // Here you would typically call an API to save the updated info
    Alert.alert("Success", "Profile updated!");
    router.back(); // Go back to profile screen
  };

  return (
    <ScrollView className="flex-1 bg-white px-4 pt-10">
      <View className="flex-row items-center mb-6">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold">Edit Profile</Text>
      </View>

      <View className="mb-6">
        <Text className="text-sm text-gray-600 mb-2">Full Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          className="border border-gray-300 rounded-md px-4 py-3 text-base text-gray-800"
        />
      </View>

      <View className="mb-6">
        <Text className="text-sm text-gray-600 mb-2">Email Address</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          className="border border-gray-300 rounded-md px-4 py-3 text-base text-gray-800"
        />
      </View>

      <TouchableOpacity
        onPress={handleSave}
        className="bg-blue-600 py-4 rounded-md items-center"
      >
        <Text className="text-white font-bold text-base">Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}