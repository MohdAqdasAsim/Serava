import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { ToolboxPageWrapper } from "@/components"; // Assuming ToolboxPageWrapper is your layout component
import { getGeminiResponse } from "@/services/gemini";
import { BlurView } from "expo-blur"; // Importing the BlurView component from expo-blur

// Function to wrap input with context for Gemini API
const wrapWithPrompt = (input: string) => {
  return `
    You are a supportive mental wellness assistant. A user has shared the following negative thought:
    "${input}"
    Your task is to provide three gentle, thought-provoking **self-reflection questions** that can guide the user toward reframing the thought.
    Focus on cognitive reframing techniques. Avoid offering direct advice or rewriting the thought. Your goal is to help the user explore their beliefs and arrive at a healthier perspective **themselves**.
    Please return exactly three questions, each on a new line.
  `;
};

const Reframe = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [negativeThought, setNegativeThought] = useState("");
  const [reframedThought, setReframedThought] = useState("");
  const [guidance, setGuidance] = useState<string | null>(null);

  // Function to open the modal
  const openModal = () => {
    setNegativeThought("");
    setReframedThought("");
    setGuidance(null);
    setIsModalVisible(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalVisible(false);
  };

  // Function to generate cognitive reframe guidance
  const generateGuidance = async () => {
    if (negativeThought) {
      // Wrap the negative thought with the prompt for the Gemini API
      const wrappedInput = wrapWithPrompt(negativeThought);

      // Get reframed thought from Gemini API
      const aiResponse = await getGeminiResponse(wrappedInput);

      // Simple guidance to help frame the thought if Gemini response is slow or empty
      setGuidance(aiResponse);
    } else {
      setGuidance("Please enter a negative thought to get started.");
    }
  };

  // Handle save action (optional)
  const handleSave = () => {
    // Save the reframed thought (e.g., to a database or locally)
    console.log("Saved Thought: ", reframedThought);
    closeModal();
  };

  return (
    <ToolboxPageWrapper title="Cognitive Reframe">
      <TouchableOpacity
        onPress={openModal}
        className="bg-blue-500 px-6 py-3 rounded-xl mb-6"
      >
        <Text className="text-white font-semibold">
          Start Cognitive Reframe
        </Text>
      </TouchableOpacity>

      {/* Modal for Cognitive Reframe */}
      <Modal
        visible={isModalVisible}
        onRequestClose={closeModal}
        transparent={true}
        animationType="slide"
      >
        <BlurView
          intensity={50}
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View className="bg-white w-4/5 p-6 rounded-xl shadow-xl">
            <Text className="text-2xl font-bold text-center mb-4">
              Cognitive Reframe
            </Text>

            <Text className="text-base text-center text-gray-700 mb-4">
              Think of a recent negative thought you’ve had. What is something
              that you believe about yourself, others, or a situation that may
              not be entirely true?
            </Text>

            <TextInput
              className="h-24 border border-gray-300 rounded-lg p-3 mb-4 text-gray-700"
              placeholder="Enter negative thought"
              value={negativeThought}
              onChangeText={setNegativeThought}
              multiline
            />

            <TouchableOpacity
              onPress={generateGuidance}
              className="bg-green-500 px-4 py-2 rounded-lg mb-4"
            >
              <Text className="text-white text-center">Get Guidance</Text>
            </TouchableOpacity>

            {guidance && (
              <ScrollView className="mb-4">
                <Text className="text-gray-600 text-sm">{guidance}</Text>
              </ScrollView>
            )}

            <TextInput
              className="h-24 border border-gray-300 rounded-lg p-3 mb-4 text-gray-700"
              placeholder="Reframe your thought"
              value={reframedThought}
              onChangeText={setReframedThought}
              multiline
            />

            <View className="flex-row justify-between">
              <TouchableOpacity
                onPress={handleSave}
                className="bg-green-500 px-4 py-2 rounded-lg"
              >
                <Text className="text-white text-center">Save Thought</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={closeModal}
                className="bg-red-500 px-4 py-2 rounded-lg"
              >
                <Text className="text-white text-center">Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      </Modal>
    </ToolboxPageWrapper>
  );
};

export default Reframe;
