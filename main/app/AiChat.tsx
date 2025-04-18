import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { ArrowLeft, Send } from "lucide-react-native";
import { CustomHeader, GradientWrapper } from "@/components";
import { useTheme } from "@/contexts/ThemeProvider";
import { Colors } from "@/constants/Colors";
import Markdown from "react-native-markdown-display"; // Import Markdown
import { getGeminiResponse } from "@/services/gemini"; // Assuming you have this service
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  fetchConversationById,
  storeConversation,
  updateConversation,
} from "@/services/firebaseFunctions";
import { useLocalSearchParams, useRouter } from "expo-router";

type Message = { from: "user" | "ai"; text: string };

const AiChat = () => {
  const { conversationId } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [conversationTitle, setConversationTitle] = useState("");
  const [isConversationStarted, setIsConversationStarted] = useState(false); // Track conversation start

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const loadConversation = async () => {
      if (conversationId && typeof conversationId === "string") {
        const result = await fetchConversationById(conversationId);

        const formattedMessages =
          (result.data?.messages as Message[])?.map((msg) => ({
            from: msg.from === "user" ? "user" : "ai", // Map sender to user/ai
            text: msg.text || "No message content", // Fallback if content is undefined
          })) || [];

        if (result.success) {
          setMessages(formattedMessages);
          setConversationTitle("");
          setIsConversationStarted(true); // mark as already started
        } else {
          console.error("Could not load conversation:", result.message);
        }
      }
    };

    loadConversation();
  }, [conversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const emotion = theme;

    const promptWrapper = `You are an emotionally intelligent AI named **Serava**, designed to be a caring, adaptive emotional companion.
      You are talking to a user who wants emotional support. They have shared something with you, and they are currently feeling a specific emotion.
      Your job is not to give solutions unless asked. Your main priority is to validate, support, and gently guide if needed — always with empathy and emotional resonance.
    
      Here’s the user input:
      - What the user said: "${input}"
      - Current emotional state: "${emotion}"
      
      Now respond with:
      - Empathy that matches the user's emotional state
      - A tone that aligns with the emotion (softer when sad, brighter when joyful, grounded when anxious, etc.)
      - A response that feels like how *they would want an emotional partner to respond*
      - Optionally, a subtle prompt to continue the conversation (if appropriate)

      Do not analyze them. Do not be clinical. Just *be there*.
      Begin your response:
      `;

    try {
      if (!isConversationStarted) {
        // First, get the conversation title from Gemini
        const titleResponse = await getGeminiResponse(
          `Someone says: "${input}" Give a short, emotionally resonant title for this conversation—like a chapter in a heartfelt story. Only reply with the title.`
        );
        setConversationTitle(titleResponse); // Set the title

        // Store the title in AsyncStorage
        await AsyncStorage.setItem("conversationTitle", titleResponse);
      }

      // Get AI's response
      const aiResponse = await getGeminiResponse(promptWrapper);
      setMessages((prev) => [...prev, { from: "ai", text: aiResponse }]);

      // Save the conversation in AsyncStorage (store messages)
      await AsyncStorage.setItem(
        "conversationMessages",
        JSON.stringify([
          ...messages,
          userMessage,
          { from: "ai", text: aiResponse },
        ])
      );
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { from: "ai", text: "Error getting response." },
      ]);
    } finally {
      setLoading(false);
    }

    // Mark conversation as started after first message
    if (!isConversationStarted) {
      setIsConversationStarted(true);
    }
  };

  const handleScroll = (event: any) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    setShowScrollButton(contentOffsetY < 200);
  };

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  const handleBackPress = async () => {
    try {
      if (isConversationStarted) {
        const storedTitle = await AsyncStorage.getItem("conversationTitle");
        const storedMessages = await AsyncStorage.getItem(
          "conversationMessages"
        );

        if (storedMessages) {
          const parsedMessages = JSON.parse(storedMessages);

          console.log(storedTitle);
          let result;
          if (conversationId && typeof conversationId === "string") {
            // update existing conversation
            result = await updateConversation(conversationId, parsedMessages);

            console.log(result);
          } else {
            // save new conversation
            result = await storeConversation(
              storedTitle || "Untitled",
              parsedMessages
            );
          }

          if (result.success) {
            await AsyncStorage.removeItem("conversationTitle");
            await AsyncStorage.removeItem("conversationMessages");
          } else {
            console.error(result.message);
          }

          router.back();
        }
      } else {
        router.back();
      }
    } catch (err) {
      console.error("Error saving/updating conversation:", err);
    }
  };

  return (
    <GradientWrapper>
      <View className="flex-row items-center px-2 py-1">
        <TouchableOpacity onPress={handleBackPress} className="p-2 mr-3">
          <ArrowLeft size={24} color={Colors[theme].tabIcon} />
        </TouchableOpacity>

        <Text
          className="text-2xl font-semibold"
          style={{ color: Colors[theme].tabIcon }}
        >
          Chat with Serava
        </Text>
      </View>

      <ScrollView
        ref={scrollViewRef}
        className="flex-1 px-4 py-2"
        contentContainerStyle={{ paddingBottom: 100 }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {messages.map((msg, index) => (
          <View
            key={index}
            className={`my-2 max-w-[80%] px-4 py-2 rounded-xl ${
              msg.from === "user"
                ? "self-end bg-white/10"
                : "self-start bg-white/5"
            }`}
          >
            {msg.from === "user" ? (
              <Text className="text-white text-lg">{msg.text}</Text>
            ) : (
              <Markdown
                style={{
                  text: {
                    color: "white", // general text color
                    fontSize: 16,
                  },
                  listUnorderedItemIcon: {
                    color: "white", // Bullet point color
                  },
                  listUnorderedItemText: {
                    color: "white", // Text color for list items
                  },
                }}
              >
                {msg.text}
              </Markdown>
            )}
          </View>
        ))}
        {loading && (
          <View className="flex flex-row gap-1 mb-3 ml-4">
            <View className="w-1 h-1 bg-gray-100 rounded-full animate-bounce [animation-delay:0s]"></View>
            <View className="w-1 h-1 bg-gray-100 rounded-full animate-bounce [animation-delay:0.2s]"></View>
            <View className="w-1 h-1 bg-gray-100 rounded-full animate-bounce [animation-delay:0.4s]"></View>
          </View>
        )}
      </ScrollView>

      {showScrollButton && (
        <TouchableOpacity
          onPress={scrollToBottom}
          style={{
            position: "absolute",
            bottom: 120,
            right: 20,
            backgroundColor: "#fff",
            borderRadius: 30,
            padding: 10,
            elevation: 5,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>⬇️</Text>
        </TouchableOpacity>
      )}

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={80}
        className="w-full px-4 pb-2"
      >
        <View
          className="flex-row items-center rounded-full px-4 py-2"
          style={{ backgroundColor: Colors[theme].primary }}
        >
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Type a message..."
            placeholderTextColor="white"
            className="flex-1 text-white mr-3"
            onSubmitEditing={sendMessage}
            returnKeyType="send"
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={sendMessage}
            className="p-2 rounded-full bg-white/10"
          >
            <Send color="white" size={22} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </GradientWrapper>
  );
};

export default AiChat;
