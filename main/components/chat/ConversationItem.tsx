import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/contexts/ThemeProvider";

type ConversationItemProps = {
  conversation: {
    id: string;
    title?: string;
    preview?: string;
    timestamp?: any;
  };
  onPress: () => void;
  onDelete: () => void;
};

const ConversationItem = ({
  conversation,
  onPress,
  onDelete,
}: ConversationItemProps) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      className="w-full bg-white/10 border border-white/20 rounded-2xl p-4 mb-4 flex flex-row justify-between"
      onPress={onPress}
    >
      <View>
        <Text
          className="font-semibold text-lg"
          style={{ color: Colors[theme].text }}
        >
          {conversation.title || "Untitled Conversation"}
        </Text>
        <Text className="text-sm mt-1" style={{ color: Colors[theme].text }}>
          {conversation.preview || "Start talking to Serava..."}
        </Text>
        <Text className="text-xs mt-1" style={{ color: Colors[theme].text }}>
          {conversation.timestamp
            ? new Date(conversation.timestamp.seconds * 1000).toDateString()
            : "No date"}
        </Text>
      </View>

      <TouchableOpacity onPress={onDelete}>
        <Feather name="trash-2" size={20} color="white" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ConversationItem;
