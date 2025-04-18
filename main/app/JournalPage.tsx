import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { CustomHeader, GradientWrapper } from "@/components";
import { useRouter } from "expo-router";
import { ArrowLeft, Plus, Save } from "lucide-react-native"; // Icon for a floating save button
import { saveJournalEntry } from "@/services/firebaseFunctions";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/contexts/ThemeProvider";

const JournalPage = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleSaveJournal = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert("Error", "Title and content cannot be empty.");
      return;
    }

    const mood = theme;
    const result = await saveJournalEntry(title, content, mood);

    if (result.success) {
      Alert.alert("Success", "Journal saved successfully!");
    } else {
      console.log(result.message);

      Alert.alert("Error", result.message || "Failed to save journal.");
    }
  };

  return (
    <GradientWrapper>
      <View className="flex-row items-center justify-between px-2 py-1">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.back()}
          className="p-2 mr-3"
        >
          <ArrowLeft size={24} color={Colors[theme].tabIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handleSaveJournal()}
          className="p-2 mr-3"
        >
          <Save size={24} color={Colors[theme].tabIcon} />
        </TouchableOpacity>
      </View>
      <View className="flex-1 p-4 rounded-lg">
        {/* Journal Title */}
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Title"
          placeholderTextColor="white"
          className="text-white font-bold text-2xl mb-4 bg-transparent border-b border-white/20"
        />

        {/* Journal Content */}
        <ScrollView className="flex-1">
          <TextInput
            value={content}
            onChangeText={setContent}
            placeholder="Write your thoughts here..."
            placeholderTextColor="white"
            multiline
            className="flex-1 w-full text-white text-xl bg-transparent"
          />
        </ScrollView>
      </View>
    </GradientWrapper>
  );
};

export default JournalPage;
