import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import { ToolboxPageWrapper } from "@/components";
import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@/contexts/ThemeProvider";

const prompts = [
  { label: "👁️ 5 things you can SEE", key: "see" },
  { label: "✋ 4 things you can FEEL", key: "feel" },
  { label: "👂 3 things you can HEAR", key: "hear" },
  { label: "👃 2 things you can SMELL", key: "smell" },
  { label: "👅 1 thing you can TASTE", key: "taste" },
];

const grounding = () => {
  const { theme } = useTheme();
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState({});
  const [input, setInput] = useState("");

  const nextPrompt = () => {
    const current = prompts[step].key;
    setResponses({ ...responses, [current]: input });
    setInput("");
    setStep((prev) => prev + 1);
  };

  const resetExercise = () => {
    setStep(0);
    setResponses({});
    setInput("");
  };

  const currentPrompt = prompts[step];

  const isFinished = step >= prompts.length;

  return (
    <ToolboxPageWrapper title="Visual Grounding">
      <View className="flex-1 flex items-center justify-center gap-2">
        <TouchableOpacity
          className="w-24 h-24 rounded-full items-center justify-center flex border-2"
          style={{
            backgroundColor: Colors[theme].tabBar,
            borderColor: Colors[theme].tabIcon,
          }}
        >
          <Feather name="play" size={36} color={Colors[theme].tabIcon} />
        </TouchableOpacity>
        <View className="">
          <Text
            className="text-3xl font-semibold text-center"
            style={{ color: Colors[theme].tabIcon }}
          >
            Start Cognitive Reframe
          </Text>
          <Text
            className="text-base mt-2 text-center"
            style={{ color: Colors[theme].tabIcon }}
          >
            Transform negative or unhelpful thoughts into balanced, constructive
            ones. This guided exercise helps you reflect, reframe, and shift
            your mindset with compassion and clarity.
          </Text>
        </View>
      </View>
      <BlurView
        intensity={30}
        tint="light"
        className="overflow-hidden rounded-2xl"
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 24,
        }}
      >
        {!isFinished ? (
          <View className="w-full">
            <Text className="text-white text-2xl text-center font-semibold mb-6">
              {currentPrompt.label}
            </Text>
            <TextInput
              className="bg-white/90 text-gray-800 rounded-lg p-4 text-base mb-4"
              placeholder="Write it down or just think it..."
              value={input}
              onChangeText={setInput}
              multiline
            />
            <TouchableOpacity
              onPress={nextPrompt}
              activeOpacity={0.6}
              style={{ backgroundColor: Colors[theme].primary }}
              className="px-6 py-3 rounded-xl"
            >
              <Text className="text-white text-center">Next</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="items-center">
            <Text className="text-white text-2xl font-bold mb-4">
              Well done 🌿
            </Text>
            <Text className="text-white text-center mb-6">
              You’ve grounded yourself beautifully. Breathe. You’re here.
            </Text>
            <TouchableOpacity
              onPress={resetExercise}
              className="bg-green-500 px-6 py-3 rounded-xl"
            >
              <Text className="text-white text-center">Start Again</Text>
            </TouchableOpacity>
          </View>
        )}
      </BlurView>
    </ToolboxPageWrapper>
  );
};

export default grounding;
