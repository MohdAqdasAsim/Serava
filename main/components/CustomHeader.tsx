import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useTheme } from "@/contexts/ThemeProvider";
import { Colors } from "@/constants/Colors";

type Props = {
  title?: string;
  backTo?: string; // Optional fallback route (e.g., "/chat")
  handleBackPress?: () => Promise<void>;
};

export default function CustomHeader({
  title,
  backTo,
  handleBackPress,
}: Props) {
  const router = useRouter();
  const { theme } = useTheme();

  const handleBack = () => {
    if (backTo) {
      router.back();
    } else {
      router.back();
    }
  };

  return (
    <View className="flex-row items-center px-2 py-1">
      <TouchableOpacity
        onPress={backTo === undefined ? handleBackPress : handleBack}
        className="p-2 mr-3"
      >
        <ArrowLeft size={24} color={Colors[theme].tabIcon} />
      </TouchableOpacity>

      {title && (
        <Text
          className="text-2xl font-semibold"
          style={{ color: Colors[theme].tabIcon }}
        >
          {title}
        </Text>
      )}
    </View>
  );
}
