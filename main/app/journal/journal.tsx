import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { GradientWrapper } from "@/components";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  saveJournalEntry,
  fetchJournalById,
  updateJournalEntry,
} from "@/services/firebaseFunctions";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/contexts/ThemeProvider";
import { Feather } from "@expo/vector-icons";
import moment from "moment";
import { useFocusEffect } from "expo-router";
import { BackHandler } from "react-native";

const JournalPage = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { journalId } = useLocalSearchParams<{ journalId?: string }>();

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [initialTitle, setInitialTitle] = useState<string>("");
  const [initialContent, setInitialContent] = useState<string>("");

  const formattedDate = moment().format("dddd, MMMM Do YYYY");

  const hasUnsavedChanges =
    title !== initialTitle || content !== initialContent;

  useEffect(() => {
    if (journalId) {
      fetchJournalById(journalId).then((res) => {
        if (res.success && res.data) {
          setTitle(res.data.title);
          setContent(res.data.content);
          setInitialTitle(res.data.title); // 🧠 store initial data
          setInitialContent(res.data.content);
        } else {
          Alert.alert("Error", res.message || "Could not load journal.");
        }
      });
    }
  }, [journalId]);

  const handleSaveJournal = async (auto = false) => {
    if (!title.trim() || !content.trim()) {
      if (!auto) {
        Alert.alert("Error", "Title and content cannot be empty.");
      }
      return;
    }

    const mood = theme;
    let result;

    if (journalId) {
      result = await updateJournalEntry(journalId, {
        title,
        content,
        mood,
      });
    } else {
      result = await saveJournalEntry(title, content, mood);
    }

    if (result.success) {
      setInitialTitle(title); // ✅ Update initial after save
      setInitialContent(content);
      if (!auto) {
        Alert.alert(
          "Success",
          journalId ? "Journal updated!" : "Journal saved!"
        );
      }
    } else {
      if (!auto) {
        Alert.alert("Error", result.message || "Save failed.");
      }
    }
  };

  // ⏱️ Auto-save
  useEffect(() => {
    const interval = setInterval(() => {
      handleSaveJournal(true);
    }, 10000);
    return () => clearInterval(interval);
  }, [title, content]);

  // 🔙 Handle back button
  const handleBackPress = () => {
    if (hasUnsavedChanges) {
      Alert.alert(
        "Unsaved Changes",
        "You have unsaved changes. Do you want to discard them?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Discard",
            style: "destructive",
            onPress: () => router.back(),
          },
        ]
      );
    } else {
      router.back();
    }
  };

  // Optional: Block Android hardware back button
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        handleBackPress();
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [title, content, initialTitle, initialContent])
  );

  return (
    <GradientWrapper>
      <View className="flex-row items-center justify-between px-2 py-1">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleBackPress}
          className="p-2 mr-3"
        >
          <Feather name="arrow-left" size={24} color={Colors[theme].tabIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handleSaveJournal()}
          className="p-2 mr-3"
        >
          <Feather name="save" size={24} color={Colors[theme].tabIcon} />
        </TouchableOpacity>
      </View>

      {/* Journal Body */}
      <View className="flex-1 p-4 rounded-lg">
        {/* Date */}
        <Text className="text-white text-lg mb-2 opacity-80">
          {formattedDate}
        </Text>

        {/* Title Input */}
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Title"
          placeholderTextColor="white"
          className="text-white font-bold text-2xl mb-4 bg-transparent border-b border-white/20"
        />

        {/* Content Input */}
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

        {/* Character Count */}
        <Text className="text-right text-white text-sm opacity-60 mt-2">
          {content.length} characters
        </Text>
      </View>
    </GradientWrapper>
  );
};

export default JournalPage;
