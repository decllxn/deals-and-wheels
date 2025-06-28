import { useColorScheme } from "@/hooks/useColorScheme";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import type { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import {
  GestureResponderEvent,
  Platform,
  Pressable
} from "react-native";

export default function TabLayout() {
  const theme = useColorScheme();
  const bgColor = useThemeColor({}, "background");
  const activeColor = useThemeColor({}, "tabIconSelected");
  const inactiveColor = useThemeColor({}, "tabIconDefault");

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false, // 🔥 Hide the TopBar completely
        tabBarShowLabel: true,
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarLabelStyle: {
          fontSize: 11,
          paddingBottom: 4,
        },
        tabBarButton: (props: BottomTabBarButtonProps) => (
          <Pressable
            onPress={(e: GestureResponderEvent) => props.onPress?.(e)}
            android_ripple={null}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {props.children}
          </Pressable>
        ),
        tabBarStyle: {
          position: "absolute",
          height: 75,
          paddingBottom: Platform.OS === "ios" ? 20 : 10,
          paddingTop: 8,
          paddingHorizontal: 20,
          backgroundColor: bgColor,
          borderTopWidth: 0,
          borderRadius: 20,
          marginHorizontal: 16,
          marginBottom: 25,
          shadowColor: theme === "dark" ? "#000" : "#000",
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 10,
        },
        tabBarIcon: ({ focused, color }) => {
          const iconSize = focused ? 26 : 22;

          if (route.name === "dealers") {
            return (
              <MaterialIcons
                name="storefront"
                size={iconSize}
                color={color}
              />
            );
          }

          const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
            index: focused ? "home" : "home-outline",
            sell: focused ? "add-circle" : "add-circle-outline",
            search: focused ? "search" : "search-outline",
            account: focused ? "person" : "person-outline",
          };

          return (
            <Ionicons
              name={iconMap[route.name] ?? "help-circle-outline"}
              size={iconSize}
              color={color}
            />
          );
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="search" options={{ title: "Explore" }} />
      <Tabs.Screen name="sell" options={{ title: "Sell Car" }} />
      <Tabs.Screen name="dealers" options={{ title: "Dealers" }} />
      <Tabs.Screen name="account" options={{ title: "Profile" }} />
    </Tabs>
  );
}