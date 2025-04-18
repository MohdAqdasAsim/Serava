import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Plus, Trash2 } from "lucide-react-native";
import { useRouter } from "expo-router";
import { GradientWrapper } from "@/components";
import { useEffect, useState } from "react";
import {
  deleteConversation,
  fetchUserConversations,
} from "@/services/firebaseFunctions";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/contexts/ThemeProvider";

type Conversation = {
  id: string;
  title?: string;
  preview?: string;
  timestamp?: any; // or `Timestamp` if you're importing from Firebase
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
            <TouchableOpacity
              className="w-full bg-white/10 border border-white/20 rounded-2xl p-4 mb-4 flex flex-row justify-between"
              onPress={() => {
                router.push(`/AiChat?conversationId=${item.id}` as never); // or however your chat screen is structured
              }}
            >
              <View>
                <Text
                  className="font-semibold text-lg"
                  style={{ color: Colors[theme].text }}
                >
                  {item.title || "Untitled Conversation"}
                </Text>
                <Text
                  className="text-sm mt-1"
                  style={{ color: Colors[theme].text }}
                >
                  {item.preview || "Start talking to Serava..."}
                </Text>
                <Text
                  className="text-xs mt-1"
                  style={{ color: Colors[theme].text }}
                >
                  {item.timestamp
                    ? new Date(item.timestamp.seconds * 1000).toDateString()
                    : "No date"}
                </Text>
              </View>

              <TouchableOpacity
                onPress={async () => {
                  const result = await deleteConversation(item.id);
                  if (result.success) {
                    setConversations((prev) =>
                      prev.filter((conv) => conv.id !== item.id)
                    );
                  } else {
                    console.warn(result.message);
                  }
                }}
              >
                <Trash2 size={20} color="white" />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
          ListEmptyComponent={() => (
            <View className="flex-1 items-center mt-10s">
              <Text className="text-white text-2xl">No conversations yet</Text>
            </View>
          )}
          ListFooterComponent={<View className="mb-28" />}
        />
      )}

      {/* New Chat Floating Button */}
      <TouchableOpacity
        className="absolute bottom-24 right-6 bg-white/20 border border-white/30 p-4 rounded-full"
        onPress={() => {
          router.push("/AiChat"); // adjust based on routing setup
        }}
      >
        <Plus color="white" size={28} />
      </TouchableOpacity>
    </GradientWrapper>
  );
}
