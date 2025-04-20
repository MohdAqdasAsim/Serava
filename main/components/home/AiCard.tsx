import React from "react";
import { BlurView } from "expo-blur";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/contexts/ThemeProvider";
import { Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const AiCard = () => {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <BlurView
      intensity={50}
      tint="light"
      className="w-full rounded-3xl mt-4 px-6 py-4 overflow-hidden justify-center items-start"
    >
      <Text
        style={{ color: Colors[theme].text }}
        className="text-primary text-[14px] font-semibold mb-2"
      >
        🤖 Talk to Serava
      </Text>
      <Text
        style={{ color: Colors[theme].text }}
        className="text-secondary text-[14px] mb-2"
      >
        Feeling something? Need someone to talk to? Serava is here to listen.
      </Text>
      <TouchableOpacity
        className="bg-white/40 px-3 py-1 rounded-xl self-start"
        onPress={() => router.push("/chat/ai-chat")}
      >
        <Text
          className="text-white text-[12px]"
          style={{ color: Colors[theme].text }}
        >
          Open Chat
        </Text>
      </TouchableOpacity>
    </BlurView>
  );
};

export default AiCard;
