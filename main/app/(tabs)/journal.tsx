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
  deleteJournalEntry,
  fetchUserJournals,
} from "@/services/firebaseFunctions";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/contexts/ThemeProvider";

type JournalEntry = {
  journalId: string;
  title?: string;
  content?: string;
  createdAt?: any; // Timestamp or Date
};

export default function Journals() {
  const { theme } = useTheme();
  const router = useRouter();
  const [journals, setJournals] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJournals = async () => {
      setLoading(true);
      const result = await fetchUserJournals();

      if (result.success) {
        setJournals(result.data);
      } else {
        console.warn(result.message);
      }

      setLoading(false);
    };

    loadJournals();
  }, []);

  return (
    <GradientWrapper>
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      ) : (
        <FlatList
          data={journals}
          keyExtractor={(item) => item.journalId}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="w-full bg-white/10 border border-white/20 rounded-xl p-4 mb-4 flex flex-row justify-between"
              onPress={() => {
                router.push(
                  `/journalDetail?journalId=${item.journalId}` as never
                );
              }}
            >
              <View className="flex-1 pr-2">
                <Text
                  className="font-semibold text-lg"
                  style={{ color: Colors[theme].text }}
                >
                  {item.title || "Untitled Journal"}
                </Text>
                <Text
                  className="text-sm mt-1"
                  numberOfLines={2}
                  style={{ color: Colors[theme].text }}
                >
                  {item.content || "No content yet..."}
                </Text>
                <Text
                  className="text-xs mt-1"
                  style={{ color: Colors[theme].text }}
                >
                  {item.createdAt
                    ? new Date(item.createdAt.seconds * 1000).toDateString()
                    : "No date"}
                </Text>
              </View>

              <TouchableOpacity
                onPress={async () => {
                  const result = await deleteJournalEntry(item.journalId);
                  if (result.success) {
                    setJournals((prev) =>
                      prev.filter((j) => j.journalId !== item.journalId)
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
            <View className="flex-1 items-center mt-10">
              <Text className="text-white text-2xl">No journals yet</Text>
            </View>
          )}
          ListFooterComponent={<View className="mb-28" />}
        />
      )}

      {/* New Journal Floating Button */}
      <TouchableOpacity
        className="absolute bottom-24 right-6 bg-white/20 border border-white/30 p-4 rounded-full"
        onPress={() => {
          router.push("/JournalPage"); // Replace with your journal creation route
        }}
      >
        <Plus color="white" size={28} />
      </TouchableOpacity>
    </GradientWrapper>
  );
}
