// components/ScreenWithTopBar.tsx
import { View } from "react-native";
import TopBar from "./TopBar";

export default function ScreenWithTopBar({ children }: { children: React.ReactNode }) {
  return (
    <View className="flex-1 bg-white">
      <TopBar />
      {children}
    </View>
  );
}