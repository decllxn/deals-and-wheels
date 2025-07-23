import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, View, useColorScheme } from "react-native";

// Sample props for dealer info
const currentPlan = {
  name: "Silver",
  listingsUsed: 5,
  listingsLimit: 7,
  nextTier: "Gold",
  nextTierBenefits: "+10 listings, featured placement",
};

export default function PlanStatusBar() {
  const scheme = useColorScheme() || "light";
  const theme = Colors[scheme];
  const router = useRouter();

  const listingsLeft = currentPlan.listingsLimit - currentPlan.listingsUsed;
  const isLimitApproaching = listingsLeft <= 2;

  const handleUpgrade = () => {
    router.push("/subscriptions"); // ✅ This matches app/subscriptions/index.tsx
  };

  return (
    <View className="mb-5 w-full bg-transparent rounded-xl border border-gray-200 dark:border-gray-700 p-4">
      {/* Current Plan Summary */}
      <View className="flex-row justify-between items-center mb-2">
        <View>
          <Text className="text-[14px] font-semibold" style={{ color: theme.text }}>
            Plan: {currentPlan.name}
          </Text>
          <Text className="text-[13px] mt-1" style={{ color: theme.muted }}>
            {listingsLeft} of {currentPlan.listingsLimit} listings remaining
          </Text>
        </View>

        <Ionicons name="card-outline" size={20} color={theme.icon} />
      </View>

      {/* Upgrade Prompt */}
      {isLimitApproaching && (
        <Pressable onPress={handleUpgrade} className="mt-2 flex-row items-center">
          <Text className="text-[13px] font-medium mr-1" style={{ color: theme.accent }}>
            Upgrade to {currentPlan.nextTier} to post more vehicles
          </Text>
          <Ionicons name="arrow-forward-outline" size={16} color={theme.accent} />
        </Pressable>
      )}
    </View>
  );
}