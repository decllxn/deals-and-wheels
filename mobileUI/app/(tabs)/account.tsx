import AccountFooter from "@/components/profile/AccountFooter";
import AccountLinks from "@/components/profile/AccountLinks";
import BecomeDealerCard from "@/components/profile/BecomeDealerCard";
import DashboardLinks from "@/components/profile/DashboardLinks";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Account() {
  const router = useRouter();
  const scheme = useColorScheme() || "light";
  const theme = Colors[scheme];

  // Dummy user data — replace with real user context or API
  const user = {
    name: "Declan Munene",
    email: "declan@example.com",
    avatarUrl: "https://i.pravatar.cc/150?img=11",
  };

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={{ flex: 1, backgroundColor: theme.background }}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: 80,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <ProfileHeader
          name={user.name}
          email={user.email}
          avatarUrl={user.avatarUrl}
          onEdit={() => router.push("/profile/edit")}
        />

        {/* Dashboard + Saved Listings */}
        <View className="mt-6">
          <DashboardLinks savedCount={3} isDealer={true} />
        </View>

        {/* Become a Dealer Call-to-Action */}
        <BecomeDealerCard />

        {/* Informational Account Links */}
        <AccountLinks />

        {/* Footer: Legal + Logout + Version */}
        <AccountFooter />
      </ScrollView>
    </SafeAreaView>
  );
}