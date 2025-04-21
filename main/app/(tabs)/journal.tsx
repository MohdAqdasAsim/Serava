import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { GradientWrapper, JournalItem } from "@/components";
import { useCallback, useState } from "react";
import {
  deleteJournalEntry,
  fetchUserJournals,
} from "@/services/firebaseFunctions";
import { Feather } from "@expo/vector-icons";

type JournalEntry = {
  journalId: string;
  title?: string;
  content?: string;
  createdAt?: any;
};

export default function Journals() {
  const router = useRouter();
  const [journals, setJournals] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
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
    }, [])
  );

  const handleDeleteJournal = async (journalId: string) => {
    const result = await deleteJournalEntry(journalId);
    if (result.success) {
      setJournals((prev) => prev.filter((j) => j.journalId !== journalId));
    } else {
      console.warn(result.message);
    }
  };

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
            <JournalItem
              journalId={item.journalId}
              title={item.title}
              content={item.content}
              createdAt={item.createdAt}
              onPress={() =>
                router.push(`/journal/journal?journalId=${item.journalId}`)
              }
              onDelete={() => handleDeleteJournal(item.journalId)}
            />
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
          router.push("/journal/journal");
        }}
      >
        <Feather name="plus" size={28} color="white" />
      </TouchableOpacity>
    </GradientWrapper>
  );
}
