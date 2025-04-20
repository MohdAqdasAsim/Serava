import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { ConversationItem, GradientWrapper } from "@/components";
import {
  fetchUserConversations,
  deleteConversation,
} from "@/services/firebaseFunctions";
import { useTheme } from "@/contexts/ThemeProvider";
import { Feather } from "@expo/vector-icons";

type Conversation = {
  id: string;
  title?: string;
  preview?: string;
  timestamp?: any;
};

export default function Chat() {
  const { theme } = useTheme();
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadConversations = async () => {
      setLoading(true);
      const result = await fetchUserConversations();

      if (result.success) {
        setConversations(result.data);
      } else {
        console.warn(result.message);
      }

      setLoading(false);
    };

    loadConversations();
  }, []);

  const handleDelete = async (id: string) => {
    const result = await deleteConversation(id);
    if (result.success) {
      setConversations((prev) => prev.filter((conv) => conv.id !== id));
    } else {
      console.warn(result.message);
    }
  };

  const handlePress = (id: string) => {
    router.push(`/chat/ai-chat?conversationId=${id}`);
  };

  return (
    <GradientWrapper>
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      ) : (
        <FlatList
          data={conversations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ConversationItem
              conversation={item}
              onPress={() => handlePress(item.id)}
              onDelete={() => handleDelete(item.id)}
            />
          )}
          ListEmptyComponent={
            <View className="flex-1 items-center mt-10">
              <Text className="text-white text-2xl">No conversations yet</Text>
            </View>
          }
          ListFooterComponent={<View className="mb-28" />}
        />
      )}

      {/* New Chat Floating Button */}
      <TouchableOpacity
        className="absolute bottom-20 right-6 bg-white/20 border border-white/30 p-4 rounded-full"
        onPress={() => {
          router.push("/chat/ai-chat");
        }}
      >
        <Feather name="plus" size={28} color="white" />
      </TouchableOpacity>
    </GradientWrapper>
  );
}
