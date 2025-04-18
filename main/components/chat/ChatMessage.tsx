import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function ChatMessage({
  message,
  isUser,
}: {
  message: string;
  isUser: boolean;
}) {
  return (
    <View className={`my-2 ${isUser ? "items-end" : "items-start"}`}>
      <LinearGradient
        colors={isUser ? ["#89f7fe", "#66a6ff"] : ["#fbc2eb", "#a18cd1"]}
        className="px-4 py-2 rounded-2xl max-w-[80%]"
      >
        <Text className="text-white">{message}</Text>
      </LinearGradient>
    </View>
  );
}
