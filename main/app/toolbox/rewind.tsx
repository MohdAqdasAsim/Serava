import React, { useState } from "react";
import { View, Text, FlatList, Modal, TouchableOpacity } from "react-native";
import { ToolboxPageWrapper } from "@/components";

// Define the interface for the entries
interface Entry {
  id: string;
  mood: string;
  description: string;
  timestamp: string;
}

const sampleEntries: Entry[] = [
  {
    id: "1",
    mood: "Sad",
    description: "Had a tough conversation with a friend.",
    timestamp: "2025-04-10",
  },
  {
    id: "2",
    mood: "Anxious",
    description: "Felt overwhelmed with work.",
    timestamp: "2025-04-12",
  },
  {
    id: "3",
    mood: "Angry",
    description: "Frustrated with a project deadline.",
    timestamp: "2025-04-14",
  },
];

const EmotionRewind = () => {
  const [entries, setEntries] = useState<Entry[]>(sampleEntries); // Use the Entry type for state
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null); // Entry or null type for selectedEntry
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (entry: Entry) => {
    // Type the 'entry' parameter
    setSelectedEntry(entry);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedEntry(null);
  };

  const handleReframe = () => {
    alert(`Reframed: Look at this as an opportunity to learn and grow.`);
    closeModal();
  };

  const renderEntry = (
    { item }: { item: Entry } // Type the 'item' parameter as Entry
  ) => (
    <TouchableOpacity
      onPress={() => openModal(item)}
      className="p-4 mb-2 bg-gray-200 rounded-lg w-full"
    >
      <Text className="text-lg text-gray-700">
        {item.timestamp} - {item.mood}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ToolboxPageWrapper title="Emotion Rewind">
      <View className="flex-1 justify-center items-center px-4">
        <Text className="text-2xl font-bold mb-4 text-center">
          Select a past mood entry to reflect on:
        </Text>

        <FlatList
          data={entries}
          renderItem={renderEntry}
          keyExtractor={(item) => item.id}
        />

        {/* Modal for reflecting on an entry */}
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
            <View className="bg-white p-6 rounded-lg w-4/5 items-center">
              {selectedEntry && (
                <>
                  <Text className="text-2xl font-bold mb-2">
                    Mood: {selectedEntry.mood}
                  </Text>
                  <Text className="text-lg mb-4 text-center">
                    {selectedEntry.description}
                  </Text>
                  <Text className="text-sm text-gray-500 mb-6">
                    Date: {selectedEntry.timestamp}
                  </Text>
                  <Text className="italic text-lg mb-6">
                    How do you feel now about this moment?
                  </Text>

                  <TouchableOpacity
                    onPress={handleReframe}
                    className="bg-green-500 p-3 rounded-lg mb-4"
                  >
                    <Text className="text-white font-bold">
                      Reflect & Reframe
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={closeModal}
                    className="bg-red-500 p-3 rounded-lg"
                  >
                    <Text className="text-white font-bold">Close</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </ToolboxPageWrapper>
  );
};

export default EmotionRewind;
