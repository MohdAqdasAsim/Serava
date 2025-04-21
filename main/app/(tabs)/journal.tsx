import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { ConfirmModal, GradientWrapper, JournalItem } from "@/components";
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
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [selectedJournalId, setSelectedJournalId] = useState<string | null>(
    null
  );

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

  const handleDelete = (journalId: string) => {
    setSelectedJournalId(journalId);
    setConfirmVisible(true);
  };

  const confirmDelete = async () => {
    if (selectedJournalId) {
      await deleteJournalEntry(selectedJournalId);
      setJournals((prev) =>
        prev.filter((j) => j.journalId !== selectedJournalId)
      );
      setConfirmVisible(false);
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
              onDelete={() => handleDelete(item.journalId)}
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

      <ConfirmModal
        visible={confirmVisible}
        onConfirm={confirmDelete}
        onCancel={() => setConfirmVisible(false)}
        title="Delete Journal?"
        message="Are you sure you want to delete this journal entry?"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </GradientWrapper>
  );
}
