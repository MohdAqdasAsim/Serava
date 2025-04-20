import React from "react";
import { BlurView } from "expo-blur";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/contexts/ThemeProvider";
import { Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const JournalCard = () => {
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
        ✍️ Journal
      </Text>
      <Text
        style={{ color: Colors[theme].text }}
        className="text-secondary text-[14px] mb-2"
      >
        You haven’t written today. Want to capture how you feel?
      </Text>
      <TouchableOpacity
        className="bg-white/40 px-3 py-1 rounded-xl self-start"
        onPress={() => router.push("/journal/journal")}
      >
        <Text
          className="text-white text-[12px]"
          style={{ color: Colors[theme].text }}
        >
          Start Journaling
        </Text>
      </TouchableOpacity>
    </BlurView>
  );
};

export default JournalCard;
