import ChatList from "@/components/Inbox/ChatList";
import HeaderTitle from "@/components/Inbox/HeaderTitle";
import InboxActions from "@/components/Inbox/InboxActions";
import ViewSelector from "@/components/Inbox/ViewSelector";
import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { Text, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Messaging() {
  const [activeTab, setActiveTab] = useState<"messages" | "notifications">("messages");
  const theme = useColorScheme() || "light";
  const colorTheme = Colors[theme];

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={{
        flex: 1,
        backgroundColor: colorTheme.background,
      }}
    >
      <View style={{ flex: 1, padding: 16 }}>
        <HeaderTitle title="Inbox" />

        {/* 🔍 Search & Settings buttons */}
        <InboxActions
          onSearchPress={() => console.log("Search pressed")}
          onSettingsPress={() => console.log("Settings pressed")}
        />

        <ViewSelector active={activeTab} onChange={setActiveTab} />

        {activeTab === "messages" ? (
          <ChatList />
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: colorTheme.muted,
                textAlign: "center",
              }}
            >
              🔔 Notifications coming soon...
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}