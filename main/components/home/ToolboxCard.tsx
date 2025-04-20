import React from "react";
import { BlurView } from "expo-blur";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/contexts/ThemeProvider";
import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

const toolRoutes: Record<string, string> = {
  Breathe: "/tools/breathing",
  Reframe: "/tools/reframe",
  Ground: "/tools/grounding",
};

const ToolboxCard = () => {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <BlurView
      intensity={50}
      tint="light"
      className="w-full rounded-3xl mt-4 px-6 py-4 overflow-hidden justify-center items-start"
    >
      <Text
        className="text-primary text-[14px] font-semibold mb-2"
        style={{ color: Colors[theme].text }}
      >
        🧰 Toolbox
      </Text>
      <View className="w-full flex-wrap space-x-2 gap-2">
        {["Breathe", "Reframe", "Ground"].map((tool, i) => (
          <TouchableOpacity
            key={i}
            className="px-3 py-2 bg-white/40 rounded-xl"
            onPress={() => router.push(toolRoutes[tool] as never)}
          >
            <Text
              className="text-[12px] text-primary"
              style={{ color: Colors[theme].text }}
            >
              {tool === "Breathe"
                ? "🧘 Breathing Guide"
                : tool === "Reframe"
                ? "🧠 Coginitive Reframe"
                : tool === "Ground"
                ? "👁️ Visual Grounding"
                : tool}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </BlurView>
  );
};

export default ToolboxCard;
