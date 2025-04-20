import React from "react";
import { BlurView } from "expo-blur";
import { Themed } from "@/themed";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/contexts/ThemeProvider";
import { Text } from "react-native";
import { dailyFocus } from "@/constants/DailyFocus";

const DailyFocusCard = () => {
  const { theme } = useTheme();

  const dayOfMonth = new Date().getDate();

  const dailyFocusText = dailyFocus[dayOfMonth % dailyFocus.length];

  return (
    <BlurView
      intensity={50}
      tint="light"
      className="w-full rounded-3xl mt-4 px-6 py-4 overflow-hidden justify-center items-start"
    >
      <Themed.Text
        className="text-primary text-[14px] font-semibold mb-2"
        style={{ color: Colors[theme].text }}
      >
        🌱 Daily Focus
      </Themed.Text>
      <Text
        className="text-secondary text-[14px] italic"
        style={{ color: Colors[theme].text }}
      >
        {dailyFocusText}
      </Text>
    </BlurView>
  );
};

export default DailyFocusCard;
